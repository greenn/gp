(() => {
  const RECORDS = {
    c01: { result:'9,58 с', athlete:'Usain Bolt', country:'Ямайка', place:'Берлин', date:'16.08.2009', label:'100 м', note:'Стандартная дистанция 100 м. Мировой рекорд среди мужчин.', source:'https://worldathletics.org/records/all-time-toplists/sprints/100-metres/all/men/senior' },
    c02: { result:'9,58 с', athlete:'Usain Bolt', country:'Ямайка', place:'Берлин', date:'16.08.2009', label:'100 м', note:'Стандартная дистанция 100 м. Мировой рекорд среди мужчин.', source:'https://worldathletics.org/records/all-time-toplists/sprints/100-metres/all/men/senior' },
    c03: { result:'43,03 с', athlete:'Wayde van Niekerk', country:'ЮАР', place:'Рио-де-Жанейро', date:'14.08.2016', label:'400 м', note:'Стандартная дистанция 400 м. Мировой рекорд среди мужчин.', source:'https://worldathletics.org/records/all-time-toplists/sprints/400-metres/outdoor/men/senior' },
    c04: { result:'43,03 с', athlete:'Wayde van Niekerk', country:'ЮАР', place:'Рио-де-Жанейро', date:'14.08.2016', label:'400 м', note:'Стандартная дистанция 400 м. Мировой рекорд среди мужчин.', source:'https://worldathletics.org/records/all-time-toplists/sprints/400-metres/outdoor/men/senior' },
    c05: { result:'3:26,00', athlete:'Hicham El Guerrouj', country:'Марокко', place:'Рим', date:'14.07.1998', label:'1500 м', note:'Стандартная дистанция 1500 м. Мировой рекорд среди мужчин.', source:'https://worldathletics.org/records/all-time-toplists/middlelong/1500-metres/all/men/senior' },
    c06: { result:'36,84 с', athlete:'Jamaica', country:'Ямайка', place:'Лондон', date:'11.08.2012', label:'4×100 м', note:'Мировой рекорд мужской эстафеты 4×100 м.', source:'https://worldathletics.org/records/all-time-toplists/relays/4x100-metres-relay/outdoor/men/senior' },
    c10: { result:'8,95 м', athlete:'Mike Powell', country:'США', place:'Токио', date:'30.08.1991', label:'Прыжок в длину', note:'Мировой рекорд среди мужчин в классическом прыжке в длину с разбега.', source:'https://worldathletics.org/records/all-time-toplists/jumps/long-jump/outdoor/men/senior' }
  };
  window.WHRG_HUMAN_RECORDS = RECORDS;

  const style = document.createElement('style');
  style.textContent = `
    .human-record-toggle{white-space:nowrap}.human-record-wrap{display:none;position:relative;vertical-align:middle;margin-left:7px;z-index:40}.show-human-records .human-record-wrap{display:inline-flex}.human-record-line{display:flex;align-items:center;gap:3px;min-width:0}.human-record-line h3{min-width:0}.show-human-records .event-card{overflow:visible}.human-record-badge{width:25px;height:25px;display:grid;place-items:center;padding:0;border:1px solid rgba(105,93,184,.25);border-radius:9px;background:linear-gradient(145deg,#f7f4ff,#e4eaff);color:#6658b1;cursor:help;box-shadow:0 4px 10px rgba(67,58,128,.12)}.human-record-badge svg{width:15px;height:15px;display:block}.human-record-badge:hover,.human-record-badge:focus{outline:none;background:#fff;border-color:#7465c8}.human-record-tooltip{position:absolute;left:50%;bottom:calc(100% + 9px);width:245px;transform:translateX(-50%) translateY(5px);padding:12px 13px;border-radius:14px;background:rgba(35,34,68,.97);color:white;box-shadow:0 16px 34px rgba(30,25,70,.28);opacity:0;visibility:hidden;pointer-events:none;transition:.14s ease;text-align:left;font-size:11px;line-height:1.45}.human-record-tooltip:after{content:"";position:absolute;left:50%;top:100%;margin-left:-6px;border:6px solid transparent;border-top-color:rgba(35,34,68,.97)}.human-record-wrap:hover .human-record-tooltip,.human-record-wrap:focus-within .human-record-tooltip,.human-record-wrap.open .human-record-tooltip{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);pointer-events:auto}.human-record-tooltip strong{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#c9c1ff;margin-bottom:4px}.human-record-tooltip b{display:block;font-size:20px;line-height:1.1;margin-bottom:5px}.human-record-tooltip span{display:block;color:rgba(255,255,255,.84)}.human-record-tooltip em{display:block;margin-top:7px;padding-top:7px;border-top:1px solid rgba(255,255,255,.12);font-style:normal;color:rgba(255,255,255,.68)}.human-record-tooltip a{display:inline-block;margin-top:7px;color:#d8d2ff;font-weight:700;text-decoration:none}.human-record-tooltip a:hover{text-decoration:underline}.human-record-compact{height:39px;display:flex;align-items:center;gap:9px;padding:0 12px;border-radius:13px;background:rgba(255,255,255,.34);font-size:12px;font-weight:700;color:#47436e;cursor:pointer}.human-record-compact input{accent-color:#7161d4}.discipline-human-record{display:none;align-items:center;gap:8px}.show-human-records .discipline-human-record{display:inline-flex}.discipline-human-record .human-record-wrap{display:inline-flex;margin-left:0}.discipline-human-record-label{font-size:11px;font-weight:750;color:#6055a4}
    @media(max-width:760px){.human-record-tooltip{left:0;transform:translateX(-25%) translateY(5px);width:220px}.human-record-wrap:hover .human-record-tooltip,.human-record-wrap:focus-within .human-record-tooltip,.human-record-wrap.open .human-record-tooltip{transform:translateX(-25%) translateY(0)}.human-record-tooltip:after{left:30%}}
  `;
  document.head.appendChild(style);

  const icon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.2"></circle><path d="M9.5 10.5 12 8l2.5 2.5M12 8v6m0 0-3.2 5M12 14l3.6 5M8.7 12.2 5.5 15M15.3 12.2l3.2 2.8"></path></svg>`;

  function getStored() {
    try { return localStorage.getItem('whrg-human-records') === '1'; } catch (_) { return false; }
  }
  function store(value) {
    try { localStorage.setItem('whrg-human-records', value ? '1' : '0'); } catch (_) {}
  }
  let visible = getStored();

  function setVisible(value) {
    visible = !!value;
    document.body.classList.toggle('show-human-records', visible);
    document.querySelectorAll('[data-human-record-toggle]').forEach(input => { input.checked = visible; });
    store(visible);
  }

  function addToggle() {
    if (document.querySelector('[data-human-record-toggle]')) return;
    const filterRow = document.querySelector('.filter-row');
    if (filterRow) {
      const label = document.createElement('label');
      label.className = 'toggle human-record-toggle';
      label.innerHTML = `<input type="checkbox" data-human-record-toggle><span class="toggle-ui"></span><span>Рекорд человека</span>`;
      const firstSelect = filterRow.querySelector('.select-wrap');
      filterRow.insertBefore(label, firstSelect || null);
      label.querySelector('input').addEventListener('change', e => setVisible(e.target.checked));
      return;
    }
    const topbar = document.querySelector('.discipline-topbar');
    if (topbar) {
      const label = document.createElement('label');
      label.className = 'human-record-compact';
      label.innerHTML = `<input type="checkbox" data-human-record-toggle><span>Рекорд человека</span>`;
      topbar.appendChild(label);
      label.querySelector('input').addEventListener('change', e => setVisible(e.target.checked));
    }
  }

  function makeBadge(id, rec) {
    const wrap = document.createElement('span');
    wrap.className = 'human-record-wrap';
    wrap.dataset.humanRecordId = id;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'human-record-badge';
    button.setAttribute('aria-label', `Рекорд человека: ${rec.label}, ${rec.result}`);
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = icon;
    const tip = document.createElement('span');
    tip.className = 'human-record-tooltip';
    tip.setAttribute('role','tooltip');
    tip.innerHTML = `<strong>Рекорд человека · ${rec.label}</strong><b>${rec.result}</b><span>${rec.athlete} · ${rec.country}</span><span>${rec.place} · ${rec.date}</span><em>${rec.note}</em><a href="${rec.source}" target="_blank" rel="noopener">World Athletics ↗</a>`;
    wrap.append(button, tip);
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const open = !wrap.classList.contains('open');
      document.querySelectorAll('.human-record-wrap.open').forEach(el => el.classList.remove('open'));
      wrap.classList.toggle('open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    tip.addEventListener('click', e => e.stopPropagation());
    return wrap;
  }

  function decorateCards() {
    document.querySelectorAll('.event-card[data-event]').forEach(card => {
      const id = card.dataset.event;
      const rec = RECORDS[id];
      if (!rec || card.querySelector(`.human-record-wrap[data-human-record-id="${id}"]`)) return;
      const h3 = card.querySelector('.event-title h3');
      if (!h3) return;
      let line = h3.parentElement?.classList.contains('human-record-line') ? h3.parentElement : null;
      if (!line) {
        line = document.createElement('div');
        line.className = 'human-record-line';
        h3.parentNode.insertBefore(line, h3);
        line.appendChild(h3);
      }
      line.appendChild(makeBadge(id, rec));
    });
  }

  function decorateDisciplinePage() {
    const hero = document.getElementById('disciplineHero');
    if (!hero || hero.dataset.humanRecordDone) return;
    const id = new URLSearchParams(location.search).get('id');
    const rec = RECORDS[id];
    const h1 = hero.querySelector('h1');
    if (!rec || !h1) return;
    hero.dataset.humanRecordDone = '1';
    const badges = hero.querySelector('.discipline-badges') || hero;
    const item = document.createElement('span');
    item.className = 'discipline-human-record';
    const label = document.createElement('span');
    label.className = 'discipline-human-record-label';
    label.textContent = 'Рекорд человека';
    item.append(label, makeBadge(id, rec));
    badges.appendChild(item);
  }

  addToggle();
  setVisible(visible);
  decorateCards();
  decorateDisciplinePage();
  new MutationObserver(() => {
    addToggle();
    decorateCards();
    decorateDisciplinePage();
    document.body.classList.toggle('show-human-records', visible);
  }).observe(document.body, {childList:true, subtree:true});
  document.addEventListener('click', e => {
    if (!e.target.closest('.human-record-wrap')) document.querySelectorAll('.human-record-wrap.open').forEach(el => el.classList.remove('open'));
  });
})();
