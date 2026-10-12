/* T2Fb Photo Prompt Lab — no external runtime dependencies. */
(function () {
  'use strict';
  const D = window.T2FB_CATALOG || (typeof T2FB_CATALOG !== 'undefined' ? T2FB_CATALOG : null);
  if (!D) { document.getElementById('params').textContent = 'Не удалось загрузить каталог.'; return; }
  const $ = (sel, host=document) => host.querySelector(sel);
  const $$ = (sel, host=document) => Array.from(host.querySelectorAll(sel));
  const STORE = 't2fb-photo-prompt-lab-v1';
  const defaults = {
    preset:'PORTRAIT_EDITORIAL', subjectType:'student', views:'3', viewMode:'angles',
    page:'builder', group:'all', quickGroup:'Все', output:'full',
    selected:['scene_subject','photo_intent','composition_aspect','micro_surface','exposure_tone','post_output'],
    values:{
      scene_subject:'исходная 3D-модель учащейся; сохранить лицо, визуальный возраст, причёску, одежду и позу',
      photo_intent:'portrait', composition_aspect:'2:3, full-body',
      micro_surface:'natural skin pores, fine facial hair, fabric weave',
      exposure_tone:'soft highlight roll-off; natural shadows',
      post_output:'neutral editorial; restrained sharpening; no beauty smoothing'
    },
    quick:[], note:''
  };
  const qgroup = ['Все'].concat(Array.from(new Set(D.quick.map(q=>q.group))));
  const byKey = Object.fromEntries(D.params.map(p => [p.key,p]));
  let S = load();
  let showingPresetExplanation = false;
  let toastTimer = 0;
  let searchParam = '';
  let searchQuick = '';

  function load(){
    let data=null;
    try {data=JSON.parse(localStorage.getItem(STORE) || 'null');} catch(_){}
    if(!data || typeof data!=='object') return JSON.parse(JSON.stringify(defaults));
    return sanitize(data);
  }
  function sanitize(data) {
    const p = new Set(D.params.map(x => x.key));
    const pre = new Set(D.presets.map(x=>x.id));
    const result={...JSON.parse(JSON.stringify(defaults)),...data};
    result.selected=Array.isArray(data.selected)?data.selected.filter(x=>p.has(x)):[...defaults.selected];
    result.quick=Array.isArray(data.quick)?data.quick.filter(x=>Number.isInteger(x)&&x>=0&&x<D.quick.length):[];
    result.values={...defaults.values};
    if(data.values && typeof data.values==='object') Object.keys(data.values).forEach(k=>{if(p.has(k)&&typeof data.values[k]==='string') result.values[k]=data.values[k].slice(0,1500);});
    result.preset=pre.has(data.preset)?data.preset:defaults.preset;
    result.subjectType=['student','adult','object'].includes(data.subjectType)?data.subjectType:defaults.subjectType;
    result.views=['1','2','3','4'].includes(String(data.views))?String(data.views):defaults.views;
    result.viewMode=['angles','cameras','mixed'].includes(data.viewMode)?data.viewMode:defaults.viewMode;
    result.page=['builder','quick','guide'].includes(data.page)?data.page:'builder';
    result.group=D.groups.some(x=>x.id===data.group)?data.group:'all';
    result.quickGroup=qgroup.includes(data.quickGroup)?data.quickGroup:'Все';
    result.output=['full','code','quick'].includes(data.output)?data.output:'full';
    result.note=typeof data.note==='string'?data.note.slice(0,3000):'';
    return result;
  }
  function save(){ try{localStorage.setItem(STORE,JSON.stringify(S));}catch(_){} }
  function notify(msg){const n=$('#toast');n.textContent=msg;n.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>n.classList.remove('show'),2400);}
  function htmlEsc(s){return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function qval(key){ return typeof S.values[key]==='string' ? S.values[key] : (byKey[key]?.example||''); }
  function selected(key){ return S.selected.includes(key); }
  function chooseParam(key,on){
    S.selected=on?[...new Set([...S.selected,key])]:S.selected.filter(x=>x!==key);
    save(); refresh();
  }
  function buildPresetOptions() {
    const el=$('#preset');
    D.presets.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.name;el.appendChild(o);});
    el.value=S.preset;
    updatePresetText();
    el.addEventListener('change',()=>{
      S.preset=el.value;showingPresetExplanation=false;updatePresetText();save();refresh();
    });
    $('#explainPreset').addEventListener('click',()=>{
      showingPresetExplanation=!showingPresetExplanation;updatePresetText();
    });
  }
  function updatePresetText(){
    const pr=D.presets.find(x=>x.id===S.preset)||D.presets[0];
    $('#presetSummary').textContent=showingPresetExplanation?pr.description:'Пресет задаёт недостающие параметры, но не заменяет ваши значения.';
    $('#explainPreset').textContent=showingPresetExplanation?'↑ Свернуть пояснение':'ⓘ Пояснить пресет';
  }
  function buildChips(){
    $('#categoryChips').innerHTML=D.groups.map(g=>'<button type="button" class="chip'+(S.group===g.id?' active':'')+'" data-group="'+g.id+'">'+htmlEsc(g.name)+'</button>').join('');
    $('#categoryChips').addEventListener('click',ev=>{
      const btn=ev.target.closest('[data-group]');if(!btn)return;S.group=btn.dataset.group;save();renderParams();
    });
  }
  function renderParams(){
    const list=$('#params');
    const items=D.params.filter(p=>(S.group==='all'||S.group===p.group)&&
      [p.key,p.id,p.title,p.help,p.tip].join(' ').toLowerCase().includes(searchParam));
    const fragment=document.createDocumentFragment();
    items.forEach(p=>{
      const el=document.createElement('article');
      el.className='param-card'+(selected(p.key)?' enabled':'');
      el.dataset.key=p.key;
      el.innerHTML='<div class="param-row">'+
        '<input class="check" type="checkbox" aria-label="Включить '+htmlEsc(p.title)+'"'+(selected(p.key)?' checked':'')+'>'+
        '<span class="param-num">'+p.id+'</span>'+
        '<div class="param-name">'+htmlEsc(p.title)+'<small>'+htmlEsc(p.key)+'</small></div>'+
        '<div class="param-actions"><button type="button" class="explain" aria-expanded="false">ⓘ Пояснить</button></div>'+
        '</div><div class="param-controls">'+
        '<select aria-label="Быстрый выбор: '+htmlEsc(p.title)+'"><option value="">Выбрать вариант…</option>'+
        p.options.map(o=>'<option value="'+htmlEsc(o.value)+'">'+htmlEsc(o.label)+'</option>').join('')+'</select>'+
        '<input class="value-field" type="text" maxlength="1500" aria-label="Значение: '+htmlEsc(p.title)+'" placeholder="Своё значение…">'+
        '</div><div class="param-extra" hidden><b>Что делает:</b> '+htmlEsc(p.help)+
        '<br><b>Зачем и когда:</b> '+htmlEsc(p.tip)+
        '<br><b>Пример:</b> <span class="example-tag">'+htmlEsc(p.example)+'</span></div>';
      const checkbox=$('.check',el), select=$('select',el), input=$('.value-field',el), info=$('.param-extra',el), explain=$('.explain',el);
      input.value=qval(p.key);
      select.value=p.options.some(o=>o.value===input.value)?input.value:'';
      select.disabled=!selected(p.key);input.disabled=!selected(p.key);
      checkbox.addEventListener('change',()=>{
        chooseParam(p.key,checkbox.checked);el.classList.toggle('enabled',checkbox.checked);
        select.disabled=!checkbox.checked;input.disabled=!checkbox.checked;
      });
      select.addEventListener('change',()=>{
        if(!select.value)return;
        input.value=select.value;S.values[p.key]=select.value;
        if(!selected(p.key)){checkbox.checked=true;chooseParam(p.key,true);}
        save();refresh();
      });
      input.addEventListener('input',()=>{
        S.values[p.key]=input.value;
        if(!selected(p.key)){checkbox.checked=true;chooseParam(p.key,true);}
        save();refresh();
      });
      explain.addEventListener('click',()=>{
        const open=info.hidden;info.hidden=!open;explain.setAttribute('aria-expanded',String(open));
        explain.textContent=open?'↑ Скрыть':'ⓘ Пояснить';
      });
      fragment.appendChild(el);
    });
    list.replaceChildren(fragment);
    $('#emptyParams').hidden=items.length>0;
    $('#parameterCount').textContent=items.length;
    $$('.chip','#categoryChips').forEach(btn=>btn.classList.toggle('active',btn.dataset.group===S.group));
    $('#metricActive').textContent=S.selected.length;
  }
  function renderQuickTabs(){
    $('#quickTabs').innerHTML=qgroup.map(g=>'<button class="quick-tab'+(S.quickGroup===g?' active':'')+'" data-quick-group="'+htmlEsc(g)+'">'+htmlEsc(g)+'</button>').join('');
  }
  function renderQuick(){
    renderQuickTabs();
    const items=D.quick.map((q,i)=>({...q,index:i})).filter(q=>(S.quickGroup==='Все'||q.group===S.quickGroup)&&
       [q.name,q.cmd,q.desc].join(' ').toLowerCase().includes(searchQuick));
    const host=$('#quickItems');const frag=document.createDocumentFragment();
    for(const q of items){
      const div=document.createElement('article');div.className='quick-card';
      const added=S.quick.includes(q.index);
      div.innerHTML='<div class="quick-head"><div class="quick-name">'+htmlEsc(q.name)+'</div><button class="explain" type="button" aria-expanded="false">ⓘ Пояснить</button></div>'+
        '<code class="quick-code">'+htmlEsc(q.cmd)+'</code>'+
        '<p class="quick-detail" hidden>'+htmlEsc(q.desc)+'</p>'+
        '<div class="quick-bottom"><button type="button" class="quick-add'+(added?' added':'')+'">'+(added?'✓ В подборке':'+ В подборку')+'</button><button class="explain copy-one" type="button">⧉ Копировать</button></div>';
      $('.quick-head .explain',div).addEventListener('click',()=>{
        const detail=$('.quick-detail',div);detail.hidden=!detail.hidden;
        $('.quick-head .explain',div).textContent=detail.hidden?'ⓘ Пояснить':'↑ Скрыть';
        $('.quick-head .explain',div).setAttribute('aria-expanded',String(!detail.hidden));
      });
      $('.quick-add',div).addEventListener('click',()=>{
        S.quick=added?S.quick.filter(i=>i!==q.index):[...S.quick,q.index];
        save();renderQuick();refresh();
      });
      $('.copy-one',div).addEventListener('click',()=>copyText(q.cmd));
      frag.appendChild(div);
    }
    host.replaceChildren(frag);$('#quickEmpty').hidden=items.length>0;
    $$('#quickTabs .quick-tab').forEach(btn=>btn.addEventListener('click',()=>{
      S.quickGroup=btn.dataset.quickGroup;save();renderQuick();
    }));
  }
  function compileCode(){
    const preset='@'+S.preset;
    const used=D.params.filter(p=>selected(p.key)&&qval(p.key).trim()!=='');
    if(!used.length)return '32 '+preset+' {\n}';
    const lines=used.map(p=>'  '+p.key+'="'+qval(p.key).trim().replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,' ')+'"');
    return '32 '+preset+' {\n'+lines.join(',\n')+'\n}';
  }
  function composeInstruction(){
    let base='';
    if(S.subjectType==='student'){
      base='Используй приложенный 3D-рендер как исходник. Создай фотореалистичную фотографию этого же персонажа. Строго сохрани узнаваемое лицо, визуальный школьный возраст, причёску, одежду, пропорции и общую позу. Не взросли персонажа. Подача нейтральная и возрастосоответствующая, без сексуализации.';
    } else if(S.subjectType==='adult'){
      base='Используй приложенный 3D-рендер как исходник. Создай реалистичную фотографию того же взрослого персонажа. Сохрани узнаваемое лицо, возраст, причёску, одежду, пропорции и позу, если явно не указано обратное.';
    } else {
      base='Используй приложенный 3D-рендер как исходник. Создай фотографически правдоподобное изображение, сохранив форму, масштаб, геометрию, материалы и расположение объектов.';
    }
    const count=Number(S.views);
    if(count>1){
      const prefix='Сделай '+count+' согласованных '+(count===2?'кадра':'кадра')+' одной и той же модели.';
      const mode=S.viewMode==='angles'?'Различия: фронтальный, три четверти, профиль; остальные ракурсы по смыслу.':S.viewMode==='cameras'?
        'Различия: нейтральная фотокамера, смартфон, студийная съёмка, при необходимости четвёртая естественная камера. Если в параметрах указана камера, применяй её к основному кадру.':
        'Различия: сначала ракурсы, затем характер камер; сохраняй внешность и одежду.';
      base+=' '+prefix+' '+mode;
    }
    base+=' Убирай признаки CGI прежде всего через физически правдоподобную камеру, свет, материалы и микрофактуру. Не добавляй 8K, случайный шум, сильную ретушь, bloom и другие дефекты без явного запроса.';
    return base;
  }
  function fullPrompt(){
    let s='@T2Fb\n\n'+composeInstruction()+'\n\n'+compileCode();
    if(S.quick.length) s+='\n\nДополнительные короткие команды (как естественные указания):\n'+S.quick.map(i=>D.quick[i].cmd).join('\n');
    if(S.note.trim())s+='\n\nДополнительные условия:\n'+S.note.trim();
    return s;
  }
  function quickPrompt(){
    return S.quick.length?S.quick.map(i=>D.quick[i].cmd).join('\n'):'Выберите команды в разделе «Короткие команды».';
  }
  function analyze(){
    const tips=[];
    const focal=Number(qval('focal_mm'));
    if(selected('focal_mm')&&selected('photo_intent')&&(/portrait/i).test(qval('photo_intent'))&&Number.isFinite(focal)&&focal>0&&focal<=24)
      tips.push('Широкоугольный объектив в близком портрете может искажать лицо. Сохраняйте дистанцию.');
    if(selected('sensor_camera')&&qval('sensor_camera')==='smartphone'&&selected('focal_mm')&&focal>=85)
      tips.push('85 мм на смартфоне возможны не для каждой камеры. Уточните эквивалент фокусного расстояния.');
    const sh=selected('shutter')?qval('shutter'):'';
    if(sh.includes('1/30')&&S.quick.some(i=>/walking|бильярд|спорт/i.test(D.quick[i].cmd)))
      tips.push('Выдержка 1/30 с при движении может дать смаз. Не требуйте полной резкости.');
    if(selected('dof_bokeh')&&qval('dof_bokeh')==='deep'&&selected('aperture')&&/f\/1\.[248]/.test(qval('aperture')))
      tips.push('Глубокая резкость при широкой диафрагме возможна не всегда. Проверьте дистанцию и сенсор.');
    if(selected('source_size_softness')&&qval('source_size_softness')==='very-soft'&&selected('key_light')&&/hard noon/i.test(qval('key_light')))
      tips.push('Жёсткое полуденное солнце противоречит очень мягким теням.');
    if(S.viewMode==='cameras'&&selected('sensor_camera')&&Number(S.views)>1)
      tips.push('Для серии разных камер явный sensor_camera применяется к основному кадру.');
    if(!S.selected.length)tips.push('Ни одного поля не выбрано: применяется только пресет.');
    return tips;
  }
  function refresh(){
    $('#metricActive').textContent=S.selected.length;
    $('#metricPreset').textContent=S.preset.replace('PORTRAIT_EDITORIAL','PORTRAIT').replace('BASE_NEUTRAL','BASE').replace('SMARTPHONE_CASUAL','PHONE').replace('STREET_DOCUMENTARY','STREET').replace('PRODUCT_STUDIO','PRODUCT').replace('ARCH_INTERIOR_DAY','ARCH').replace('NIGHT_URBAN','NIGHT').replace('AUTOMOTIVE_NATURAL','AUTO');
    $('#promptOutput').textContent=S.output==='code'?compileCode():(S.output==='quick'?quickPrompt():fullPrompt());
    const warnings=analyze();
    $('#validation').innerHTML=warnings.length?warnings.map(w=>'<div class="notice">⚠ '+htmlEsc(w)+'</div>').join(''):'<div class="success">✓ Автоматическая проверка не нашла очевидных конфликтов.</div>';
    $$('.output-switch button').forEach(b=>{const v=b.dataset.output===S.output;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
  }
  async function copyText(text){
    let ok=false;
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);ok=true;}}catch(_){}
    if(!ok){
      const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.left='-10000px';document.body.appendChild(ta);ta.select();
      try{ok=document.execCommand('copy');}catch(_){}ta.remove();
    }
    notify(ok?'Команда скопирована':'Не удалось скопировать. Выделите текст вручную.');
  }
  function downloadText(name,text,type){
    const blob=new Blob([text],{type:type||'text/plain;charset=utf-8'});const a=document.createElement('a');
    const url=URL.createObjectURL(blob);a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),400);
  }
  function showPage(id){
    S.page=id;save();$$('.page').forEach(p=>p.classList.toggle('visible',p.id==='page-'+id));
    $$('.nav-link').forEach(b=>{const active=b.dataset.page===id;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  }
  function diagnostics(){
    const items=[
      ['Пластиковая кожа','Проверьте P20–P23 и P25: фактура и неодинаковый блеск, а не зерно поверх пластика.'],
      ['Лицо кажется взрослым','Проверьте сохранение визуального возраста, пропорций и отсутствие beauty-фильтров.'],
      ['Фальшивое размытие','P04–P06 и P12: объектив, фокус, дистанция и оптический переход в боке.'],
      ['Модель «парит»','P14–P16 и P27: направление света и реальная контактная тень под обувью.'],
      ['Пересвечены участки','P29–P30: тональный диапазон и мягкое сохранение светлых деталей.'],
      ['Глянец вместо фотографии','P21, P25, P31–P32: меньше uniform roughness, HDR, bloom и агрессивной ретуши.'],
      ['Неправильные отражения','P19–P22: окружение должно соответствовать реальной сцене.'],
      ['Нарушен исходный ракурс','P03–P11: сначала сохраните перспективу, затем меняйте стиль камеры.']
    ];
    $('#diagnostics').innerHTML=items.map(x=>'<div class="diagnostic"><b>'+htmlEsc(x[0])+'</b><p>'+htmlEsc(x[1])+'</p></div>').join('');
  }
  function setSubject(type){
    const prev=S.values.scene_subject||'';
    const common=[
      'исходная 3D-модель учащейся; сохранить лицо, визуальный возраст, причёску, одежду и позу',
      'исходный 3D-персонаж; сохранить внешность, пропорции, одежду и позу',
      'исходный 3D-предмет; сохранить форму, текстуры и масштаб'
    ];
    if(common.includes(prev)){
      S.values.scene_subject=type==='student'?common[0]:type==='adult'?common[1]:common[2];
      const input=$('.param-card[data-key="scene_subject"] .value-field');if(input)input.value=S.values.scene_subject;
    }
    S.subjectType=type;save();refresh();
  }
  function attach(){
    $$('.nav-link').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
    $('#paramSearch').addEventListener('input',e=>{searchParam=e.target.value.toLowerCase().trim();renderParams();});
    $('#quickSearch').addEventListener('input',e=>{searchQuick=e.target.value.toLowerCase().trim();renderQuick();});
    $('#subjectType').value=S.subjectType;
    $('#subjectType').addEventListener('change',e=>setSubject(e.target.value));
    $('#views').value=S.views;$('#views').addEventListener('change',e=>{S.views=e.target.value;save();refresh();});
    $('#viewMode').value=S.viewMode;$('#viewMode').addEventListener('change',e=>{S.viewMode=e.target.value;save();refresh();});
    $$('.output-switch button').forEach(b=>b.addEventListener('click',()=>{S.output=b.dataset.output;save();refresh();}));
    $('#copyPrompt').addEventListener('click',()=>copyText($('#promptOutput').textContent));
    $('#downloadPrompt').addEventListener('click',()=>downloadText('t2fb-prompt.txt',$('#promptOutput').textContent));
    $('#clearParams').addEventListener('click',()=>{S.selected=[];save();renderParams();refresh();notify('Поля команды 32 очищены');});
    $('#collapseAll').addEventListener('click',()=>{
      $$('.param-extra').forEach(x=>x.hidden=true);
      $$('.param-card .explain').forEach(x=>{x.textContent='ⓘ Пояснить';x.setAttribute('aria-expanded','false');});
    });
    $('#resetAll').addEventListener('click',()=>{
      if(!confirm('Сбросить все настройки и выбранные команды?'))return;
      S=JSON.parse(JSON.stringify(defaults));save();$('#preset').value=S.preset;$('#subjectType').value=S.subjectType;
      $('#views').value=S.views;$('#viewMode').value=S.viewMode;$('#paramSearch').value='';$('#quickSearch').value='';
      searchParam='';searchQuick='';$('#customNote').value='';showingPresetExplanation=false;updatePresetText();renderParams();renderQuick();showPage('builder');refresh();notify('Восстановлены исходные настройки');
    });
    $('#exportConfig').addEventListener('click',()=>downloadText('t2fb-settings.json',JSON.stringify({version:1,config:S},null,2),'application/json;charset=utf-8'));
    $('#importConfig').addEventListener('change',async e=>{
      const file=e.target.files[0];if(!file)return;
      try {
        if(file.size>200000)throw Error('Слишком большой файл.');
        const text=await file.text();const payload=JSON.parse(text);
        if(!payload||typeof payload!=='object'||!payload.config||typeof payload.config!=='object')throw Error('Некорректный формат настроек.');
        S=sanitize(payload.config);save();$('#preset').value=S.preset;$('#subjectType').value=S.subjectType;
        $('#views').value=S.views;$('#viewMode').value=S.viewMode;$('#customNote').value=S.note;updatePresetText();renderParams();renderQuick();showPage(S.page);refresh();notify('Настройки загружены');
      } catch(err) {notify('Ошибка: '+err.message);} finally{e.target.value='';}
    });
    document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();copyText($('#promptOutput').textContent);}});
    if(window.matchMedia('(max-width: 1040px)').matches){
      const btn=document.createElement('button');btn.className='mobile-output-btn';btn.type='button';btn.textContent='⇢ Показать готовую команду';
      btn.addEventListener('click',()=>$('.output-panel').scrollIntoView({behavior:'smooth',block:'start'}));
      document.body.appendChild(btn);
    }
    $('#quickCount').textContent=D.quick.length;
    $('#customNote').value=S.note;
    $('#customNote').addEventListener('input',e=>{S.note=e.target.value.slice(0,3000);save();refresh();});
  }
  buildPresetOptions();
  buildChips();
  renderParams();
  renderQuick();
  diagnostics();
  attach();
  showPage(S.page);
  refresh();
})();
