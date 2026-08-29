(() => {
  const style = document.createElement('style');
  style.textContent = '.team-link{cursor:pointer;border-bottom:1px dashed rgba(92,85,146,.35)}.team-link:hover,.team-link:focus{color:#6758b3;border-bottom-color:#6758b3;outline:none}';
  document.head.appendChild(style);
  const toTeam = el => {
    const name = (el?.textContent || '').trim();
    if (!name) return;
    location.href = './team.html?team=' + encodeURIComponent(name);
  };
  function decorate() {
    document.querySelectorAll('.placements .team strong, .intl-card h3').forEach(el => {
      if (el.dataset.teamLinked) return;
      el.dataset.teamLinked = '1';
      el.classList.add('team-link');
      el.setAttribute('role','link');
      el.setAttribute('tabindex','0');
      el.setAttribute('title','Открыть профиль команды');
      el.addEventListener('click', () => toTeam(el));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toTeam(el); } });
    });
  }
  decorate();
  new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
})();
