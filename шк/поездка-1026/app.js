'use strict';
(()=> {
const STORE='gp.trip-1026.assignments.v1',CODE='gp.trip-1026.device-code.v1',SESSION='gp.trip-1026.session-code.v1';
const ZONES=['obsessed','apartment','pool'],$=id=>document.getElementById(id);
let people=[],byId=new Map(),positions={},selected=null,dragId=null,toastTimer=null,unlocked=false;
function readStore(key){try{return localStorage.getItem(key)}catch(_){return null}}
function writeStore(key,value){try{localStorage.setItem(key,value);return true}catch(_){return false}}
function fromB64(v){return Uint8Array.from(atob(v),c=>c.charCodeAt(0))}
function nameOf(p){return p.last+' '+p.first}
function initials(p){return (p.last[0]||'')+(p.first[0]||'')}
const GUEST_INITIALS=new Set(['БВ','АК','КЯ','ЦЗ']);
function isGuest(p){return p.role==='student'&&GUEST_INITIALS.has(initials(p))}
function group(id){return ZONES.includes(positions[id])?positions[id]:'pool'}
function notify(msg){const box=$('toast');box.textContent=msg;box.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.hidden=true,3000)}
async function decrypt(pin){
 if(!window.crypto||!crypto.subtle)throw new Error('Для работы требуется HTTPS.');
 const response=await fetch('./roster.enc.json',{cache:'no-store'});
 if(!response.ok)throw new Error('Не удалось загрузить встроенную базу.');
 const bundle=await response.json();
 const raw=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin.trim().toUpperCase()),'PBKDF2',false,['deriveKey']);
 const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:fromB64(bundle.salt),iterations:bundle.iterations,hash:'SHA-256'},raw,{name:'AES-GCM',length:256},false,['decrypt']);
 const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:fromB64(bundle.iv)},key,fromB64(bundle.ciphertext));
 const data=JSON.parse(new TextDecoder().decode(plain));
 if(!Array.isArray(data.people)||data.people.length!==22||data.people.filter(x=>x.role==='student').length!==20||data.people.filter(x=>x.role==='escort').length!==2)throw new Error('Некорректные данные.');
 return data.people;
}
function readAssignments(){try{const parsed=JSON.parse(readStore(STORE)||'{}');return parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed:{}}catch(_){return {}}}
function save(){if(!writeStore(STORE,JSON.stringify(positions)))notify('Не удалось сохранить данные в браузере');else $('saveStatus').textContent='✓ Сохранено на этом устройстве · '+new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}
function applyPeople(rows){people=rows;byId=new Map(rows.map(p=>[p.id,p]));const stored=readAssignments();positions={};rows.forEach(p=>positions[p.id]=ZONES.includes(stored[p.id])?stored[p.id]:'pool');unlocked=true;$('lockScreen').hidden=true;render();window.dispatchEvent(new CustomEvent('gp:trip-roster',{detail:{people:rows}}))}
async function attempt(pin,remember){const result=await decrypt(pin);if(remember)writeStore(CODE,pin.trim().toUpperCase());else try{localStorage.removeItem(CODE)}catch(_){}try{sessionStorage.setItem(SESSION,pin.trim().toUpperCase())}catch(_){}applyPeople(result)}
function makeTile(p){const el=document.createElement('button');el.type='button';el.className='tile'+(p.role==='escort'?' escort':isGuest(p)?' guest':'')+(p.id===selected?' selected':'');el.draggable=true;el.dataset.id=p.id;el.textContent=initials(p);el.title=nameOf(p)+(p.role==='escort'?' · сопровождающий':isGuest(p)?' · гость':'');el.setAttribute('aria-label',nameOf(p)+', выбрать');el.setAttribute('aria-pressed',p.id===selected?'true':'false');return el}
function addTiles(id,items){const frag=document.createDocumentFragment();items.forEach(p=>frag.append(makeTile(p)));$(id).replaceChildren(frag)}
function addNames(id,items){const frag=document.createDocumentFragment();if(!items.length){const li=document.createElement('li');li.className='empty-names';li.textContent='Пока никого';frag.append(li)}else items.forEach((p,i)=>{const li=document.createElement('li');if(p.role==='escort')li.className='name-escort';else if(isGuest(p))li.className='name-guest';const num=document.createElement('span');num.className='name-n';num.textContent=String(i+1).padStart(2,'0');li.append(num,document.createTextNode(nameOf(p)));frag.append(li)});$(id).replaceChildren(frag)}
function zonePeople(where){return people.filter(p=>group(p.id)===where)}
function render(){if(!unlocked)return;const o=zonePeople('obsessed'),a=zonePeople('apartment'),p=zonePeople('pool');addTiles('tilesO',o);addTiles('tilesA',a);addTiles('poolStudents',p.filter(x=>x.role==='student'));addTiles('poolEscorts',p.filter(x=>x.role==='escort'));addNames('listO',o);addNames('listA',a);$('countO').textContent=o.length;$('countA').textContent=a.length;$('listOCount').textContent=o.length;$('listACount').textContent=a.length;$('assignedTotal').textContent=o.length+a.length;$('remaining').textContent=p.length;$('hintO').hidden=o.length>0;$('hintA').hidden=a.length>0}
function place(id,where){if(!unlocked||!byId.has(id)||!ZONES.includes(where))return;if(group(id)!==where){positions[id]=where;save()}selected=null;render()}
function choose(id){if(!unlocked)return;selected=selected===id?null:id;render();if(selected){const p=byId.get(selected);$('saveStatus').textContent='Выбрано: '+nameOf(p)+'. Нажмите на нужную область.'}}
document.addEventListener('click',event=>{if(!unlocked)return;const tile=event.target.closest('.tile');if(tile){choose(tile.dataset.id);return}const zone=event.target.closest('[data-zone]');if(zone&&selected)place(selected,zone.dataset.zone)});
document.addEventListener('dblclick',event=>{const tile=event.target.closest('.tile');if(tile&&unlocked)place(tile.dataset.id,'pool')});
document.addEventListener('keydown',event=>{if(!unlocked)return;if(event.key==='Escape'&&selected){selected=null;render()}if((event.key==='Enter'||event.key===' ')&&selected){const zone=event.target.closest('[data-zone]');if(zone&&!event.target.closest('.tile')){event.preventDefault();place(selected,zone.dataset.zone)}}});
document.addEventListener('dragstart',event=>{const el=event.target.closest('.tile');if(!unlocked||!el)return;dragId=el.dataset.id;event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',dragId)});
document.addEventListener('dragover',event=>{const zone=event.target.closest('[data-zone]');if(!unlocked||!zone)return;event.preventDefault();event.dataTransfer.dropEffect='move';document.querySelectorAll('.is-over').forEach(x=>{if(x!==zone)x.classList.remove('is-over')});zone.classList.add('is-over')});
document.addEventListener('dragleave',event=>{const zone=event.target.closest('[data-zone]');if(zone&&!zone.contains(event.relatedTarget))zone.classList.remove('is-over')});
document.addEventListener('drop',event=>{const zone=event.target.closest('[data-zone]');if(!unlocked||!zone)return;event.preventDefault();const id=event.dataTransfer.getData('text/plain')||dragId;document.querySelectorAll('.is-over').forEach(x=>x.classList.remove('is-over'));if(id)place(id,zone.dataset.zone);dragId=null});
document.addEventListener('dragend',()=>{dragId=null;document.querySelectorAll('.is-over').forEach(x=>x.classList.remove('is-over'))});
$('resetBtn').addEventListener('click',()=>{if(!unlocked)return;if(confirm('Вернуть всех 22 участников в нижний блок?')){people.forEach(p=>positions[p.id]='pool');selected=null;save();render();notify('Распределение сброшено')}});
$('printBtn').addEventListener('click',()=>{if(unlocked)window.print()});
$('copyBtn').addEventListener('click',async()=>{if(!unlocked)return;const lines=['Поездка 24 октября 2026','Поддорье — Великий Новгород','Выезд 09:00 · обратно 16:00'];[['Одержимая','obsessed'],['Сдаётся квартира','apartment'],['Не распределены','pool']].forEach(pair=>{const list=zonePeople(pair[1]);lines.push('',pair[0]+' ('+list.length+'):');list.forEach((p,i)=>lines.push((i+1)+'. '+nameOf(p)+(p.role==='escort'?' — сопровождающий':'')))});const value=lines.join('\n');try{await navigator.clipboard.writeText(value);notify('Списки скопированы')}catch(_){const node=document.createElement('textarea');node.value=value;document.body.append(node);node.select();document.execCommand('copy');node.remove();notify('Списки скопированы')}});
$('lockBtn').addEventListener('click',()=>{try{sessionStorage.removeItem(SESSION);localStorage.removeItem(CODE)}catch(_){}location.reload()});
$('unlockForm').addEventListener('submit',async event=>{event.preventDefault();const input=$('accessCode'),error=$('unlockError'),button=$('unlockSubmit');error.textContent='';button.disabled=true;button.textContent='Открываем…';try{await attempt(input.value,$('rememberCode').checked);input.value='';notify('Открыто: 20 детей и 2 сопровождающих')}catch(e){error.textContent=e.name==='OperationError'?'Неверный код доступа. Проверьте ввод.':(e.message||'Не удалось открыть.')}finally{button.disabled=false;button.textContent='Открыть доску →'}});
(async()=>{let pin=null;try{pin=sessionStorage.getItem(SESSION)||readStore(CODE)}catch(_){}if(pin){try{await attempt(pin,!!readStore(CODE));return}catch(_){try{localStorage.removeItem(CODE);sessionStorage.removeItem(SESSION)}catch(_){}}}$('lockScreen').hidden=false;$('accessCode').focus()})();
})();