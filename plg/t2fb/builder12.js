/* T2F 0.6 / gp: конструктор PHOTO -> 3D для команды 12. */
(function(){
'use strict';
const C=window.T2FB12_CATALOG;
if(!C||!document.getElementById('page-commands12'))return;
const $=id=>document.getElementById(id);
const STORE='t2f-photo-to-3d-command12-v1';
const COPY=o=>JSON.parse(JSON.stringify(o));
const DEFAULT={preset:'AAAAA',tab:'all',values:{preserve:['сохранить лицо и возраст','сохранить одежду и позу','сохранить композицию и объекты','no added objects','no HUD']},custom:'',format:'command',series:'3',seriesTech:false};
const pvals=new Set(C.presets.map(p=>p.value));
const groups=Object.fromEntries(C.groups.map(g=>[g.key,g]));
const isObj=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
function normalize(input){
 const s=COPY(DEFAULT);if(!isObj(input))return s;
 if(pvals.has(input.preset))s.preset=input.preset;
 if(['all','retro','games','cgi','art'].includes(input.tab))s.tab=input.tab;
 if(isObj(input.values)){for(const g of C.groups){
  const allowed=new Set(g.options.map(o=>o.value));const v=input.values[g.key];
  if(g.multi){if(Array.isArray(v)){const a=[...new Set(v.filter(t=>typeof t==='string'&&allowed.has(t)))];if(a.length)s.values[g.key]=a;else delete s.values[g.key];}}
  else if(typeof v==='string'&&allowed.has(v))s.values[g.key]=v;
 }}
 if(typeof input.custom==='string')s.custom=input.custom.slice(0,1800);
 if(['command','explained','series'].includes(input.format))s.format=input.format;
 if(['2','3','4'].includes(String(input.series)))s.series=String(input.series);
 if(typeof input.seriesTech==='boolean')s.seriesTech=input.seriesTech;
 return s;
}
let S;try{S=normalize(JSON.parse(localStorage.getItem(STORE)||'null'));}catch(_){S=normalize(null);}
const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(S));}catch(_){}};
const preset=()=>C.presets.find(p=>p.value===S.preset)||C.presets.find(p=>p.value==='AAAAA');
const selected=g=>g.multi?(Array.isArray(S.values[g.key])?S.values[g.key]:[]):S.values[g.key]||'';
const valueInfo=(g,v)=>g.options.find(o=>o.value===v);
const strip=s=>String(s).replace(/[{}]/g,' ').replace(/\s+/g,' ').trim().slice(0,1800);
function terms(otherPreset,forSeries=false){
 const v=[otherPreset||S.preset];
 for(const g of C.groups){
  if(forSeries&&!S.seriesTech){
   const shared=['camera','ratio','output','effects','preserve'];
   if(g.key==='light'&&!['sunny','overcast','golden hour','night','studio softbox'].includes(selected(g)))continue;
   if(g.key!=='light'&&!shared.includes(g.key))continue;
  }
  const x=selected(g);if(g.multi){for(const a of x){if(!v.includes(a))v.push(a);}}else if(x&&!v.includes(x))v.push(x);}
 const extra=strip(S.custom);if(extra)v.push(extra);
 return v;
}
function command(otherPreset,forSeries=false){
 const args=terms(otherPreset,forSeries);
 return '12 {'+args.join(', ')+'}';
}
function notesFor(){
 const list=['Направление: исходная ФОТОГРАФИЯ → изображение 3D-сцены (не редактируемая .blend/.obj/.glb модель).','Основной стиль '+preset().label+': '+preset().help];
 for(const g of C.groups){
  const x=selected(g),a=g.multi?x:x?[x]:[];
  if(a.length)list.push(g.label+': '+a.map(v=>{const o=valueInfo(g,v);return (o?o.title:v);}).join(', ')+'. '+g.help);
 }
 if(S.custom.trim())list.push('Дополнительные условия: '+strip(S.custom));
 list.push('Сохраняй состав исходной сцены; качество эпохи важнее попыток сделать 12 фотореалистичным фото. Названия движков и «8K» — визуальные ориентиры, не гарантии исполнения.');
 return list.join('\n');
}
function seriesOutput(){
 const n=Number(S.series);
 // Художественные ступени, с исходного стиля начиная. Все настройки кадра сохраняются.
 const path=['EARLY_3D','PS1','PS2','PS3','PS5','AAA','AAAA','AAAAA'];
 const art=['LOW_POLY','STYLIZED_3D','TOON_3D','VOXEL','CLAY_RENDER','WIREFRAME','ISOMETRIC','PRODUCT_CGI','ARCHVIZ','CHARACTER_3D'];
 const chain=art.includes(S.preset)?art:path;
 const ix=chain.indexOf(S.preset);
 const res=[];
 for(let i=0;i<n;i++)res.push(command(chain[(ix+i)%chain.length],true));
 return res.join('\n');
}
function output(){return S.format==='series'?seriesOutput():S.format==='explained'?command()+'\n\nПОЯСНЕНИЯ\n'+notesFor():command();}
function drawPresets(){
 const tabs=[['all','Все'],['retro','1990–2000-е'],['games','Консоли и AAA'],['cgi','Премиум CGI'],['art','Художественные']];
 $('presetTabs12').replaceChildren(...tabs.map(([key,label])=>{
  const b=document.createElement('button');b.type='button';b.className='quick-tab'+(S.tab===key?' active':'');b.textContent=label;b.dataset.tab12=key;
  b.setAttribute('aria-pressed',String(S.tab===key));b.addEventListener('click',()=>{S.tab=key;save();drawPresets();});return b;
 }));
 const term=$('presetSearch12').value.trim().toLocaleLowerCase('ru');
 const filtered=C.presets.filter(p=>(S.tab==='all'||p.group===S.tab)&&[p.value,p.label,p.help].join(' ').toLocaleLowerCase('ru').includes(term));
 const host=$('presetList12');host.replaceChildren(...filtered.map(p=>{
   const card=document.createElement('button');card.type='button';card.className='t12-preset'+(S.preset===p.value?' chosen':'');card.setAttribute('aria-pressed',String(S.preset===p.value));
   const name=document.createElement('strong');name.textContent=p.label;
   const code=document.createElement('code');code.textContent=p.value;
   const description=document.createElement('span');description.textContent=p.help;
   card.append(name,code,description);
   card.addEventListener('click',()=>{S.preset=p.value;drawPresets();changed();});
   return card;
 }));
 $('emptyPresets12').hidden=filtered.length!==0;
 $('presetDescription12').textContent=preset().help;
}
function drawFields(){
 const host=$('fields12');host.replaceChildren();
 for(const g of C.groups){
  const card=document.createElement('section');card.className='tt-panel t12-field';card.dataset.key12=g.key;
  const head=document.createElement('div');head.className='tt-row';
  const title=document.createElement('h3');title.textContent=g.label;
  const type=document.createElement('code');type.textContent=g.multi?'Несколько вариантов':'Один вариант';head.append(title,type);card.appendChild(head);
  const hint=document.createElement('p');hint.className='tt-small-desc';hint.textContent=g.help;card.appendChild(hint);
  if(g.multi){
   const options=document.createElement('div');options.className='t12-checkbox-list';
   for(const o of g.options){
    const label=document.createElement('label');label.className='t12-toggle';
    const input=document.createElement('input');input.type='checkbox';input.checked=selected(g).includes(o.value);input.value=o.value;
    input.addEventListener('change',()=>{
     const next=new Set(selected(g));if(input.checked)next.add(o.value);else next.delete(o.value);
     if(next.size)S.values[g.key]=[...next];else delete S.values[g.key];changed();
    });
    const words=document.createElement('span');words.textContent=o.title;
    const t=document.createElement('code');t.textContent=o.value;
    label.append(input,words,t);options.appendChild(label);
   }
   card.appendChild(options);
  } else {
   const sel=document.createElement('select');sel.setAttribute('aria-label',g.label);
   const empty=document.createElement('option');empty.value='';empty.textContent='По умолчанию · '+g.label.toLocaleLowerCase('ru');sel.appendChild(empty);
   for(const o of g.options){const opt=document.createElement('option');opt.value=o.value;opt.textContent=o.title;sel.appendChild(opt);}
   sel.value=selected(g);
   sel.addEventListener('change',()=>{if(sel.value)S.values[g.key]=sel.value;else delete S.values[g.key];changed();});
   const help=document.createElement('p');help.className='tt-explanation t12-choice-help';help.hidden=true;
   const info=document.createElement('button');info.className='tt-info';info.type='button';info.textContent='ⓘ Пояснить выбор';
   info.addEventListener('click',()=>{
    const o=valueInfo(g,sel.value);
    help.textContent=o?o.help:g.help;help.hidden=!help.hidden;
    info.setAttribute('aria-expanded',String(!help.hidden));
   });
   card.append(sel,info,help);
  }
  host.appendChild(card);
 }
}
function drawExamples(){
 const host=$('examples12');host.replaceChildren(...C.examples.map(ex=>{
  const b=document.createElement('button');b.className='t12-example';b.type='button';
  const label=document.createElement('strong');label.textContent=ex.label;
  const code=document.createElement('code');code.textContent='12 {'+ex.command+'}';
  b.append(label,code);
  b.addEventListener('click',()=>{
   const parts=ex.command.split(',').map(x=>x.trim());
   S.preset=pvals.has(parts[0])?parts.shift():S.preset;
   S.values=COPY(DEFAULT.values);S.custom='';
   const unused=[];
   for(const part of parts){
    let found=false;
    for(const g of C.groups){
     const opt=g.options.find(o=>o.value.toLocaleLowerCase()===part.toLocaleLowerCase());
     if(opt){
      if(g.multi)S.values[g.key]=[...new Set([...(S.values[g.key]||[]),opt.value])];
      else S.values[g.key]=opt.value;
      found=true;break;
     }
    }
    if(!found)unused.push(part);
   }
   S.custom=unused.join(', ');
   S.format='command';$('custom12').value=S.custom;$('format12').value=S.format;
   $('presetSearch12').value='';S.tab='all';drawPresets();drawFields();changed();
  });return b;
 }));
}
function warnings(){
 const v=new Set(terms().map(t=>t.toLowerCase()));
 const low=['EARLY_3D','PS1','N64','DREAMCAST','PS2','DX9'].includes(S.preset);
 const high=['AAA','AAAA','AAAAA','PS4','PS5'].includes(S.preset);
 const msgs=[];
 const text=terms().join(' ').toLowerCase();
 if(low&&/pbr|path.traced|ray.traced|high.poly|microgeometry|cinematic dof|8k textures/.test(text))msgs.push('⚠ Выбрано сочетание ретро-стиля с современными технологиями. Система 12 создаст осмысленный гибрид, сохраняя выбранную эпоху.');
 if(high&&/sharp pixels|nearest|texture warping|visible facets|64px textures/.test(text))msgs.push('⚠ Современный CGI дополнен ретро-параметрами: это намеренный художественный гибрид.');
 if(selected(groups.post).includes('no post FX')&&selected(groups.post).length>1)msgs.push('⚠ «Без постобработки» конфликтует с остальными выбранными эффектами постобработки. Уберите одно из условий.');
 if(selected(groups.reflections)==='no reflections' &&/reflection|clearcoat|metallic/.test(text))msgs.push('⚠ «Без отражений» может конфликтовать с выбранными отражающими материалами.');
 if(selected(groups.filtering)==='bilinear'&&selected(groups.texture_style).includes('sharp pixels'))msgs.push('⚠ Bilinear может сглаживать крупные пиксели; для «sharp pixels» обычно выбирают nearest.');
 if(selected(groups.camera)==='isometric'&&selected(groups.preserve).includes('сохранить исходный ракурс'))msgs.push('⚠ Изометрия меняет перспективу: уточните, что важнее — новый ракурс или исходный.');
 if(v.has('4k output')||v.has('8k output'))msgs.push('ℹ Выходное разрешение не меняет поколение консоли или детализацию 3D и зависит от возможности генератора.');
 if(!msgs.length)msgs.push('✓ Явных конфликтов не найдено. 12 создаст изображение 3D-сцены указанной эпохи, не реальный 3D-файл.');
 return msgs.join('\n');
}
function changed(){
 save();$('mode12Badge').textContent=S.preset;
 $('active12').textContent=C.groups.reduce((sum,g)=>sum+(g.multi?selected(g).length:Number(!!selected(g))),0)+Number(!!S.custom.trim());
 $('presetDescription12').textContent=preset().help;
 $('series12').disabled=S.format!=='series';
 $('seriesTech12').disabled=S.format!=='series';
 $('warnings12').textContent=warnings();
 if(typeof window.T2FB_REFRESH_OUTPUT==='function')window.T2FB_REFRESH_OUTPUT();
}
function sync(){
 $('presetSearch12').value='';$('custom12').value=S.custom;
 $('format12').value=S.format;$('series12').value=S.series;$('seriesTech12').checked=S.seriesTech;
 drawPresets();drawFields();changed();
}
function lucky(){
 const pool=['EARLY_3D','PS1','N64','DREAMCAST','PS2','DX9','PS3','PS4','PS5','AAA','AAAA','AAAAA','LOW_POLY','VOXEL','CLAY_RENDER','ISOMETRIC','ARCHVIZ'];
 const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
 S=normalize(DEFAULT);S.preset=pick(pool);
 S.values=COPY(DEFAULT.values);
 const low=['EARLY_3D','PS1','N64','DREAMCAST','PS2','DX9'].includes(S.preset);
 const art=['LOW_POLY','VOXEL','CLAY_RENDER','ISOMETRIC'].includes(S.preset);
 if(low){
  S.values.geometry=pick(['low-poly','visible facets','mid-poly']);
  S.values.texture_size=pick(['64px textures','128px textures','256px textures']);
  S.values.filtering=pick(['nearest','bilinear']);
  S.values.light=pick(['baked lighting','overcast','golden hour']);
  S.values.post=pick([['dithering'],['film grain'],[]]);
  if(['PS1','EARLY_3D'].includes(S.preset))S.values.texture_style=['pixelated'];
 }else if(art){
  S.values.geometry='low-poly';S.values.camera=pick(['orthographic','isometric','match source']);
  S.values.light=pick(['overcast','studio softbox','golden hour']);
 }else{
  S.values.geometry=pick(['high-poly','smooth bevels','microgeometry']);
  S.values.materials=['PBR',pick(['roughness variation','clearcoat'])];
  S.values.light=pick(['HDRI','studio softbox','global illumination']);
  S.values.shadows=['contact shadows', 'soft shadows'];
  S.values.camera=pick(['35mm','50mm','85mm']);
 }
 S.values.ratio=pick(['4:3','16:9','9:16']);
 S.custom='';S.format='command';$('presetSearch12').value='';sync();
}
function downloadSettings(){
 const blob=new Blob([JSON.stringify({format:'t2f-command12-v1',config:S},null,2)],{type:'application/json;charset=utf-8'});
 const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='T2F-command12-settings.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function importSettings(e){
 const file=e.target.files&&e.target.files[0];if(!file)return;
 (async()=>{
 try{
  if(file.size>200000)throw Error('Файл слишком большой');
  const parsed=JSON.parse(await file.text());
  if(parsed.format!=='t2f-command12-v1'||!isObj(parsed.config))throw Error('Неверный формат настроек 12');
  S=normalize(parsed.config);sync();
 }catch(err){$('warnings12').textContent='Ошибка импорта: '+err.message;}
 finally{e.target.value='';}
 })();
}
$('total12').textContent=C.presets.length;
$('presetSearch12').addEventListener('input',drawPresets);
$('custom12').addEventListener('input',e=>{S.custom=e.target.value.slice(0,1800);changed();});
$('format12').addEventListener('change',e=>{S.format=e.target.value;changed();});
$('series12').addEventListener('change',e=>{S.series=e.target.value;changed();});
$('seriesTech12').addEventListener('change',e=>{S.seriesTech=e.target.checked;changed();});
$('clearFields12').addEventListener('click',()=>{S.values={};S.custom='';$('custom12').value='';drawFields();changed();});
$('reset12').addEventListener('click',()=>{if(!confirm('Сбросить все настройки системы 12?'))return;S=normalize(null);sync();});
$('lucky12').addEventListener('click',lucky);
$('export12').addEventListener('click',downloadSettings);
$('import12').addEventListener('change',importSettings);
drawExamples();
window.T2FB12={output,command,changed,snapshot:()=>COPY(S),warnings};
sync();
})();