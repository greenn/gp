(() => {
  const data = window.WHRG_DATA;
  const params = new URLSearchParams(location.search);
  const requested = (params.get('team') || '').trim();
  const hero = document.getElementById('teamHero');
  const content = document.getElementById('teamContent');
  const notFound = document.getElementById('notFound');
  const countryNames = {CN:'Китай',JP:'Япония',IT:'Италия',HK:'Гонконг, Китай',DE:'Германия',BR:'Бразилия',US:'США',KR:'Южная Корея',NL:'Нидерланды',AU:'Австралия'};
  const flags = {CN:'🇨🇳',JP:'🇯🇵',IT:'🇮🇹',HK:'🇭🇰',DE:'🇩🇪',BR:'🇧🇷',US:'🇺🇸',KR:'🇰🇷',NL:'🇳🇱',AU:'🇦🇺'};
  const clean = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const norm = value => String(value || '').trim().toLocaleLowerCase();

  function allPlacements() {
    return data.events.flatMap(event => event.placements.map(p => ({event,p})));
  }

  function findRawTeam(name, aliases = []) {
    const keys = new Set([name,...aliases].filter(Boolean).map(norm));
    return allPlacements().filter(({p}) => keys.has(norm(p.team)));
  }

  function genericTeam(name) {
    const matches = findRawTeam(name);
    if (!matches.length) return null;
    const first = matches[0].p;
    return {
      id: null,
      name,
      aliases:[name],
      country:first.country || null,
      countryName:countryNames[first.country] || first.country || '—',
      organization:null,
      type:'Участник WHRG 2026',
      summary:'Для этой команды в проекте пока нет отдельного расширенного профиля. Ниже собраны все подтверждённые результаты, найденные в текущем наборе WHRG 2026.',
      robots:{whrgPlatform:first.robot || null,whrgCount:null,whrgCountNote:'Точное количество роботов и аппаратная конфигурация пока не подтверждены отдельным источником.'},
      sources:[]
    };
  }

  function medalClass(rank){return rank===1?'gold':rank===2?'silver':rank===3?'bronze':''}
  function placeLabel(rank){return rank ? `${rank}-е` : '—'}

  function renderHero(team, matches) {
    const image = team.images?.[0];
    const country = team.country || matches[0]?.p.country;
    const bestRank = matches.length ? Math.min(...matches.map(x => x.p.rank || 999)) : null;
    const quick = [
      ['Лучшее место', bestRank && bestRank < 999 ? placeLabel(bestRank) : '—'],
      ['Дисциплин', String(matches.length)],
      ['Робот', team.robots?.whrgPlatform || 'не указан']
    ];
    hero.innerHTML = `
      <div class="team-hero-copy">
        <div class="team-country"><span class="flag">${flags[country] || '🌐'}</span>${clean(team.countryName || countryNames[country] || country || 'International')}</div>
        <h1>${clean(team.name)}</h1>
        <div class="team-org">${clean(team.organization || team.type || 'WHRG 2026 team')}</div>
        <p class="team-summary">${clean(team.summary || '')}</p>
        <div class="team-quickstats">${quick.map(([k,v])=>`<div class="quickstat"><small>${clean(k)}</small><strong>${clean(v)}</strong></div>`).join('')}</div>
      </div>
      <div class="team-visual ${image?'':'no-photo'}">
        <img src="${image ? clean(image.url) : './blank/ui/robot.svg'}" alt="${clean(image?.caption || team.name)}" referrerpolicy="no-referrer" onerror="this.src='./blank/ui/robot.svg';this.parentElement.classList.add('no-photo')">
      </div>`;
  }

  function renderWhrg(team) {
    const w = team.whrg2026;
    const people = team.peopleAtBeijing || [];
    const robot = team.robots || {};
    const cards = [];
    if (w?.event) cards.push(['Дисциплина',w.event]);
    if (w?.place) cards.push(['Место',placeLabel(w.place)]);
    if (w?.medal) cards.push(['Медаль',w.medal]);
    if (w?.finalScore) cards.push(['Финал',w.finalScore]);
    if (w?.finalOpponent) cards.push(['Соперник',w.finalOpponent]);
    if (team.founded) cards.push(['Команда с',String(team.founded)]);

    document.getElementById('whrgCard').innerHTML = `
      <h2>WHRG 2026</h2>
      ${cards.length ? `<div class="fact-grid">${cards.map(([k,v])=>`<div class="fact"><small>${clean(k)}</small><strong>${clean(v)}</strong></div>`).join('')}</div>` : '<p>Расширенная карточка результата пока не заполнена.</p>'}
      ${w?.note ? `<p class="notice">${clean(w.note)}</p>` : ''}
      ${robot.whrgCountNote ? `<h3>Сколько роботов</h3><p>${clean(robot.whrgCountNote)}</p>` : ''}
      ${people.length ? `<h3>Представители команды в Пекине</h3><div class="people-list">${people.map(x=>`<span class="person-pill">${clean(x)}</span>`).join('')}</div>` : ''}`;
  }

  function renderRobot(team) {
    const r = team.robots || {};
    const specs = team.robotSpecs || null;
    const specLabels = {
      height:'Высота',weight:'Масса',dof:'Степени свободы',legDof:'Нога',armDof:'Рука',waistDof:'Талия',headDof:'Голова',maxJointTorque:'Пиковый момент',walkingSpeed:'Скорость ходьбы',battery:'Батарея',walkingEndurance:'Ходьба',maxDualArmPayload:'Нагрузка двух рук',vision:'Зрение',compute:'Вычисления'
    };
    let html = `<h2>Роботы и характеристики</h2>`;
    html += `<div class="fact-grid"><div class="fact"><small>Платформа WHRG</small><strong>${clean(r.whrgPlatform || 'не подтверждена')}</strong></div><div class="fact"><small>Количество</small><strong>${r.whrgCount ?? 'нет точных данных'}</strong></div>${specs?.model ? `<div class="fact"><small>Модель данных</small><strong>${clean(specs.model)}</strong></div>`:''}</div>`;
    if (specs) {
      html += specs.scopeNote ? `<p class="notice">${clean(specs.scopeNote)}</p>` : '';
      html += `<div class="spec-grid">${Object.entries(specs).filter(([k])=>specLabels[k]).map(([k,v])=>`<div class="spec"><span>${clean(specLabels[k])}</span><b>${clean(v)}</b></div>`).join('')}</div>`;
    } else {
      html += `<p>Отдельные технические характеристики для этой команды пока не привязаны к надёжному источнику.</p>`;
    }
    if (r.otherPlatforms?.length) html += `<h3>Другие платформы SPQR</h3>${r.otherPlatforms.map(x=>`<p>• ${clean(x)}</p>`).join('')}`;
    document.getElementById('robotCard').innerHTML = html;
  }

  function renderResults(team, matches) {
    const rows = matches.sort((a,b)=>(a.p.rank||999)-(b.p.rank||999));
    document.getElementById('resultsCard').innerHTML = `
      <h2>Результаты команды в текущей базе</h2>
      ${rows.length ? `<div style="overflow:auto"><table class="team-results-table"><thead><tr><th>Место</th><th>Дисциплина</th><th>Категория</th><th>Результат</th></tr></thead><tbody>${rows.map(({event,p})=>`<tr><td><span class="place-medal ${medalClass(p.rank)}">${p.rank || '—'}</span></td><td><strong>${clean(event.name)}</strong></td><td>${clean(event.category)}</td><td>${clean(p.result || '—')}</td></tr>`).join('')}</tbody></table></div>` : '<p>В текущей базе нет строк результатов для этого имени команды.</p>'}`;
  }

  function renderGallery(team) {
    const images = team.images || [];
    const box = document.getElementById('galleryCard');
    if (!images.length) {
      box.innerHTML = `<h2>Изображения</h2><p>Для этой команды пока нет изображения, которое можно уверенно связать с ней или её платформой.</p>`;
      return;
    }
    box.innerHTML = `<h2>Изображения</h2><div class="gallery">${images.map((img,i)=>`<figure class="gallery-item"><img class="${img.kind==='robot'?'object-contain':''}" src="${clean(img.url)}" alt="${clean(img.caption || team.name)}" loading="lazy" referrerpolicy="no-referrer"><figcaption class="gallery-caption"><b>${clean(img.credit || '')}</b><p>${clean(img.caption || '')}</p><div class="gallery-actions"><a href="${clean(img.url)}" target="_blank" rel="noopener">открыть файл ↗</a>${img.sourceUrl?`<a href="${clean(img.sourceUrl)}" target="_blank" rel="noopener">первоисточник ↗</a>`:''}</div></figcaption></figure>`).join('')}</div><p class="notice">Фото загружаются с сайтов первоисточников. Их URL также сохранены в teams.json; проект не выдаёт сторонние фотографии за собственные.</p>`;
  }

  function renderSources(team) {
    const sources = team.sources || [];
    document.getElementById('sourcesCard').innerHTML = `<h2>Источники</h2>${team.website?`<p><a class="data-download" href="${clean(team.website)}" target="_blank" rel="noopener">Сайт команды ↗</a></p>`:''}<div class="source-list">${sources.length?sources.map(s=>`<div class="source-item"><a href="${clean(s.url)}" target="_blank" rel="noopener">${clean(s.label)} ↗</a>${s.note?`<p>${clean(s.note)}</p>`:''}</div>`).join(''):'<p>Дополнительные источники пока не добавлены.</p>'}</div>`;
  }

  function mergedDownload(team,matches){
    return {...team,results:matches.map(({event,p})=>({eventId:event.id,type:event.type,category:event.category,event:event.name,rank:p.rank,result:p.result||null,robot:p.robot||null,note:p.note||null,source:event.source||null}))};
  }

  async function init() {
    if (!requested) { hero.hidden=true; notFound.hidden=false; return; }
    let curated=[];
    try { const r=await fetch('./teams.json',{cache:'no-store'}); if(r.ok) curated=(await r.json()).teams||[]; } catch(e) {}
    const cur = curated.find(t => [t.name,...(t.aliases||[])].some(a => norm(a)===norm(requested)));
    const team = cur || genericTeam(requested);
    if (!team) { hero.hidden=true; notFound.hidden=false; return; }
    const matches = findRawTeam(team.name,team.aliases||[]);
    document.title = `${team.name} · WHRG 2026`;
    renderHero(team,matches);
    renderWhrg(team);
    renderRobot(team);
    renderResults(team,matches);
    renderGallery(team);
    renderSources(team);
    content.hidden=false;
    document.getElementById('downloadTeamJson').addEventListener('click',()=>{
      const blob=new Blob([JSON.stringify(mergedDownload(team,matches),null,2)],{type:'application/json;charset=utf-8'});
      const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=(team.id||team.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'team')+'.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
  }

  init();
})();
