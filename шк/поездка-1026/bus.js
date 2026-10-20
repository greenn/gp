(()=>{'use strict';
const $=id=>document.getElementById(id),KEY='gp.trip-1026.bus.v1',VIEW='gp.trip-1026.view.v1';
const GUEST=new Set(['БВ','АК','КЯ','ЦЗ']);
const LAYOUT=[['driver',[1,2]],[[3,4],'front'],[[5,6],[9,10]],[[7,8],[13,14]],[[11,12],[17,18]],[[15,16],[21,22]],[[19,20],'rear']];
const store={get(k){try{return localStorage.getItem(k)}catch(_){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(_){return false}}};
let people=[],map=new Map(),ready=false,selected=null,model={seats:{},pairs:[],scores:{}},questView,busView,tabs,feedbackTimer,pending=null;
const full=p=>p?p.last+' '+p.first:'';
const short=p=>(p?.last?.[0]||'')+(p?.first?.[0]||'');
const guest=p=>p?.role==='student'&&GUEST.has(short(p));
const style=p=>p?.role==='escort'?'bus-escort':guest(p)?'bus-guest':'bus-student';
const $f=(type,cls,content)=>{const n=document.createElement(type);if(cls)n.className=cls;if(content!==undefined)n.textContent=String(content);return n};
const findSeat=id=>Object.keys(model.seats).find(k=>model.seats[k]===id);
const findPair=id=>model.pairs.find(p=>p.members.includes(id));
const score=id=>Object.hasOwn(model.scores,id)?model.scores[id]:null;
function flash(message){$('busFeedback').textContent=message;clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>{$('busFeedback').textContent='Выберите участника или пару — затем место'},3900)}
function save(){if(!store.set(KEY,JSON.stringify({v:1,seats:model.seats,pairs:model.pairs,scores:model.scores})))flash('Браузер не разрешает сохранять данные')}
function restore(){let old={};try{old=JSON.parse(store.get(KEY)||'{}')||{}}catch(_){}
 let used=new Set(),seats={},pairs=[],scores={};
 for(let n=1;n<=22;n++){const id=old.seats?.[n];if(map.has(id)&&!used.has(id)){seats[n]=id;used.add(id)}}
 if(Array.isArray(old.pairs))for(const p of old.pairs.slice(0,32)){
  const members=[null,null];[0,1].forEach(i=>{const id=p?.members?.[i];if(map.has(id)&&!used.has(id)){members[i]=id;used.add(id)}});
  if(p&&Array.isArray(p.members))pairs.push({id:typeof p.id==='string'?p.id:'pair-'+Math.random(),members,override:p.override!==null&&p.override!==undefined&&Number.isFinite(Number(p.override))?Number(p.override):null});
 }
 for(const p of people){const x=old.scores?.[p.id];if(p.role==='student'&&x!==undefined&&x!==null&&x!==''&&Number.isFinite(Number(x))&&Number(x)>=0&&Number(x)<=1000)scores[p.id]=Number(x)}
 model={seats,pairs,scores};
}
function purge(id){for(const p of model.pairs){if(p.members.includes(id)){p.members[p.members.indexOf(id)]=null;p.override=null}}model.pairs=model.pairs.filter(p=>p.members.some(Boolean))}
function unseat(id){const old=findSeat(id);if(old)delete model.seats[old]}
function notePerson(id){const s=findSeat(id);return s?'Место '+s:findPair(id)?'В паре':'Без места'}
function selectPerson(id){if(!map.has(id))return;selected=selected?.kind==='person'&&selected.id===id?null:{kind:'person',id};render();flash(selected?'Выбран(а): '+full(map.get(id))+'. Укажите место или ячейку пары.':'Выбор снят')}
function selectPair(id){const pair=model.pairs.find(p=>p.id===id);if(!pair)return;selected=selected?.kind==='pair'&&selected.id===id?null:{kind:'pair',id};render();flash(selected?'Выбрана пара. Нажмите на первое место, второе определится рядом.':'Выбор снят')}
function seatOne(id,n){if(!map.has(id)||!(n>=1&&n<=22))return;
 const former=findSeat(id),occupant=model.seats[n];if(occupant===id){selected=null;render();return}
 if(occupant&&!former){flash('Место '+n+' занято. Сначала освободите его.');return}
 purge(id);if(former)delete model.seats[former];if(occupant&&former)model.seats[former]=occupant;
 model.seats[n]=id;selected=null;save();render();flash(full(map.get(id))+' → место '+n)}
function seatPair(id,n){const pair=model.pairs.find(p=>p.id===id);if(!pair)return;
 const ids=pair.members.filter(Boolean);if(ids.length===0){flash('Добавьте хотя бы одного человека в пару');return}if(ids.length===1){seatOne(ids[0],n);return}
 const other=n%2?n+1:n-1;
 if([n,other].some(k=>k<1||k>22||model.seats[k]&&!ids.includes(model.seats[k]))){flash('Для пары нужны два свободных соседних места: '+n+' и '+other);return}
 ids.forEach(unseat);model.seats[n]=ids[0];model.seats[other]=ids[1];model.pairs=model.pairs.filter(p=>p.id!==id);
 selected=null;save();render();flash('Пара заняла места '+n+' и '+other)}
function placeSeat(n,p=selected){if(!p){const id=model.seats[n];if(id)selectPerson(id);else flash('Сначала выберите участника или пару');return}
 if(p.kind==='person')seatOne(p.id,n);else seatPair(p.id,n)}
function createPair(){const pair={id:'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,7),members:[null,null],override:null};model.pairs.push(pair);save();render();return pair}
function putPair(id,pid,idx){const pair=model.pairs.find(p=>p.id===pid);if(!pair||!map.has(id)||![0,1].includes(idx))return;
 const other=findPair(id);if(other){other.members[other.members.indexOf(id)]=null;other.override=null}
 unseat(id);pair.members[idx]=id;pair.override=null;
 model.pairs=model.pairs.filter(p=>p.members.some(Boolean));selected=null;save();render()}
function dock(id){let pair=model.pairs.find(p=>p.members.includes(null));if(!pair)pair=createPair();putPair(id,pair.id,pair.members.indexOf(null))}
function remove(id){if(!map.has(id))return;unseat(id);purge(id);selected=null;save();render();flash(full(map.get(id))+' возвращён(а) в список')}
function avg(pair){const ids=pair.members.filter(Boolean);if(ids.length!==2||ids.some(id=>map.get(id)?.role!=='student'))return null;const ss=ids.map(score);if(ss.some(s=>s===null))return null;return (ss[0]+ss[1])/2}
const format=n=>n===null||n===undefined?'—':Number(n).toLocaleString('ru-RU',{maximumFractionDigits:2});
function fixture(which){const e=$f('div','bus-fixture'+(which==='driver'?' bus-driver':' bus-door'));e.append($f('span','',which==='driver'?'◉':'⇥'),$f('small','',which==='driver'?'Водитель':which==='front'?'Дверь':'Задняя дверь'));return e}
function bench(value){if(!Array.isArray(value))return fixture(value);
 const el=$f('div','bus-bench');for(const number of value){const p=map.get(model.seats[number]);const b=$f('button','bus-seat'+(p?' filled '+style(p):' empty'));b.type='button';b.dataset.busSeat=String(number);b.title='Место '+number+': '+(p?full(p):'свободно');b.setAttribute('aria-label',b.title);
 b.append($f('span','bus-seat-num',number));
 if(p){b.draggable=true;b.dataset.busPerson=p.id;b.append($f('strong','bus-seat-code',short(p)),$f('small','bus-seat-name',p.last));const x=$f('span','bus-seat-clear','×');x.dataset.busUnseat=p.id;x.title='Освободить место';b.append(x)}
 else b.append($f('span','bus-seat-plus','＋'));el.append(b)}return el}
function drawSeats(){const root=$('busSeats');root.replaceChildren();for(const [left,right] of LAYOUT){const row=$f('div','bus-seat-row');row.append(bench(left),$f('div','bus-aisle','⋮'),bench(right));root.append(row)}}
function member(pair,idx){const id=pair.members[idx],p=map.get(id);const b=$f('button','bus-pair-slot'+(p?' has-person '+style(p):''),p?short(p)+' · '+p.last:'＋ человек');b.type='button';b.dataset.busPairSlot=pair.id+':'+idx;b.title=p?full(p):'Свободная ячейка пары';if(p){b.draggable=true;b.dataset.busPerson=p.id}return b}
function drawPairs(){const root=$('busPairs');root.replaceChildren();$('busPairCount').textContent=model.pairs.filter(x=>x.members.some(Boolean)).length;$('busEmptyPairs').hidden=!!model.pairs.length;
 model.pairs.forEach((pair,i)=>{const card=$f('div','bus-pair-card'+(selected?.kind==='pair'&&selected.id===pair.id?' is-selected':''));const header=$f('div','bus-pair-card-top');const del=$f('button','bus-delete-pair','×');del.type='button';del.title='Расформировать пару';del.dataset.busDeletePair=pair.id;header.append($f('span','', 'Пара '+(i+1)),del);
 const members=$f('div','bus-pair-members');members.append(member(pair,0),member(pair,1));
 const lower=$f('div','bus-pair-bottom');const label=$f('label','', 'Средний балл');const inp=$f('input','');inp.type='number';inp.min='0';inp.max='1000';inp.step='0.01';inp.inputMode='decimal';inp.placeholder='—';inp.dataset.busAverage=pair.id;const auto=avg(pair);inp.value=pair.override!==null?String(pair.override):auto===null?'':String(Number(auto.toFixed(2)));inp.title='Средний балл: можно изменить вручную';label.append(inp);const reset=$f('button','bus-reset-average','↻');reset.type='button';reset.title='Автоматический средний';reset.dataset.busAutoAverage=pair.id;lower.append(label,reset);
 const drag=$f('button','bus-pair-move',pair.members.every(Boolean)?'⇄ Перенести двоих':'Выбрать пару');drag.type='button';drag.draggable=pair.members.some(Boolean);drag.dataset.busPickPair=pair.id;card.append(header,members,lower,drag);root.append(card)})
}
function drawPeople(){const root=$('busPeople');root.replaceChildren();for(const p of people){const card=$f('div','bus-person-card '+style(p)+(selected?.kind==='person'&&selected.id===p.id?' is-selected':''));const b=$f('button','bus-person-pick');b.type='button';b.draggable=true;b.dataset.busPerson=p.id;b.title='Выбрать: '+full(p);const nm=$f('span','',full(p));nm.append($f('small','',notePerson(p.id)+(guest(p)?' · гость':p.role==='escort'?' · сопровождающий':'')));b.append($f('strong','',short(p)),nm);card.append(b);
 if(p.role==='student'){const label=$f('label','bus-score-label','Баллы');const input=$f('input','');input.type='number';input.inputMode='decimal';input.min='0';input.max='1000';input.step='0.01';input.dataset.busScore=p.id;input.value=score(p.id)===null?'':String(score(p.id));input.placeholder='—';input.title='Баллы: '+full(p);label.append(input);card.append(label)}root.append(card)}}
function render(){if(!ready)return;drawSeats();drawPairs();drawPeople();const n=Object.keys(model.seats).length;$('busOccupied').textContent=n;$('busVacant').textContent=22-n}
function open(kind){if(kind!=='bus'&&kind!=='quests')return;questView.hidden=kind!=='quests';busView.hidden=kind!=='bus';document.body.classList.toggle('bus-mode',kind==='bus');tabs.querySelectorAll('[data-trip-tab]').forEach(b=>{const active=b.dataset.tripTab===kind;b.classList.toggle('active',active);b.setAttribute('aria-current',active?'page':'false')});store.set(VIEW,kind)}
function dragChoice(str){if(!str)return null;const at=str.indexOf(':');if(at<0)return null;const kind=str.slice(0,at),id=str.slice(at+1);return kind==='person'&&map.has(id)?{kind,id}:kind==='pair'&&model.pairs.some(p=>p.id===id)?{kind,id}:null}
function target(e){return e.target.closest('[data-bus-seat],[data-bus-pair-slot],[data-bus-dock],[data-bus-pool]')}
async function initialize(){
 const root=document.querySelector('main');if(!root)return;
 questView=$f('div','trip-view');questView.id='tripQuestView';while(root.firstChild)questView.append(root.firstChild);
 tabs=$f('nav','trip-tabs');tabs.setAttribute('aria-label','Разделы поездки');tabs.innerHTML='<button type="button" class="trip-tab active" data-trip-tab="quests">◈ Квесты</button><button type="button" class="trip-tab" data-trip-tab="bus">▤ Автобус · рассадка</button>';
 busView=$f('div','trip-view bus-view');busView.id='tripBusView';busView.hidden=true;
 root.append(tabs,questView,busView);
 try{const response=await fetch('./bus-panel.html',{cache:'no-store'});if(!response.ok)throw Error('HTTP '+response.status);busView.innerHTML=await response.text()}
 catch(e){busView.textContent='Не удалось загрузить схему автобуса: '+e.message;return}
 tabs.addEventListener('click',e=>{const b=e.target.closest('[data-trip-tab]');if(b)open(b.dataset.tripTab)});
 busView.addEventListener('click',e=>{
 if(!ready||e.target.closest('input'))return;
 const un=e.target.closest('[data-bus-unseat]');if(un){remove(un.dataset.busUnseat);return}
 const del=e.target.closest('[data-bus-delete-pair]');if(del){model.pairs=model.pairs.filter(p=>p.id!==del.dataset.busDeletePair);selected=null;save();render();return}
 const autom=e.target.closest('[data-bus-auto-average]');if(autom){const p=model.pairs.find(p=>p.id===autom.dataset.busAutoAverage);if(p){p.override=null;save();render()}return}
 const pair=e.target.closest('[data-bus-pick-pair]');if(pair){selectPair(pair.dataset.busPickPair);return}
 const slot=e.target.closest('[data-bus-pair-slot]');if(slot){const [id,idx]=slot.dataset.busPairSlot.split(':');if(selected?.kind==='person')putPair(selected.id,id,Number(idx));else if(slot.dataset.busPerson)selectPerson(slot.dataset.busPerson);else flash('Выберите участника в нижнем списке');return}
 const seat=e.target.closest('[data-bus-seat]');if(seat){placeSeat(Number(seat.dataset.busSeat));return}
 const person=e.target.closest('[data-bus-person]');if(person){selectPerson(person.dataset.busPerson);return}
 if(e.target.closest('[data-bus-dock]')){if(selected?.kind==='person')dock(selected.id);else flash('Сначала выберите участника');return}
 if(e.target.closest('[data-bus-pool]')&&selected?.kind==='person')remove(selected.id);
 });
 busView.addEventListener('change',e=>{
 const inp=e.target.closest('[data-bus-score],[data-bus-average]');if(!inp||!ready)return;
 const s=inp.value.trim().replace(',','.'),v=Number(s);
 if(s&&( !Number.isFinite(v)||v<0||v>1000)){flash('Баллы должны быть от 0 до 1000');render();return}
 if(inp.dataset.busScore){if(s)model.scores[inp.dataset.busScore]=v;else delete model.scores[inp.dataset.busScore]}
 else{const p=model.pairs.find(p=>p.id===inp.dataset.busAverage);if(p)p.override=s?v:null}
 save();render();
 });
 busView.addEventListener('dragstart',e=>{
 if(!ready)return;const p=e.target.closest('[data-bus-pick-pair]'),person=e.target.closest('[data-bus-person]');
 const data=p?'pair:'+p.dataset.busPickPair:person?'person:'+person.dataset.busPerson:null;if(data){e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',data)}
 });
 busView.addEventListener('dragover',e=>{if(!ready)return;const t=target(e);if(t){e.preventDefault();e.dataTransfer.dropEffect='move';t.classList.add('bus-drop-over')}});
 busView.addEventListener('dragleave',e=>{const t=target(e);if(t&&!t.contains(e.relatedTarget))t.classList.remove('bus-drop-over')});
 busView.addEventListener('drop',e=>{
 if(!ready)return;const t=target(e);if(!t)return;e.preventDefault();busView.querySelectorAll('.bus-drop-over').forEach(x=>x.classList.remove('bus-drop-over'));
 const choice=dragChoice(e.dataTransfer.getData('text/plain'));if(!choice)return;
 if(t.dataset.busSeat)placeSeat(Number(t.dataset.busSeat),choice);
 else if(t.dataset.busPairSlot){if(choice.kind!=='person'){flash('В ячейку можно перенести только одного');return}const [id,idx]=t.dataset.busPairSlot.split(':');putPair(choice.id,id,Number(idx))}
 else if(t.dataset.busDock){if(choice.kind==='person')dock(choice.id)}
 else if(t.dataset.busPool){if(choice.kind==='person')remove(choice.id)}
 });
 $('busAddPair').addEventListener('click',()=>{createPair();flash('Добавлена пара: перенесите в неё двух участников')});
 $('busClearSelect').addEventListener('click',()=>{selected=null;render();flash('Выбор снят')});
 $('busReset').addEventListener('click',()=>{if(ready&&confirm('Очистить рассадку и пары? Введённые баллы сохранятся.')){model.seats={};model.pairs=[];selected=null;save();render()}});
 $('busCopy').addEventListener('click',async()=>{
 if(!ready)return;const lines=['Рассадка · поездка 24.10.2026','Выезд 09:00 · обратно 16:00','','Места:'];
 for(let n=1;n<=22;n++){const p=map.get(model.seats[n]);lines.push(n+'. '+(p?full(p):'свободно'))}
 lines.push('','Пары в подготовке:');model.pairs.forEach((p,i)=>lines.push((i+1)+'. '+p.members.map(id=>id?full(map.get(id)):'—').join(' + ')+' · средний '+format(p.override??avg(p))));
 const textValue=lines.join('\n');try{await navigator.clipboard.writeText(textValue);flash('Рассадка скопирована')}catch(_){const tmp=$f('textarea','');tmp.value=textValue;document.body.append(tmp);tmp.select();document.execCommand('copy');tmp.remove();flash('Рассадка скопирована')}
 });
 $('busPrint').addEventListener('click',()=>{if(ready)window.print()});
 if(pending){people=pending;map=new Map(people.map(p=>[p.id,p]));restore();ready=true;render();pending=null}
 open(store.get(VIEW)==='bus'?'bus':'quests');
}
window.addEventListener('gp:trip-roster',e=>{
 if(!Array.isArray(e.detail?.people))return;pending=e.detail.people;
 if(busView?.querySelector('#busSeats')){people=pending;map=new Map(people.map(p=>[p.id,p]));restore();ready=true;render();pending=null}
});
initialize();
})();