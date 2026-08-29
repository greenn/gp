(() => {
  const root = document.getElementById('siteNav');
  if (!root) return;
  const active = root.dataset.active || '';
  const VERSION = '0.0.31';
  window.WHRG_VERSION = VERSION;
  const links = [
    ['./','Результаты','home'],
    ['./posts.html','Посты','posts'],
    ['./disciplines.html','Дисциплины','disciplines'],
    ['./robots.html','Роботы по победам','robots']
  ];
  root.innerHTML = `<div class="top-nav"><a class="brand-wrap" href="./" aria-label="WHRG 2026 — главная"><img class="brand-logo" src="./assets/whrg-2026-logo.svg" alt="WHRG 2026 — World Humanoid Robot Games"><span class="brand-version" title="Версия интерфейса">v${VERSION}</span></a><nav class="top-links" aria-label="Разделы WHRG 2026">${links.map(([href,label,key]) => `<a class="${active===key?'active':''}" href="${href}">${label}</a>`).join('')}</nav></div>`;
})();