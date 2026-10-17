/* T2F 0.8.0 — 22 next temporal command builder, integrated into original T2F lab. */
(function(){
'use strict';
const byId=id=>document.getElementById(id);
if(!byId('page-next'))return;
const STORE='t2fb-next-0.8';
const samples=[
 ['22 next','Следующая секунда','Плавное продолжение позы, движения, взгляда и жестов.','forward',1,'s','движение секунды'],
 ['22 next s','Ещё одна секунда','Короткий вариант записи +1 секунды.','forward',1,'s','секунда'],
 ['22 next 5s','Пять секунд спустя','Следующая фаза движения; без резкой смены сцены.','forward',5,'s','шаг движение'],
 ['22 next -s','Секундой раньше','Попытка восстановить предыдущее положение тела.','backward',-1,'s','секунда назад'],
 ['22 next -30s','30 секунд назад','Вероятное предшествующее движение.','backward',-30,'s','жест начало'],
 ['22 next m','Через минуту','Действие продолжилось. Например, яблоко уже надкушено.','forward',1,'m','яблоко укус минута'],
 ['22 next 5m','Через пять минут','Действие могло завершиться или измениться.','forward',5,'m','минуты'],
 ['22 next -m','Минутой раньше','Например, ещё целое яблоко перед укусом.','backward',-1,'m','яблоко целое минуту назад'],
 ['22 next h','Через час','Новый этап истории; возможная обоснованная смена локации.','forward long',1,'h','час место локация'],
 ['22 next -h','Часом раньше','Вероятное место и действие до сцены.','backward long',-1,'h','час назад локация'],
 ['22 next d','Через день','Естественное изменение бытовой обстановки и деятельности.','forward long',1,'d','день сутки'],
 ['22 next -d','День назад','Возможное состояние среды сутками раньше.','backward long',-1,'d','сутки день назад'],
 ['22 next w','Через неделю','Сцена через 7 дней без драматических выдумок.','forward long',1,'w','неделя'],
 ['22 next mo','Через месяц','Здесь mo = месяц, m = минута.','forward long',1,'mo','месяц не минута'],
 ['22 next y','Через год','Немного старше, по умолчанию прежняя локация.','forward long',1,'y','возраст постарел год'],
 ['22 next -y','Год назад','Немного моложе, без изменения личности.','backward long',-1,'y','возраст помолодел год'],
 ['22 next 0s','Тот же момент','0 секунд. Новый кадр обычно не нужен.','forward',0,'s','ноль остановка']
];
const dir=byId('nextDirection'),quantity=byId('nextQuantity'),unit=byId('nextUnit'),extra=byId('nextExtra');
const search=byId('nextSearch'),count=byId('nextCount'),cards=byId('nextCards'),empty=byId('nextEmpty');
const preview=byId('nextPreview'),hint=byId('nextHint');
let filter='all';
const defaults={direction:'+',quantity:1,unit:'s',extra:''};
function normalize(s){return String(s||'').toLocaleLowerCase('ru').replace(/ё/g,'е').trim();}
function saneNumber(v){const n=Number(v);return Number.isFinite(n)&&n>=0&&n<=1000000?n:1;}
function restore(){
 let d={};
 try{d=JSON.parse(localStorage.getItem(STORE)||'{}')||{}}catch(_){}
 dir.value=d.direction==='-'?'-':'+';
 quantity.value=String(saneNumber(d.quantity));
 unit.value=['s','m','h','d','w','mo','y'].includes(d.unit)?d.unit:'s';
 extra.value=typeof d.extra==='string'?d.extra.slice(0,600):'';
}
function save(){
 try{localStorage.setItem(STORE,JSON.stringify({direction:dir.value,quantity:saneNumber(quantity.value),unit:unit.value,extra:extra.value.slice(0,600)}))}catch(_){}
}
function durationString(){
 const n=saneNumber(quantity.value);
 if(n===0)return '0s';
 const minus=dir.value==='-'?'-':'';
 if(n===1)return minus+unit.value;
 return minus+String(n)+unit.value;
}
function output(){
 const n=saneNumber(quantity.value);
 const base=n===1&&dir.value==='+'&&unit.value==='s'?'22 next':'22 next '+durationString();
 const suffix=extra.value.replace(/\s+/g,' ').trim().slice(0,600);
 return base+(suffix?' '+suffix:'');
}
function display(){
 if(!quantity.value.trim()||!Number.isFinite(Number(quantity.value))||Number(quantity.value)<0||Number(quantity.value)>1000000){
  hint.textContent='Введите число от 0 до 1 000 000. Для отрицательного времени выберите «Назад».';
  quantity.setAttribute('aria-invalid','true');
 }else{
  quantity.removeAttribute('aria-invalid');
  hint.textContent=Number(quantity.value)===0?'Исходный момент, новый кадр обычно не требуется.':
   unit.value==='y'?'Изменение визуального возраста, та же локация по умолчанию.':
   unit.value==='s'?'Плавное движение, без внезапной смены сцены.':
   unit.value==='m'?'Продолжение действия и причинная связь с предметами.':
   unit.value==='h'?'Развитие ситуации; возможная логичная новая локация.':'Развитие истории без необоснованных событий.';
 }
 preview.textContent=output();
 save();
 if(typeof window.T2FB_REFRESH_OUTPUT==='function')window.T2FB_REFRESH_OUTPUT();
}
const htmlEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
function filtered(){
 const q=normalize(search.value);
 const visible=samples.map((a,i)=>({a,i})).filter(({a})=>(filter==='all'||a[3].split(' ').includes(filter))&&(!q||normalize(a.slice(0,3).join(' ')+a[7]).includes(q)));
 cards.innerHTML=visible.map(({a,i})=>'<article class="next-card"><div class="next-tag">'+htmlEscape(a[3].includes('backward')?'НАЗАД':'ВПЕРЁД')+'</div><h3>'+htmlEscape(a[1])+'</h3><code>'+htmlEscape(a[0])+'</code><p>'+htmlEscape(a[2])+'</p><div class="next-card-actions"><button type="button" data-next-use="'+i+'">В конструктор</button><button type="button" data-next-copy="'+i+'">Копировать</button></div></article>').join('');
 count.textContent='Показано '+visible.length+' из '+samples.length;
 empty.hidden=visible.length>0;
}
function setSample(index){
 const entry=samples[index];
 if(!entry)return;
 dir.value=entry[4]<0?'-':'+';
 quantity.value=String(Math.abs(entry[4]));
 unit.value=entry[5];
 extra.value='';
 display();
 byId('nextPreview').scrollIntoView({behavior:'smooth',block:'nearest'});
}
async function copy(text,button){
 let ok=false;
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);ok=true;}}catch(_){}
 if(!ok){
  const a=document.createElement('textarea');a.value=text;a.style.position='fixed';a.style.left='-10000px';
  document.body.appendChild(a);a.select();try{ok=document.execCommand('copy')}catch(_){}a.remove();
 }
 const before=button.textContent;
 button.textContent=ok?'Скопировано ✓':'Выделите команду';
 setTimeout(()=>{button.textContent=before},1500);
}
cards.addEventListener('click',event=>{
 const btn=event.target.closest('button');if(!btn)return;
 if(btn.hasAttribute('data-next-use'))setSample(Number(btn.dataset.nextUse));
 if(btn.hasAttribute('data-next-copy')){const row=samples[Number(btn.dataset.nextCopy)];if(row)copy(row[0],btn)}
});
byId('page-next').querySelectorAll('[data-next-filter]').forEach(btn=>btn.addEventListener('click',()=>{
 filter=btn.dataset.nextFilter;
 byId('page-next').querySelectorAll('[data-next-filter]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
 filtered();
}));
search.addEventListener('input',filtered);
[dir,unit].forEach(el=>el.addEventListener('change',display));
quantity.addEventListener('input',display);
quantity.addEventListener('change',()=>{quantity.value=String(saneNumber(quantity.value));display()});
extra.addEventListener('input',display);
byId('resetNext').addEventListener('click',()=>{dir.value='+';quantity.value='1';unit.value='s';extra.value='';search.value='';filter='all';byId('page-next').querySelectorAll('[data-next-filter]').forEach(b=>{const on=b.dataset.nextFilter==='all';b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});filtered();display()});
window.T2FB_NEXT={output,refresh:display};
restore();filtered();display();
})();
