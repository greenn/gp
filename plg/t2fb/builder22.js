/* T2Fb 0.4 — интерактивный конструктор команды 22. Без внешних зависимостей. */
(function(){
'use strict';
const C=window.T2FB22_CATALOG;
if(!C || !document.getElementById('page-commands22')) return;
const $=id=>document.getElementById(id);
const STORE='t2fb-command22-editor-v1';
const clone=x=>JSON.parse(JSON.stringify(x));
const DEFAULT={mode:'фото',safety:'0',realism:'0',camera:'50',action:'none',strength:'2',poseGroup:'fashion',pose:'three-quarter',customPose:'',search:'',format:'command',seriesCount:'3',modifiers:{clean:2,raw:1},preserve:{face:'keep',outfit:'keep'},details:[]};
const allModes=new Set(C.base.map(x=>x.value));
const allPoses=new Set([...C.fashion,...C.vn].map(x=>x.code));
const allActions=new Set(C.actions.map(x=>x.code));
const allKeys=new Set(C.sliders.map(x=>x.code));
function sanitize(v){
  const s=clone(DEFAULT);
  if(!v||typeof v!=='object')return s;
  if(allModes.has(v.mode))s.mode=v.mode;
  if(/^[0-4]$/.test(String(v.safety)))s.safety=String(v.safety);
  if(/^[0-5]$/.test(String(v.realism)))s.realism=String(v.realism);
  if(C.cameras.some(x=>x.value===String(v.camera)))s.camera=String(v.camera);
  if(allActions.has(v.action))s.action=v.action;
  if(/^[1-5]$/.test(String(v.strength)))s.strength=String(v.strength);
  if(['fashion','vn'].includes(v.poseGroup))s.poseGroup=v.poseGroup;
  if(v.pose==='' || allPoses.has(v.pose))s.pose=v.pose;
  if(typeof v.customPose==='string')s.customPose=v.customPose.slice(0,600);
  if(['command','explained','series'].includes(v.format))s.format=v.format;
  if(['2','3','4'].includes(String(v.seriesCount)))s.seriesCount=String(v.seriesCount);
  s.modifiers={};
  for(const [key,value] of Object.entries(v.modifiers||{}))if(allKeys.has(key)&&Number.isInteger(Number(value))&&+value>=1&&+value<=5)s.modifiers[key]=Number(value);
  s.preserve={};
  for(const [key,value] of Object.entries(v.preserve||{}))if(C.preserve.some(p=>p.code===key)&&['keep','change'].includes(value))s.preserve[key]=value;
  if(Array.isArray(v.details))s.details=v.details.filter(x=>typeof x==='string').slice(0,120);
  return s;
}
let S;
try{S=sanitize(JSON.parse(localStorage.getItem(STORE)||'null'));}catch(_){S=sanitize(null);}
const SAVE=()=>{try{localStorage.setItem(STORE,JSON.stringify(S));}catch(_){}};
const escape=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const currSubject=()=>typeof window.T2FB_SUBJECT_TYPE==='function'?window.T2FB_SUBJECT_TYPE():$('subjectType').value;
const currentPose=()=>S.customPose.trim() || S.pose;
const take=(list,value)=>list.find(x=>x.value===value||x.code===value);
function enforceAge(){
  if(currSubject()==='student'&&['R','PG-13','all'].includes(S.mode)){S.mode='PG';SAVE();}
}
function validModifiers(){return C.sliders.filter(m=>Number(S.modifiers[m.code])>0);}
function isPoseAction(a){return ['pose','pose safe','pose ref','turn','walk','sit','stand','neutral'].includes(a);}
function command(poseOverride,cameraOverride){
  enforceAge();
  const mode=S.mode;
  const parts=['22',mode];
  if(mode==='r')parts.push(S.realism);
  if(mode!=='r' && S.safety!=='0')parts.push('S'+S.safety);
  if(mode!=='r' && S.realism!=='0')parts.push('r',S.realism);
  const action=S.action;
  const pose=(typeof poseOverride==='string')?poseOverride:currentPose();
  if(action!=='none'){
    if(['outpaint','body','pose','pose safe'].includes(action)){
      if(action==='pose' && pose) { /* named pose wins */ }
      else parts.push(action,S.strength);
    }else if(!(pose && isPoseAction(action) && action!=='pose ref')) parts.push(action);
  }
  if(pose)parts.push('pose',pose);
  const cam=cameraOverride===undefined?S.camera:cameraOverride;
  if(cam)parts.push('cam',cam);
  validModifiers().forEach(m=>parts.push(m.code,String(S.modifiers[m.code])));
  C.preserve.forEach(p=>{
    if(S.preserve[p.code]){
      const duplicatePose=p.code==='pose'&&pose;
      if(duplicatePose&&S.preserve[p.code]==='keep')return;
      parts.push(S.preserve[p.code],p.code);
    }
  });
  return parts.join(' ');
}
function explainCommand(){
  const text=[];
  text.push('Режим: '+take(C.base,S.mode).description);
  if(S.safety!=='0')text.push('S'+S.safety+': '+take(C.safety,S.safety).description);
  if(S.realism!=='0')text.push('r '+S.realism+': '+take(C.realism,S.realism).description);
  if(S.action!=='none')text.push('Действие: '+take(C.actions,S.action).description);
  if(currentPose()){
    const entry=[...C.fashion,...C.vn].find(p=>p.code===S.pose);
    text.push('Поза: '+(S.customPose.trim()||entry?.description||S.pose));
  }
  if(S.camera)text.push('Объектив: '+take(C.cameras,S.camera).description);
  validModifiers().forEach(m=>text.push(m.code+' '+S.modifiers[m.code]+': '+m.description));
  C.preserve.forEach(p=>S.preserve[p.code]&&text.push((S.preserve[p.code]==='keep'?'Сохранить: ':'Разрешить изменение: ')+p.name+' — '+p.description));
  if(currSubject()==='student')text.push('Возраст: сохранить визуальный школьный возраст, исключить сексуализированную подачу.');
  return text.join('\n');
}
function output(){
  if(S.format==='explained')return command()+'\n\nПОЯСНЕНИЯ:\n'+explainCommand();
  if(S.format==='series'){
    const n=Number(S.seriesCount),list=S.poseGroup==='vn'?C.vn:C.fashion;
    const idx=Math.max(0,list.findIndex(x=>x.code===S.pose));
    const series=[];
    for(let i=0;i<n;i++){
      const next=S.customPose.trim() ? S.customPose.trim() : list[(idx+i)%list.length].code;
      const camera=S.camera ? S.camera : ['35','50','85','35'][i];
      series.push(command(next,camera));
    }
    return series.join('\n');
  }
  return command();
}
function why(field){
  const selectors={mode:['explainMode22',C.base,S.mode],safety:['explainSafety22',C.safety,S.safety],realism:['explainRealism22',C.realism,S.realism],camera:['explainCamera22',C.cameras,S.camera],action:['explainAction22',C.actions,S.action]};
  const [id,list,value]=selectors[field];
  $(id).textContent=take(list,value)?.description||'Значение не выбрано.';
  const active=$(id).dataset.open==='true';
  $(id).hidden=!active;
}
function renderSelect(id,list,value){$(id).replaceChildren(...list.map(item=>{const option=document.createElement('option');option.value=typeof item.value==='string'?item.value:item.code;option.textContent=item.name;option.selected=(option.value===value);return option;}));}
function createLabel(group,code,name,description,value){
  const card=document.createElement('article');card.className='tt-option-card';
  const head=document.createElement('div');head.className='tt-row';
  const label=document.createElement('label');label.className='tt-option-name';label.textContent=name;
  const badge=document.createElement('code');badge.textContent=code;
  head.append(label,badge);card.appendChild(head);
  const body=document.createElement('div');body.className='tt-small-desc';body.textContent=description;card.appendChild(body);
  return card;
}
function renderModifiers(){
  const host=$('modifiers22');host.replaceChildren();
  C.sliders.forEach(m=>{
    const card=createLabel('modifier',m.code,m.name,m.description);
    const row=document.createElement('div');row.className='tt-row';
    const input=document.createElement('select');input.setAttribute('aria-label',m.name+' — сила');
    input.innerHTML='<option value="0">Выключен</option>'+[1,2,3,4,5].map(i=>'<option value="'+i+'">'+i+' / 5</option>').join('');
    input.value=String(S.modifiers[m.code]||0);
    input.addEventListener('change',()=>{const n=Number(input.value);if(n)S.modifiers[m.code]=n;else delete S.modifiers[m.code];changed();});
    const info=document.createElement('button');info.type='button';info.className='tt-info';info.textContent='ⓘ Пояснить';
    const detail=card.querySelector('.tt-small-desc');detail.hidden=!S.details.includes('mod:'+m.code);
    info.addEventListener('click',()=>{detail.hidden=!detail.hidden;toggleDetail('mod:'+m.code,!detail.hidden);info.setAttribute('aria-expanded',String(!detail.hidden));});
    row.append(input,info);card.appendChild(row);host.appendChild(card);
  });
}
function renderPreserve(){
  const host=$('keep22');host.replaceChildren();
  C.preserve.forEach(p=>{
    const card=createLabel('preserve',p.code,p.name,p.description);
    const select=document.createElement('select');select.setAttribute('aria-label',p.name+' — сохранять или менять');
    select.innerHTML='<option value="">Без указания</option><option value="keep">keep · сохранить</option><option value="change">change · изменить</option>';
    select.value=S.preserve[p.code]||'';
    select.addEventListener('change',()=>{if(select.value)S.preserve[p.code]=select.value;else delete S.preserve[p.code];changed();});
    card.appendChild(select);host.appendChild(card);
  });
}
function toggleDetail(key,on){
  const set=new Set(S.details);if(on)set.add(key);else set.delete(key);S.details=[...set];SAVE();
}
function renderPoses(){
  $('poseTabs22').innerHTML=['fashion','vn'].map(v=>'<button type="button" class="quick-tab'+(S.poseGroup===v?' active':'')+'" data-poses22="'+v+'">'+(v==='fashion'?'Fashion':'Visual Novel')+'</button>').join('');
  const all=S.poseGroup==='fashion'?C.fashion:C.vn;
  const query=$('poseSearch22').value.trim().toLocaleLowerCase('ru');
  const filtered=all.filter(p=>[p.code,p.name,p.description].join(' ').toLocaleLowerCase('ru').includes(query));
  $('poseCount22').textContent=filtered.length+' из '+all.length;
  const host=$('poseList22');host.replaceChildren();
  filtered.forEach(p=>{
    const card=document.createElement('div');card.className='tt-pose'+(S.pose===p.code?' chosen':'');
    const head=document.createElement('div');head.className='tt-row';
    const btn=document.createElement('button');btn.type='button';btn.className='tt-pose-choose';btn.setAttribute('aria-pressed',String(S.pose===p.code));btn.textContent=(S.pose===p.code?'✓ ':'')+p.name;
    btn.addEventListener('click',()=>{S.pose=S.pose===p.code?'':p.code;S.customPose='';$('customPose22').value='';renderPoses();changed();});
    const info=document.createElement('button');info.type='button';info.className='tt-info';info.setAttribute('aria-expanded',String(S.details.includes('pose:'+p.code)));info.textContent='ⓘ';
    head.append(btn,info);card.appendChild(head);
    const small=document.createElement('code');small.textContent='pose '+p.code;card.appendChild(small);
    const explanation=document.createElement('p');explanation.className='tt-pose-desc';explanation.textContent=p.description;explanation.hidden=!S.details.includes('pose:'+p.code);
    card.appendChild(explanation);
    info.addEventListener('click',()=>{explanation.hidden=!explanation.hidden;toggleDetail('pose:'+p.code,!explanation.hidden);info.setAttribute('aria-expanded',String(!explanation.hidden));});
    host.appendChild(card);
  });
  $('poseEmpty22').hidden=filtered.length!==0;
}
function warnings(){
  const arr=[];
  if(currSubject()==='student')arr.push('Для школьной модели сохраняется визуальный возраст. G и PG доступны; взрослые рейтинги не предлагаются.');
  if(S.preserve.pose==='keep' && (currentPose()||S.action!=='none'))arr.push('keep pose противоречит изменению позы; при наличии новой позы keep pose в итоговой команде пропускается.');
  if(S.action==='pose ref')arr.push('Для pose ref понадобится дополнительное изображение с позой.');
  if(S.format==='series' && S.customPose.trim())arr.push('Своя поза указана явно: во всех кадрах серии она сохраняется.');
  return arr;
}
function refresh(){
  enforceAge();
  $('mode22').value=S.mode;
  [...$('mode22').options].forEach(option=>{option.disabled=currSubject()==='student'&&['R','PG-13','all'].includes(option.value);});
  $('mode22Badge').textContent=S.mode;
  $('active22').textContent=Object.keys(S.modifiers).length+Object.keys(S.preserve).length+Number(S.pose!==''||!!S.customPose.trim())+Number(S.action!=='none')+Number(!!S.camera);
  $('seriesCount22').disabled=S.format!=='series';
  $('strength22').disabled=!['outpaint','body','pose','pose safe'].includes(S.action);
  ['mode','safety','realism','camera','action'].forEach(why);
  $('status22').textContent=warnings().join(' ')||'Готовая команда появится в правой панели. Нажмите «Скопировать» или «TXT».';
  SAVE();
  if(typeof window.T2FB_REFRESH_OUTPUT==='function')window.T2FB_REFRESH_OUTPUT();
}
function changed(){SAVE();refresh();}
function random22(){
  const rand=list=>list[Math.floor(Math.random()*list.length)];
  S.mode=rand(currSubject()==='student'?['фото','p','G','PG']:['фото','p','G','PG','all']);
  S.safety=String(rand([0,0,1,1,2,3]));
  S.realism=String(rand([0,1,1,2,2,3]));
  S.camera=rand(['35','50','85']);
  S.action=rand(['none','full safe','full','legs','hands','stand','walk','turn','neutral']);
  S.strength=String(rand([1,2,3]));
  S.poseGroup=rand(['fashion','vn']);
  const list=S.poseGroup==='fashion'?C.fashion:C.vn;
  const allow=list.filter(x=>!['weapon neutral hold','kneeling fashion'].includes(x.code));
  S.pose=rand(allow).code;S.customPose='';
  S.preserve={face:'keep',outfit:'keep'};
  const selected=rand([['clean','raw'],['clean','doc'],['raw','c'],['clean','l'],['clean','sfw']]);
  S.modifiers={};selected.forEach(m=>S.modifiers[m]=rand([1,2,3]));
  S.format='command';
  sync();changed();
}
function sync(){
  renderSelect('mode22',C.base,S.mode);renderSelect('safety22',C.safety,S.safety);
  renderSelect('realism22',C.realism,S.realism);renderSelect('camera22',C.cameras,S.camera);
  renderSelect('action22',C.actions,S.action);
  $('strength22').value=S.strength;$('format22').value=S.format;
  $('seriesCount22').value=S.seriesCount;
  $('customPose22').value=S.customPose;
  renderModifiers();renderPreserve();renderPoses();refresh();
}
function bindSelect(id,key){$(id).addEventListener('change',e=>{S[key]=e.target.value;if(key==='action'&&S[key]==='pose ref')S.pose='';if(key==='format')S.format=e.target.value;if(key==='mode')enforceAge();changed();if(key==='action')renderPoses();});}
bindSelect('mode22','mode');bindSelect('safety22','safety');bindSelect('realism22','realism');bindSelect('camera22','camera');bindSelect('action22','action');
bindSelect('strength22','strength');bindSelect('format22','format');bindSelect('seriesCount22','seriesCount');
$('poseTabs22').addEventListener('click',e=>{const b=e.target.closest('[data-poses22]');if(b){S.poseGroup=b.dataset.poses22;renderPoses();changed();}});
$('poseSearch22').addEventListener('input',()=>renderPoses());
$('customPose22').addEventListener('input',e=>{S.customPose=e.target.value.slice(0,600);if(S.customPose.trim())S.pose='';renderPoses();changed();});
document.querySelectorAll('[data-why22]').forEach(b=>{b.addEventListener('click',()=>{
  const fld=b.dataset.why22;
  const id={mode:'explainMode22',safety:'explainSafety22',realism:'explainRealism22',camera:'explainCamera22',action:'explainAction22'}[fld];
  $(id).dataset.open=$(id).dataset.open==='true'?'false':'true';why(fld);
});});
$('clearModifiers22').addEventListener('click',()=>{S.modifiers={};renderModifiers();changed();});
$('reset22').addEventListener('click',()=>{if(!confirm('Сбросить настройки команды 22?'))return;S=sanitize(null);$('poseSearch22').value='';sync();});
$('lucky22').addEventListener('click',random22);
window.T2FB22={output,command,explainCommand,refresh,snapshot:()=>clone(S)};
$('total22').textContent=C.fashion.length+C.vn.length;
sync();
})();