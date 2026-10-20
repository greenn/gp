/* Group membership never changes when the displayed quest names swap. */
'use strict';
(() => {
  const KEY = 'gp.trip-1026.quest-swap.v1';
  const swapButton = document.createElement('button');
  swapButton.type = 'button';
  swapButton.id = 'swapQuestBtn';
  swapButton.className = 'action';
  swapButton.style.borderColor = '#9886ce';
  swapButton.style.color = '#efdcff';
  swapButton.title = 'Поменять названия квестов, сохранив составы групп';
  swapButton.textContent = '⇄ Поменять квесты';
  const toolbar = document.querySelector('.actions');
  if (!toolbar) return;
  toolbar.insertBefore(swapButton, toolbar.firstChild);

  const quests = ['Одержимая', 'Сдаётся квартира'];
  let swapped = false;
  try { swapped = localStorage.getItem(KEY) === '1'; } catch (_) {}

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  function render() {
    const left = swapped ? quests[1] : quests[0];
    const right = swapped ? quests[0] : quests[1];
    setText('.quest-one .quest-head h2', left);
    setText('.quest-two .quest-head h2', right);
    setText('.names-left h2', 'Идут на «' + left + '»');
    setText('.names-right h2', 'Идут на «' + right + '»');

    const labels = [
      ['.quest-one', 'Квест ' + left],
      ['.quest-two', 'Квест ' + right],
      ['.quest-one .zone-target', 'Добавить выбранного участника на квест ' + left],
      ['.quest-two .zone-target', 'Добавить выбранного участника на квест ' + right]
    ];
    labels.forEach(([selector, label]) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute('aria-label', label);
    });
    swapButton.setAttribute('aria-pressed', String(swapped));
    swapButton.style.background = swapped ? '#473760' : '';
  }
  function questLabels() {
    return swapped ? [quests[1], quests[0]] : [...quests];
  }
  function unlocked() {
    return document.getElementById('lockScreen')?.hidden === true;
  }
  swapButton.addEventListener('click', () => {
    if (!unlocked()) return;
    swapped = !swapped;
    try { localStorage.setItem(KEY, swapped ? '1' : '0'); }
    catch (_) { window.alert('Смена названий не сохранится: браузер запретил сохранение.'); }
    render();
  });
  function listNames(id) {
    return Array.from(document.querySelectorAll('#' + id + ' li:not(.empty-names)'))
      .map(li => li.textContent.replace(/^\d+/, '').trim());
  }
  function unassignedNames() {
    return ['poolStudents','poolEscorts']
      .flatMap(id => Array.from(document.querySelectorAll('#' + id + ' button.tile')))
      .map(tile => tile.title.replace(/ · (?:сопровождающий|гость)$/, ''));
  }
  const originalCopy = document.getElementById('copyBtn');
  originalCopy?.addEventListener('click', async (event) => {
    if (!unlocked()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const labels = questLabels();
    const sections = [
      [labels[0], listNames('listO')],
      [labels[1], listNames('listA')],
      ['Не распределены', unassignedNames()]
    ];
    const lines = ['Поездка 24 октября 2026','Поддорье — Великий Новгород','Выезд 09:00 · обратно 16:00'];
    for (const [name, names] of sections) {
      lines.push('', name + ' (' + names.length + '):');
      names.forEach((person, i) => lines.push((i + 1) + '. ' + person));
    }
    const value = lines.join('\n');
    try {
      await navigator.clipboard.writeText(value);
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.append(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = 'Списки с актуальными названиями квестов скопированы';
      toast.hidden = false;
      window.setTimeout(() => { toast.hidden = true; }, 2300);
    }
  }, true);
  render();
})();