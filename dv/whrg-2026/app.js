(() => {
  const data = window.WHRG_DATA;
  const root = document.getElementById('resultsRoot');
  const categorySelect = document.getElementById('categoryFilter');
  const placeSelect = document.getElementById('placeFilter');
  const nonChina = document.getElementById('nonChina');
  const scopeTabs = document.getElementById('scopeTabs');
  const intlPanel = document.getElementById('internationalPanel');
  const intlGrid = document.getElementById('internationalGrid');
  const expanded = new Set();

  const params = new URLSearchParams(location.search);
  const state = {
    scope: ['all','competitive','scenario','international'].includes(params.get('view')) ? params.get('view') : 'all',
    nonChina: params.get('noncn') === '1',
    places: ['top3','all','winner'].includes(params.get('places')) ? params.get('places') : 'top3',
    category: params.get('category') || 'all'
  };
  if (state.scope === 'international') state.nonChina = true;

  const countryNames = {CN:'Китай',JP:'Япония',IT:'Италия',HK:'Гонконг, Китай',DE:'Германия',BR:'Бразилия',US:'США'};
  const flags = {CN:'🇨🇳',JP:'🇯🇵',IT:'🇮🇹',HK:'🇭🇰',DE:'🇩🇪',BR:'🇧🇷',US:'🇺🇸'};

  const isChina = row => row.country === 'CN' || row.chinaRegion === true;
  const clean = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function sourceFor(event) {
    return event.source && data.sources[event.source] ? data.sources[event.source] : null;
  }

  function scopedBaseEvents() {
    let events = data.events;
    if (state.scope === 'competitive') events = events.filter(e => e.type === 'competitive');
    if (state.scope === 'scenario') events = events.filter(e => e.type === 'scenario');
    if (state.scope === 'international') events = events.filter(e => e.placements.some(p => !isChina(p)));
    return events;
  }

  function availableCategories() {
    return [...new Set(scopedBaseEvents().map(e => e.category))];
  }

  function syncCategoryOptions() {
    const categories = availableCategories();
    if (state.category !== 'all' && !categories.includes(state.category)) state.category = 'all';
    categorySelect.innerHTML = '<option value="all">Все категории</option>' + categories.map(c => `<option value="${clean(c)}">${clean(c)}</option>`).join('');
    categorySelect.value = state.category;
  }

  function placementRows(event) {
    let rows = event.placements.slice();
    const onlyNonChina = state.nonChina || state.scope === 'international';
    if (onlyNonChina) rows = rows.filter(p => !isChina(p));

    if (state.places === 'winner') rows = rows.filter(p => p.rank === 1);
    if (state.places === 'top3' && !expanded.has(event.id)) rows = rows.filter(p => p.rank <= 3);
    return rows;
  }

  function visibleEvents() {
    let events = scopedBaseEvents();
    if (state.category !== 'all') events = events.filter(e => e.category === state.category);
    if (state.nonChina || state.scope === 'international') events = events.filter(e => e.placements.some(p => !isChina(p)));
    return events;
  }

  function coverage(event) {
    if (!event.placements.length || event.coverage === 'missing') return ['missing','итог не найден'];
    if (event.coverage === 'full') return ['','протокол'];
    return ['partial','частично'];
  }

  function rankClass(rank) {
    return rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
  }

  function eventCard(event, index) {
    const rows = placementRows(event);
    const source = sourceFor(event);
    const [coverageClass, coverageText] = coverage(event);
    const rawRows = (state.nonChina || state.scope === 'international') ? event.placements.filter(p => !isChina(p)) : event.placements;
    const hasMore = state.places === 'top3' && !expanded.has(event.id) && rawRows.some(p => p.rank > 3);
    const isExpanded = expanded.has(event.id);

    const table = rows.length ? `
      <table class="placements">
        <thead><tr><th>Место</th><th>Команда / робот</th><th>Страна</th><th style="text-align:right">Результат</th></tr></thead>
        <tbody>${rows.map(p => `
          <tr>
            <td class="rank-cell"><span class="rank ${rankClass(p.rank)}">${p.rank}</span></td>
            <td class="team"><strong>${clean(p.team)}</strong>${p.robot || p.note ? `<small>${clean([p.robot,p.note].filter(Boolean).join(' · '))}</small>` : ''}</td>
            <td class="country"><span class="flag">${flags[p.country] || '🌐'}</span>${clean(countryNames[p.country] || p.country || '—')}</td>
            <td class="result">${clean(p.result || '—')}</td>
          </tr>`).join('')}</tbody>
      </table>` : `<div class="empty-state">${(state.nonChina || state.scope === 'international') ? 'В найденном протоколе нет подтверждённой позиции команды не из Китая.' : 'Итоговая таблица этой дисциплины пока не найдена в открытых источниках. Дисциплина оставлена в списке, чтобы состав программы был полным.'}</div>`;

    return `<article class="event-card" data-event="${event.id}">
      <div class="event-top">
        <div class="event-number">${String(index + 1).padStart(2,'0')}</div>
        <div class="event-title">
          <h3>${clean(event.name)}</h3>
          <div class="event-meta">
            <span class="kind-tag">${event.type === 'competitive' ? 'соревнование' : 'сценарий'}</span>
            <span class="coverage ${coverageClass}">${coverageText}</span>
          </div>
        </div>
        ${source ? `<a class="source-link" href="${source.url}" target="_blank" rel="noopener">источник ↗</a>` : ''}
      </div>
      ${table}
      ${(hasMore || isExpanded) && state.places === 'top3' ? `<div class="event-footer"><button class="expand-btn" data-expand="${event.id}">${isExpanded ? 'показать топ-3' : `показать все ${rawRows.length}`}</button></div>` : ''}
    </article>`;
  }

  function renderInternational() {
    const show = state.nonChina || state.scope === 'international';
    intlPanel.hidden = !show;
    if (!show) return;
    const items = data.internationalHighlights.filter(x => !isChina(x));
    intlGrid.innerHTML = items.map(item => {
      const source = data.sources[item.source];
      return `<article class="intl-card">
        <div class="country-line"><span class="flag">${flags[item.country] || '🌐'}</span>${clean(countryNames[item.country] || item.country)}</div>
        <h3>${clean(item.team)}</h3>
        <strong>${clean(item.result)} · ${clean(item.event)}</strong>
        <p>${clean(item.note)}</p>
        ${source ? `<a class="source-link" href="${source.url}" target="_blank" rel="noopener">${clean(source.label)} ↗</a>` : ''}
      </article>`;
    }).join('');
  }

  function render() {
    syncCategoryOptions();
    const events = visibleEvents();
    const groups = new Map();
    events.forEach(e => {
      if (!groups.has(e.category)) groups.set(e.category, []);
      groups.get(e.category).push(e);
    });

    if (!events.length) {
      root.innerHTML = '<div class="no-results"><h2>Нет найденных результатов</h2><p>Для выбранного фильтра подтверждённых позиций пока нет.</p></div>';
    } else {
      let globalIndex = 0;
      root.innerHTML = [...groups.entries()].map(([category, items]) => {
        const cards = items.map(e => eventCard(e, globalIndex++)).join('');
        const known = items.filter(e => e.placements.length).length;
        return `<section class="category-section">
          <div class="category-head"><h2>${clean(category)}</h2><p>${items.length} дисципл. · ${known} с опубликованными итогами</p></div>
          <div class="event-grid">${cards}</div>
        </section>`;
      }).join('');
    }

    const shownRows = events.reduce((sum,e) => sum + placementRows(e).length,0);
    document.getElementById('visibleEvents').textContent = events.length;
    document.getElementById('knownEvents').textContent = events.filter(e => e.placements.length > 0).length;
    document.getElementById('visibleRows').textContent = shownRows;
    renderInternational();
    syncControls();
    syncUrl();
  }

  function syncControls() {
    [...scopeTabs.querySelectorAll('.scope')].forEach(btn => btn.classList.toggle('active', btn.dataset.scope === state.scope));
    nonChina.checked = state.nonChina;
    placeSelect.value = state.places;
    categorySelect.value = state.category;
  }

  function syncUrl() {
    const q = new URLSearchParams();
    if (state.scope !== 'all') q.set('view',state.scope);
    if (state.nonChina) q.set('noncn','1');
    if (state.places !== 'top3') q.set('places',state.places);
    if (state.category !== 'all') q.set('category',state.category);
    const next = location.pathname + (q.toString() ? '?' + q.toString() : '');
    history.replaceState(null,'',next);
  }

  scopeTabs.addEventListener('click', e => {
    const btn = e.target.closest('[data-scope]');
    if (!btn) return;
    state.scope = btn.dataset.scope;
    if (state.scope === 'international') state.nonChina = true;
    state.category = 'all';
    expanded.clear();
    render();
  });

  nonChina.addEventListener('change', () => {
    state.nonChina = nonChina.checked;
    if (!state.nonChina && state.scope === 'international') state.scope = 'all';
    state.category = 'all';
    expanded.clear();
    render();
  });

  placeSelect.addEventListener('change', () => {
    state.places = placeSelect.value;
    expanded.clear();
    render();
  });

  categorySelect.addEventListener('change', () => {
    state.category = categorySelect.value;
    render();
  });

  root.addEventListener('click', e => {
    const btn = e.target.closest('[data-expand]');
    if (!btn) return;
    const id = btn.dataset.expand;
    expanded.has(id) ? expanded.delete(id) : expanded.add(id);
    render();
  });

  const keySources = ['official','robopodium','xinhua25','xinhua26','bjnewsScenario','agibot','tiangong','spqr'];
  document.getElementById('sourceLinks').innerHTML = keySources.map(key => {
    const s = data.sources[key];
    return `<a href="${s.url}" target="_blank" rel="noopener">${clean(s.label)} ↗</a>`;
  }).join('');

  render();
})();
