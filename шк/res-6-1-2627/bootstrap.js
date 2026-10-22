/* Encrypted local bootstrap. The key is never published with the page. */
'use strict';
(() => {
  const storageKey = 'gp.pb-2627-1.attendance.v1';
  // A one-time private link passes its code in the URL fragment, never in the
  // public HTML. Remove it from the address bar before any asynchronous work.
  function takePrivateLinkCode() {
    if (!location.hash.startsWith('#access-code=')) return null;
    const value = new URLSearchParams(location.hash.slice(1)).get('access-code');
    history.replaceState(null, '', location.pathname + location.search);
    return value ? value.trim() : null;
  }
  const privateLinkCode = takePrivateLinkCode();

  const codeKey = 'gp.res-6-1-2627.device-code.v1';
  const sessionKey = 'gp.res-6-1-2627.session-code.v1';
  const dialog = document.getElementById('unlockDialog');
  const form = document.getElementById('unlockForm');
  const message = document.getElementById('unlockMessage');
  const password = document.getElementById('unlockPassword');
  const remember = document.getElementById('rememberAccessCode');
  const submit = document.getElementById('unlockSubmit');
  const openButton = document.getElementById('unlockBtn');
  if (!dialog || !form || !password || !openButton) return;

  function getStored() {
    try {
      const text = localStorage.getItem(storageKey);
      return text ? JSON.parse(text) : null;
    } catch (_) { return null; }
  }
  function toBytes(value) {
    const text = atob(value);
    return Uint8Array.from(text, x => x.charCodeAt(0));
  }
  function openDialog() {
    message.textContent = '';
    password.value = '';
    if (!dialog.open) dialog.showModal();
    password.focus();
  }
  function mergePreservingLocalData(initial, local) {
    if (!local || !Array.isArray(local.students) || !local.students.length) return initial;
    const byId = new Map(initial.students.map(item => [item.id, item]));
    const byName = new Map(initial.students.map(item => [String(item.name).trim().toLowerCase(), item]));
    // Previously edited values take priority. Newly added subjects/grades fill gaps.
    for (const entry of local.students) {
      const initialEntry = byId.get(entry.id) || byName.get(String(entry.name).trim().toLowerCase());
      if (!initialEntry) continue;
      entry.grades = {...(initialEntry.grades || {}), ...(entry.grades || {})};
      entry.finalGrades = {...(initialEntry.finalGrades || {}), ...(entry.finalGrades || {})};
    }
    // Keep local pin/order, absences, manually added students, teacher and year.
    const known = new Set(local.students.map(x => x.id));
    for (const item of initial.students) if (!known.has(item.id) && !local.students.some(x => x.name === item.name)) {
      local.students.push({...item, order:local.students.length});
    }
    local.teacher = local.teacher || initial.teacher;
    local.academicYear = local.academicYear || initial.academicYear;
    local.version = 2;
    return local;
  }
  async function decryptData(pass) {
    if (!window.crypto || !window.crypto.subtle) throw new Error('Для расшифровки необходимо защищённое соединение HTTPS.');
    const response = await fetch('./initial-data.enc.json', {cache:'no-store'});
    if (!response.ok) throw new Error('Зашифрованная база недоступна. Повторите позже.');
    const payload = await response.json();
    if (payload.version !== 1 || payload.alg !== 'AES-256-GCM' || payload.kdf !== 'PBKDF2-SHA256') throw new Error('Неизвестный формат базы.');
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass.trim()), {name:'PBKDF2'}, false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      {name:'PBKDF2', salt:toBytes(payload.salt), iterations:payload.iterations, hash:'SHA-256'},
      material, {name:'AES-GCM',length:256}, false, ['decrypt']
    );
    const decrypted = await crypto.subtle.decrypt({name:'AES-GCM',iv:toBytes(payload.iv)},key,toBytes(payload.ciphertext));
    const parsed = JSON.parse(new TextDecoder().decode(decrypted));
    if (!Array.isArray(parsed.students) || parsed.students.length !== 21) throw new Error('Ошибка структуры данных.');
    return parsed;
  }
  async function unlockWithCode(pin, saveCode) {
    const initial = await decryptData(pin);
    const merged = mergePreservingLocalData(initial, getStored());
    localStorage.setItem(storageKey, JSON.stringify(merged));
    const cleanCode = pin.trim();
    if (saveCode) localStorage.setItem(codeKey, cleanCode);
    else localStorage.removeItem(codeKey);
    try { sessionStorage.setItem(sessionKey, cleanCode); } catch (_) {}
    password.value = '';
    if (dialog.open) dialog.close();
    location.reload();
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    submit.disabled = true;
    message.textContent = 'Открываю встроенную базу…';
    try {
      await unlockWithCode(password.value, Boolean(remember?.checked));
    } catch (e) {
      message.textContent = e.name === 'OperationError' ? 'Неверный код доступа. Проверьте ввод.' : (e.message || 'Не удалось открыть данные.');
    } finally { submit.disabled = false; }
  });
  document.getElementById('unlockCancel').addEventListener('click', () => dialog.close());
  openButton.addEventListener('click', openDialog);
  if (privateLinkCode || !(getStored()?.students?.length)) {
    (async () => {
      let savedCode = privateLinkCode, persistentCode = Boolean(privateLinkCode);
      try {
        persistentCode ||= Boolean(localStorage.getItem(codeKey));
        savedCode ||= sessionStorage.getItem(sessionKey) || localStorage.getItem(codeKey);
      } catch (_) {}
      if (savedCode) {
        try {
          await unlockWithCode(savedCode, persistentCode);
          return;
        } catch (_) {
          try { sessionStorage.removeItem(sessionKey); localStorage.removeItem(codeKey); } catch (_) {}
        }
      }
      openDialog();
    })();
  }
})();