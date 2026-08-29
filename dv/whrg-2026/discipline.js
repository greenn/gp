(() => {
  const data = window.WHRG_DATA;
  const info = window.WHRG_DISCIPLINE_INFO || {};
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const event = data.events.find(item => item.id === id);
  const hero = document.getElementById('disciplineHero');
  const content = document.getElementById('disciplineContent');
  const notFound = document.getElementById('disciplineNotFound');
  const countryNames = {CN:'Китай',JP:'Япония',IT:'Италия',HK:'Гонконг, Китай',DE:'Германия',BR:'Бразилия',US:'США'};
  const flags = {CN:'🇨🇳',JP:'🇯🇵',IT:'🇮🇹',HK:'🇭🇰',DE:'🇩🇪',BR:'🇧🇷',US:'🇺🇸'};
  const clean = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const rankClass = rank => rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';

  if (!event) {
    hero.hidden = true;
    notFound.hidden = false;
    return;
  }

  const details = info[event.id] || {
    summary:'Краткое описание для этой дисциплины пока не добавлено.',
    focus:'Точный формат следует сверять с техническим регламентом соревнований.'
  };
  const source = event.source ? data.sources[event.source] : null;
  const index = data.events.findIndex(item => item.id === event.id);
  const prev = data.events[index - 1];
  const next = data.events[index + 1];
  const coverageText = event.coverage === 'full' ? 'полный протокол' : event.coverage === 'partial' ? 'частичные результаты' : 'результаты пока не найдены';
  const typeText = event.type === 'competitive' ? 'Соревновательная дисциплина' : 'Сценарная дисциплина';

  document.title = `${event.name} · WHRG 2026`;
  hero.innerHTML = `
    <div class="discipline-kicker">${clean(event.category)}</div>
    <h1>${clean(event.name)}</h1>
    <p>${clean(details.summary)}</p>
    <div class="discipline-badges">
      <span>${clean(typeText)}</span>
      <span>${clean(coverageText)}</span>
      <span>${event.placements.length} известных позиций</span>
    </div>
  `;

  document.getElementById('descriptionCard').innerHTML = `
    <span class="section-label">Что это</span>
    <h2>${clean(event.name)}</h2>
    <p>${clean(details.summary)}</p>
    <div class="focus-box"><b>Что здесь проверяется</b><span>${clean(details.focus)}</span></div>
    <p class="technical-note">Описание объясняет смысл дисциплины простыми словами. Точные размеры площадки, штрафы и технические ограничения определяются регламентом WHRG.</p>
  `;

  const placementsHtml = event.placements.length ? `
    <table class="placements discipline-table">
      <thead><tr><th>Место</th><th>Команда / робот</th><th>Страна</th><th>Результат</th></tr></thead>
      <tbody>${event.placements.map(p => `
        <tr>
          <td><span class="rank ${rankClass(p.rank)}">${p.rank}</span></td>
          <td class="team"><a class="inline-team-link" href="./team.html?team=${encodeURIComponent(p.team)}"><strong>${clean(p.team)}</strong></a>${p.robot || p.note ? `<small>${clean([p.robot,p.note].filter(Boolean).join(' · '))}</small>` : ''}</td>
          <td><span class="flag">${flags[p.country] || '🌐'}</span>${clean(countryNames[p.country] || p.country || '—')}</td>
          <td class="result">${clean(p.result || '—')}</td>
        </tr>`).join('')}</tbody>
    </table>` : '<div class="discipline-empty">В открытых источниках итоговая таблица этой дисциплины пока не найдена.</div>';

  document.getElementById('placementsCard').innerHTML = `
    <span class="section-label">WHRG 2026</span>
    <h2>Результаты</h2>
    <div class="discipline-table-wrap">${placementsHtml}</div>
  `;

  document.getElementById('factsCard').innerHTML = `
    <span class="section-label">Карточка</span>
    <h2>О дисциплине</h2>
    <dl class="fact-list">
      <div><dt>ID</dt><dd>${clean(event.id)}</dd></div>
      <div><dt>Категория</dt><dd>${clean(event.category)}</dd></div>
      <div><dt>Тип</dt><dd>${clean(event.type === 'competitive' ? 'соревнование' : 'сценарий')}</dd></div>
      <div><dt>Публикация результатов</dt><dd>${clean(coverageText)}</dd></div>
    </dl>
    <div class="discipline-nav">
      ${prev ? `<a href="./discipline.html?id=${encodeURIComponent(prev.id)}">← ${clean(prev.name)}</a>` : '<span></span>'}
      ${next ? `<a href="./discipline.html?id=${encodeURIComponent(next.id)}">${clean(next.name)} →</a>` : ''}
    </div>
  `;

  document.getElementById('sourceCard').innerHTML = `
    <span class="section-label">Источник</span>
    <h2>Протокол / публикация</h2>
    ${source ? `<p>${clean(source.label)}</p><a class="source-button" href="${source.url}" target="_blank" rel="noopener">Открыть источник ↗</a>` : '<p>Для этой строки отдельный источник не указан.</p>'}
    <a class="all-disciplines-link" href="./disciplines.html">Перечень всех 51 дисциплины →</a>
  `;

  content.hidden = false;
})();
