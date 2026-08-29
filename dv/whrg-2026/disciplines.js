(() => {
  const data = window.WHRG_DATA;
  const info = window.WHRG_DISCIPLINE_INFO || {};
  const root = document.getElementById('catalogRoot');
  const clean = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const groups = new Map();

  data.events.forEach(event => {
    if (!groups.has(event.category)) groups.set(event.category, []);
    groups.get(event.category).push(event);
  });

  root.innerHTML = [...groups.entries()].map(([category, events]) => `
    <section class="catalog-category">
      <div class="catalog-category-header">
        <h2>${clean(category)}</h2>
        <span>${events.length} дисципл.</span>
      </div>
      <div class="catalog-grid">
        ${events.map(event => {
          const details = info[event.id] || {};
          return `<a class="discipline-link-card" href="./discipline.html?id=${encodeURIComponent(event.id)}">
            <small><span>${event.type === 'competitive' ? 'соревнование' : 'сценарий'}</span><span>${clean(event.id)}</span></small>
            <strong>${clean(event.name)}</strong>
            <p>${clean(details.summary || 'Открыть описание и результаты дисциплины.')}</p>
          </a>`;
        }).join('')}
      </div>
    </section>`).join('');
})();
