(() => {
  const style = document.createElement('style');
  style.textContent = '.event-title h3.discipline-link{cursor:pointer;color:#2e2c56}.event-title h3.discipline-link:hover,.event-title h3.discipline-link:focus{color:#6558a9;text-decoration:underline;outline:none}.catalog-shortcut{display:inline-flex;align-items:center;padding:10px 14px;border-radius:13px;background:rgba(255,255,255,.28);color:#48436e;text-decoration:none;font-size:13px;font-weight:700}.catalog-shortcut:hover{background:rgba(255,255,255,.45)}';
  document.head.appendChild(style);

  function decorate() {
    document.querySelectorAll('.event-card[data-event] .event-title h3').forEach(el => {
      if (el.dataset.disciplineLinked) return;
      const card = el.closest('.event-card[data-event]');
      const id = card?.dataset.event;
      if (!id) return;
      el.dataset.disciplineLinked = '1';
      el.classList.add('discipline-link');
      el.setAttribute('role','link');
      el.setAttribute('tabindex','0');
      el.setAttribute('title','Открыть описание дисциплины');
      const open = () => { location.href = './discipline.html?id=' + encodeURIComponent(id); };
      el.addEventListener('click', open);
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  const tabs = document.getElementById('scopeTabs');
  if (tabs && !document.getElementById('allDisciplinesLink')) {
    const link = document.createElement('a');
    link.id = 'allDisciplinesLink';
    link.className = 'catalog-shortcut';
    link.href = './disciplines.html';
    link.textContent = 'Все дисциплины ↗';
    tabs.appendChild(link);
  }

  decorate();
  new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
})();
