/* Passwordless interface: use already-initialized browser data.
   Private bootstrap links can provision encrypted data once without publishing keys. */
'use strict';
(() => {
  const DATA = 'gp.pb-2627-1.attendance.v1';
  const OLD_CODE = 'gp.res-6-1-2627.device-code.v1';
  const OLD_SESSION = 'gp.res-6-1-2627.session-code.v1';
  function readStorage(storage, key) {
    try { return storage.getItem(key); } catch (_) { return null; }
  }
  function forgetOldCodes() {
    try { localStorage.removeItem(OLD_CODE); } catch (_) {}
    try { sessionStorage.removeItem(OLD_SESSION); } catch (_) {}
  }
  function takePrivateLinkCode() {
    if (!location.hash.startsWith('#access-code=')) return null;
    const code = new URLSearchParams(location.hash.slice(1)).get('access-code');
    history.replaceState(null, '', location.pathname + location.search);
    return code ? code.trim() : null;
  }
  function storedData() {
    try {
      const parsed = JSON.parse(localStorage.getItem(DATA) || 'null');
      return parsed && Array.isArray(parsed.students) && parsed.students.length ? parsed : null;
    } catch (_) { return null; }
  }
  function bytes(value) {
    return Uint8Array.from(atob(value), char => char.charCodeAt(0));
  }
  function mergePreservingLocalData(initial, local) {
    if (!local || !Array.isArray(local.students) || !local.students.length) return initial;
    const byId = new Map(initial.students.map(item => [item.id, item]));
    const byName = new Map(initial.students.map(item => [String(item.name).trim().toLowerCase(), item]));
    for (const entry of local.students) {
      const original = byId.get(entry.id) || byName.get(String(entry.name).trim().toLowerCase());
      if (!original) continue;
      entry.grades = {...(original.grades || {}), ...(entry.grades || {})};
      entry.finalGrades = {...(original.finalGrades || {}), ...(entry.finalGrades || {})};
    }
    const known = new Set(local.students.map(item => item.id));
    for (const item of initial.students) {
      if (!known.has(item.id) && !local.students.some(value => value.name === item.name)) {
        local.students.push({...item, order: local.students.length});
      }
    }
    local.teacher = local.teacher || initial.teacher;
    local.academicYear = local.academicYear || initial.academicYear;
    local.version = 2;
    return local;
  }
  async function decryptData(code) {
    if (!crypto?.subtle) throw Error('Для открытия данных требуется HTTPS.');
    const response = await fetch('./initial-data.enc.json', {cache: 'no-store'});
    if (!response.ok) throw Error('Встроенные данные недоступны.');
    const payload = await response.json();
    if (payload.version !== 1 || payload.alg !== 'AES-256-GCM' || payload.kdf !== 'PBKDF2-SHA256') {
      throw Error('Неизвестный формат данных.');
    }
    const raw = await crypto.subtle.importKey('raw', new TextEncoder().encode(code.trim()), {name:'PBKDF2'}, false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      {name:'PBKDF2', salt:bytes(payload.salt), iterations:payload.iterations, hash:'SHA-256'},
      raw, {name:'AES-GCM', length:256}, false, ['decrypt']
    );
    const decrypted = await crypto.subtle.decrypt({name:'AES-GCM', iv:bytes(payload.iv)},key,bytes(payload.ciphertext));
    const data = JSON.parse(new TextDecoder().decode(decrypted));
    if (!Array.isArray(data.students) || data.students.length !== 21) throw Error('Некорректный состав класса.');
    return data;
  }
  function emptyNotice() {
    const message = document.getElementById('flash');
    if (!message) return;
    message.hidden = false;
    message.textContent = 'На этом устройстве пока нет списка класса. Откройте ранее выданную личную ссылку для подключения данных или загрузите резервную копию JSON.';
  }
  const privateCode = takePrivateLinkCode();
  const cached = storedData();
  if (!privateCode && cached) {
    // Existing attendance records already render immediately via app.js.
    forgetOldCodes();
    return;
  }
  const rememberedCode = privateCode || readStorage(sessionStorage, OLD_SESSION) || readStorage(localStorage, OLD_CODE);
  if (!rememberedCode) {
    forgetOldCodes();
    emptyNotice();
    return;
  }
  (async () => {
    try {
      const data = mergePreservingLocalData(await decryptData(rememberedCode), cached);
      localStorage.setItem(DATA, JSON.stringify(data));
      forgetOldCodes();
      location.reload();
    } catch (error) {
      forgetOldCodes();
      if (!cached) emptyNotice();
      else document.getElementById('saveStatus').textContent = '● Сохранено в браузере';
    }
  })();
})();