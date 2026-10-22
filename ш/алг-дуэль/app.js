(function algebraDuelApp(){
"use strict";
const STORAGE_KEY="gp-algebra-duel-v1";
const seedTasks=[
{id:"t01",topic:"Раскрытие скобок",level:1,a:{question:"3(2x + 4)",steps:["3 · 2x + 3 · 4","6x + 12"],answer:"6x + 12"},b:{question:"4(3x + 2)",steps:["4 · 3x + 4 · 2","12x + 8"],answer:"12x + 8"}},
{id:"t02",topic:"Раскрытие скобок",level:1,a:{question:"−2(3a − 5)",steps:["−2 · 3a + (−2) · (−5)","−6a + 10"],answer:"−6a + 10"},b:{question:"−3(2a − 4)",steps:["−3 · 2a + (−3) · (−4)","−6a + 12"],answer:"−6a + 12"}},
{id:"t03",topic:"Раскрытие скобок",level:2,a:{question:"5(x − 3) + 2x",steps:["5x − 15 + 2x","7x − 15"],answer:"7x − 15"},b:{question:"3(y − 4) + 4y",steps:["3y − 12 + 4y","7y − 12"],answer:"7y − 12"}},
{id:"t04",topic:"Раскрытие скобок",level:2,a:{question:"4(2m − 1) − 3m",steps:["8m − 4 − 3m","5m − 4"],answer:"5m − 4"},b:{question:"2(4m − 3) − m",steps:["8m − 6 − m","7m − 6"],answer:"7m − 6"}},
{id:"t05",topic:"Раскрытие скобок",level:3,a:{question:"2(x + 3) − 3(x − 1)",steps:["2x + 6 − 3x + 3","−x + 9"],answer:"−x + 9"},b:{question:"4(y + 2) − 5(y − 1)",steps:["4y + 8 − 5y + 5","−y + 13"],answer:"−y + 13"}},
{id:"t06",topic:"Подобные слагаемые",level:1,a:{question:"7x − 3 + 2x + 5",steps:["(7x + 2x) + (−3 + 5)","9x + 2"],answer:"9x + 2"},b:{question:"6a + 8 − 2a − 3",steps:["(6a − 2a) + (8 − 3)","4a + 5"],answer:"4a + 5"}},
{id:"t07",topic:"Подобные слагаемые",level:2,a:{question:"3a + 5b − 2a + b",steps:["(3a − 2a) + (5b + b)","a + 6b"],answer:"a + 6b"},b:{question:"7m − 2n − 3m + 5n",steps:["(7m − 3m) + (−2n + 5n)","4m + 3n"],answer:"4m + 3n"}},
{id:"t08",topic:"Подобные слагаемые",level:1,a:{question:"x + 4x − 2 + 9",steps:["5x + (−2 + 9)","5x + 7"],answer:"5x + 7"},b:{question:"y + 5y − 6 + 3",steps:["6y + (−6 + 3)","6y − 3"],answer:"6y − 3"}},
{id:"t09",topic:"Линейные уравнения",level:1,a:{question:"3x + 5 = 20",steps:["3x = 20 − 5","3x = 15","x = 15 : 3"],answer:"x = 5"},b:{question:"4y + 3 = 23",steps:["4y = 23 − 3","4y = 20","y = 20 : 4"],answer:"y = 5"}},
{id:"t10",topic:"Линейные уравнения",level:2,a:{question:"2(x + 3) = 18",steps:["2x + 6 = 18","2x = 12","x = 6"],answer:"x = 6"},b:{question:"3(y + 2) = 21",steps:["3y + 6 = 21","3y = 15","y = 5"],answer:"y = 5"}},
{id:"t11",topic:"Линейные уравнения",level:2,a:{question:"5x − 4 = 2x + 11",steps:["5x − 2x = 11 + 4","3x = 15","x = 5"],answer:"x = 5"},b:{question:"6y + 1 = 3y + 16",steps:["6y − 3y = 16 − 1","3y = 15","y = 5"],answer:"y = 5"}},
{id:"t12",topic:"Линейные уравнения",level:3,a:{question:"−2(x − 5) = 6",steps:["−2x + 10 = 6","−2x = −4","x = 2"],answer:"x = 2"},b:{question:"−3(y − 4) = 3",steps:["−3y + 12 = 3","−3y = −9","y = 3"],answer:"y = 3"}},
{id:"t13",topic:"Обыкновенные дроби",level:1,a:{question:"5/9 − 2/9",steps:["(5 − 2)/9","3/9 = 1/3"],answer:"1/3"},b:{question:"7/12 − 2/12",steps:["(7 − 2)/12","5/12"],answer:"5/12"}},
{id:"t14",topic:"Обыкновенные дроби",level:2,a:{question:"2/3 + 1/6",steps:["4/6 + 1/6","5/6"],answer:"5/6"},b:{question:"3/4 + 1/8",steps:["6/8 + 1/8","7/8"],answer:"7/8"}},
{id:"t15",topic:"Обыкновенные дроби",level:2,a:{question:"3/4 ÷ 3/8",steps:["3/4 · 8/3","24/12 = 2"],answer:"2"},b:{question:"5/6 ÷ 5/12",steps:["5/6 · 12/5","60/30 = 2"],answer:"2"}},
{id:"t16",topic:"Обыкновенные дроби",level:2,a:{question:"2/5 ÷ 4/5",steps:["2/5 · 5/4","10/20 = 1/2"],answer:"1/2"},b:{question:"3/7 ÷ 6/7",steps:["3/7 · 7/6","21/42 = 1/2"],answer:"1/2"}},
{id:"t17",topic:"Раскрытие скобок",level:3,a:{question:"−3(2a − 5) + a",steps:["−6a + 15 + a","−5a + 15"],answer:"−5a + 15"},b:{question:"−2(4b − 3) + b",steps:["−8b + 6 + b","−7b + 6"],answer:"−7b + 6"}},
{id:"t18",topic:"Линейные уравнения",level:2,a:{question:"0,6(5x − 3) = 4,2",steps:["3x − 1,8 = 4,2","3x = 6","x = 2"],answer:"x = 2"},b:{question:"0,4(5y − 2) = 3,2",steps:["2y − 0,8 = 3,2","2y = 4","y = 2"],answer:"y = 2"}}
];
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
function makeDefaults(){
const students=[];
for(const team of ["A","B"]){const count=team==="A"?12:14;for(let i=1;i<=count;i++)students.push({id:team+"-"+String(i).padStart(2,"0"),name:"Участник "+(team==="A"?"7А":"7Б")+"-"+String(i).padStart(2,"0"),team,active:true});}
return {version:1,started:false,view:"setup",teamNames:{A:"А",B:"Б"},students,tasks:JSON.parse(JSON.stringify(seedTasks)),rounds:[],current:null,usedTaskIds:[],topic:"Все темы",statsFilter:"all",editTaskId:null,showAnswers:false};
}
function validTask(t){
return t&&typeof t==="object"&&typeof t.topic==="string"&&t.topic.trim()&&["a","b"].every(k=>t[k]&&typeof t[k].question==="string"&&t[k].question.trim()&&typeof t[k].answer==="string"&&t[k].answer.trim()&&Array.isArray(t[k].steps)&&t[k].steps.every(x=>typeof x==="string"));
}
function normalizeTask(t){return {id:String(t.id||"custom-"+slug()),topic:String(t.topic).trim().slice(0,90),level:Math.max(1,Math.min(3,Number(t.level)||1)),a:{question:String(t.a.question).trim().slice(0,400),steps:t.a.steps.map(x=>String(x).slice(0,500)).slice(0,15),answer:String(t.a.answer).trim().slice(0,250)},b:{question:String(t.b.question).trim().slice(0,400),steps:t.b.steps.map(x=>String(x).slice(0,500)).slice(0,15),answer:String(t.b.answer).trim().slice(0,250)}};}
function validState(obj){return obj&&typeof obj==="object"&&Array.isArray(obj.students)&&Array.isArray(obj.tasks)&&Array.isArray(obj.rounds)&&obj.teamNames&&typeof obj.teamNames.A==="string"&&typeof obj.teamNames.B==="string"&&obj.students.every(p=>p&&typeof p.id==="string"&&typeof p.name==="string"&&(p.team==="A"||p.team==="B"))&&obj.tasks.every(validTask);}
function load(){
try{const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");if(validState(data)){
const base=makeDefaults();const merged=Object.assign(base,data);
merged.view=["setup","arena","stats","tasks"].includes(merged.view)?merged.view:"setup";
merged.usedTaskIds=Array.isArray(merged.usedTaskIds)?merged.usedTaskIds:[];
merged.statsFilter=["all","A","B"].includes(merged.statsFilter)?merged.statsFilter:"all";
merged.tasks=merged.tasks.map(normalizeTask);
merged.students=merged.students.map(p=>({id:String(p.id),name:String(p.name),team:p.team,active:p.active!==false}));
if(!merged.current||!["paired","problems","result"].includes(merged.current.phase))merged.current=null;
return merged;}}
catch(e){console.warn("Ошибка чтения сохранения",e);}
return makeDefaults();
}
let state=load(),pendingWinner=null,toastTimer=null;
function save(){
try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$("saveStatus").textContent="● Сохранено на этом устройстве";}
catch(e){$("saveStatus").textContent="⚠ Не удалось сохранить";notify("Недостаточно места. Скачайте резервную копию.");}
}
function notify(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3300);}
function teamLabel(t){return state.teamNames[t]||t;}
function player(id){return state.students.find(p=>p.id===id);}
function played(id){return state.rounds.filter(r=>r.aId===id||r.bId===id);}
function pStats(id){const rr=played(id);const wins=rr.filter(r=>(r.winner==="A"?r.aId:r.bId)===id).length;const grades=rr.map(r=>r.aId===id?r.gradeA:r.gradeB).filter(x=>Number.isFinite(x));return {count:rr.length,wins,losses:rr.length-wins,avg:grades.length?grades.reduce((a,b)=>a+b,0)/grades.length:null};}
function teamWins(t){return state.rounds.filter(r=>r.winner===t).length;}
function active(t){return state.students.filter(p=>p.team===t&&p.active);}
function rand(arr){return arr[Math.floor(Math.random()*arr.length)];}
function fmt(n){return n===null?"—":n.toLocaleString("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2});}
function setView(v){state.view=v;save();render();window.scrollTo({top:0,behavior:"smooth"});}
function navbar(){const names=[["setup","01 · Подготовка"],["arena","02 · Арена"],["stats","Статистика"],["tasks","Банк задач"]];$("tabs").innerHTML=names.map(([id,text])=>'<button type="button" class="tab '+(state.view===id?"active":"")+'" data-act="view" data-view="'+id+'">'+esc(text)+'</button>').join("");}
function scoreboard(){
const total=state.rounds.length;let html="";
for(const t of ["A","B"]){const w=teamWins(t);html+='<div class="team-score team-'+t.toLowerCase()+'"><div class="team-label">КОМАНДА '+t+' · '+active(t).length+' в составе</div><div class="score-content"><div class="team-name" title="'+esc(teamLabel(t))+'">'+esc(teamLabel(t))+'</div><div class="score-number">'+w+'</div></div><div class="team-extra">'+(total?Math.round(w/total*100)+"% побед":"Ожидает первого раунда")+'</div></div>';if(t==="A")html+='<div class="center-vs">VS</div>';}
$("scorebar").innerHTML=html;
}
function teamSetup(t){
const items=state.students.filter(s=>s.team===t);
return '<section class="panel"><div class="section-head"><div><div class="eyebrow">КОМАНДА '+t+'</div><h2>'+esc(teamLabel(t))+'</h2><p>'+active(t).length+' из '+items.length+' участвуют</p></div><span class="pill">'+(t==="A"?"7А":"7Б")+' · исходный состав</span></div>'+
'<label class="field"><span>Название команды</span><input maxlength="45" value="'+esc(teamLabel(t))+'" data-team-name="'+t+'" aria-label="Название команды '+t+'"></label>'+
'<div class="student-list" style="margin-top:16px">'+items.map((p,i)=>'<div class="student '+(p.active?"":"absent")+'"><span class="number">'+String(i+1).padStart(2,"0")+'</span><span class="student-name">'+esc(p.name)+'</span><label><input type="checkbox" data-player-active="'+esc(p.id)+'" '+(p.active?"checked":"")+'>Есть</label><button type="button" title="Удалить" aria-label="Удалить '+esc(p.name)+'" class="iconbtn compact" data-act="remove-player" data-id="'+esc(p.id)+'">×</button></div>').join("")+'</div>'+
'<form class="inline-form" data-form="add-player" data-team="'+t+'"><input required maxlength="120" name="name" placeholder="Фамилия Имя"><button class="secondary" type="submit">+ Добавить</button></form>'+
'<details class="add-block"><summary>Загрузить список класса (один ученик в строке)</summary><p class="hint">Вставьте ФИ. Замените демонстрационные записи или добавьте к ним. Список сохранится только в вашем браузере.</p><textarea id="bulk-'+t+'" placeholder="Иванов Иван&#10;Петрова Анна"></textarea><div class="toolbar"><button type="button" class="secondary compact" data-act="bulk-add" data-team="'+t+'">Добавить всех</button><button type="button" class="ghost compact" data-act="bulk-replace" data-team="'+t+'">Заменить весь состав</button></div></details></section>';
}
function renderSetup(){
$("screen").innerHTML='<div class="section-head"><div><div class="eyebrow">ШАГ 1 · ПОДГОТОВКА</div><h2>Кто сегодня участвует?</h2><p>Отметьте отсутствующих. Они не попадут в случайный выбор, но их предыдущие результаты сохранятся.</p></div><button type="button" class="primary" data-act="start">Перейти к дуэли →</button></div>'+
'<div class="notice warning">Стартовый состав: 12 участников 7А и 14 участников 7Б с условными обозначениями. Реальные ФИ можно вставить ниже без публикации в открытом GitHub.</div>'+
'<div class="team-rosters">'+teamSetup("A")+teamSetup("B")+'</div><div class="actions-center"><button type="button" class="primary" data-act="start">Выбрать участников →</button></div>';
}
function stage(){const phase=state.current?.phase;const n=phase==="paired"?1:phase==="problems"?2:phase==="result"?3:0;return '<div class="stage-line">'+["Выбор пары","Задания","Итог"].map((x,i)=>'<span class="stage-dot '+(n===i+1?"active":"")+'">'+(i+1)+'. '+x+'</span>').join('<span>›</span>')+'</div>';}
function versus(a,b){return '<div class="versus"><div class="fighter"><span class="role">КОМАНДА '+esc(teamLabel("A"))+'</span><div class="name">'+esc(a)+'</div></div><div class="vs">VS</div><div class="fighter b"><span class="role">КОМАНДА '+esc(teamLabel("B"))+'</span><div class="name">'+esc(b)+'</div></div></div>';}
function taskPanel(t,p,side,done){
const canReveal=done||state.showAnswers;
return '<div class="task-card '+(side==="B"?"b":"")+'"><div class="task-label">КОМАНДА '+esc(teamLabel(side))+' · ЗАДАНИЕ '+side+'</div><div class="problem">'+esc(p.question)+'</div>'+
(!done?'<button type="button" data-act="win" data-team="'+side+'" class="winner-btn">🏆 Победа команды '+esc(teamLabel(side))+'</button>':('<div class="pill">Оценка: '+esc(String(side==="A"?state.current.gradeA:state.current.gradeB))+' / 10</div>'))+
(canReveal?'<div class="answer-box"><strong>Решение</strong><ol>'+p.steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol><div class="answer">Ответ: '+esc(p.answer)+'</div></div>':'')+'</div>';
}
function renderArena(){
const c=state.current;if(!c){$("screen").innerHTML=stage()+'<section class="hero"><div class="eyebrow">АРЕНА ГОТОВА</div><h2>Два класса.<br>Одна дуэль.</h2><p>Случайно выбираем по одному ученику из каждой команды. Затем выдаём похожие примеры.</p><div class="topics"><span class="pill">'+active("A").length+' участников А</span><span class="pill">'+active("B").length+' участников Б</span><span class="pill">'+state.tasks.length+' пар заданий</span></div><button type="button" class="primary" data-act="choose">⚡ Выбрать участников</button></section>';return;}
const nameA=player(c.aId)?.name||c.nameA||"Участник А",nameB=player(c.bId)?.name||c.nameB||"Участник Б";
let body=stage()+versus(nameA,nameB);
if(c.phase==="paired"){body+='<section class="hero"><div class="eyebrow">УЧАСТНИКИ ВЫБРАНЫ</div><h2>К доске!</h2><p>Когда оба участника будут готовы, выдайте задания.</p><div class="topics"><span class="pill">Одна тема</span><span class="pill">Два аналогичных примера</span></div><div class="toolbar"><select aria-label="Тема заданий" id="topicSelect">'+topicOptions(state.topic)+'</select></div><button type="button" class="primary" data-act="issue">Выдать задания →</button><button type="button" class="ghost" data-act="choose">↻ Выбрать другую пару</button></section>';}
if(c.phase==="problems"||c.phase==="result"){
const done=c.phase==="result";
body+='<div class="section-head"><div><div class="eyebrow">'+esc(c.task.topic)+' · СЛОЖНОСТЬ '+c.task.level+'/3</div><h2>'+(done?"Раунд завершён":"Решайте на доске")+'</h2><p>'+(done?"Результат учтён в общей статистике.":"Первый правильный ответ — победа. Нажмите кнопку под нужным учеником.")+'</p></div>'+(done?'<span class="pill success">Раунд сохранён ✓</span>':'<button type="button" class="ghost compact" data-act="reveal">'+(state.showAnswers?"Скрыть":"Показать")+' решения</button>')+'</div>';
if(done){const winnerName=c.winner==="A"?nameA:nameB;body+='<div class="result-banner"><small>ПОБЕДИТЕЛЬ РАУНДА</small><strong>🏆 '+esc(winnerName)+'</strong><small>Команда '+esc(teamLabel(c.winner))+'</small></div>';}
body+='<div class="problem-grid">'+taskPanel(c.task,c.task.a,"A",done)+taskPanel(c.task,c.task.b,"B",done)+'</div><div class="actions-center">'+(done?'<button type="button" class="primary" data-act="choose">Следующая дуэль →</button>':'<span class="hint">Ответы скрыты до завершения раунда, если не нажать «Показать решения».</span>')+'</div>';
}
$("screen").innerHTML=body;
}
function renderStats(){
const total=state.rounds.length,grades=state.rounds.flatMap(r=>[r.gradeA,r.gradeB]).filter(Number.isFinite),overall=grades.length?grades.reduce((a,b)=>a+b,0)/grades.length:null;
const filtered=state.students.filter(s=>state.statsFilter==="all"||s.team===state.statsFilter).map(s=>({p:s,st:pStats(s.id)})).sort((a,b)=>b.st.wins-a.st.wins||b.st.count-a.st.count||a.p.name.localeCompare(b.p.name,"ru"));
let rows=filtered.map(({p,st})=>'<tr><td><button class="linklike" data-act="profile" data-id="'+esc(p.id)+'">'+esc(p.name)+'</button></td><td>'+esc(teamLabel(p.team))+'</td><td>'+(p.active?'<span class="success">На месте</span>':'Отсутствует')+'</td><td class="num">'+st.count+'</td><td class="num"><strong>'+st.wins+'</strong></td><td class="num">'+st.losses+'</td><td class="num">'+(st.count?Math.round(st.wins/st.count*100)+"%":"—")+'</td><td class="num"><span class="grade-chip">'+fmt(st.avg)+'</span></td></tr>').join("");
$("screen").innerHTML='<div class="section-head"><div><div class="eyebrow">ИТОГИ СОРЕВНОВАНИЯ</div><h2>Сводная таблица</h2><p>Все раунды, победы, поражения и средний балл каждого участника.</p></div><div class="toolbar"><button type="button" class="ghost compact" data-act="csv">↓ CSV</button><button type="button" class="ghost compact" data-act="undo" '+(total?"":"disabled")+'>↶ Отменить последний раунд</button></div></div>'+
'<div class="stat-grid"><div class="stat"><strong>'+total+'</strong><span>Раундов проведено</span></div><div class="stat"><strong>'+teamWins("A")+' : '+teamWins("B")+'</strong><span>Победы команд</span></div><div class="stat"><strong>'+fmt(overall)+'</strong><span>Средняя оценка</span></div><div class="stat"><strong>'+state.students.filter(s=>played(s.id).length).length+'</strong><span>Учеников участвовало</span></div></div>'+
'<div class="panel"><div class="section-head"><h2>Участники</h2><div class="topics">'+[["all","Все"],["A",teamLabel("A")],["B",teamLabel("B")]].map(([k,v])=>'<button type="button" data-act="stats-filter" data-filter="'+k+'" class="topic '+(state.statsFilter===k?"active":"")+'">'+esc(v)+'</button>').join("")+'</div></div><div class="table-scroll"><table><thead><tr><th>ФИ участника</th><th>Команда</th><th>Статус</th><th>Раундов</th><th>Побед</th><th>Поражений</th><th>Побед %</th><th>Ср. балл / 10</th></tr></thead><tbody>'+rows+'</tbody></table></div><p class="hint">Нажмите на ФИ, чтобы открыть карточку ученика с историей дуэлей.</p></div>'+
'<section class="panel"><div class="section-head"><h2>Последние раунды</h2></div>'+(total?'<div class="table-scroll"><table><thead><tr><th>Дата</th><th>Команда А</th><th>Команда Б</th><th>Победитель</th><th>Оценки А / Б</th><th>Тема</th></tr></thead><tbody>'+state.rounds.slice().reverse().slice(0,20).map(r=>'<tr><td>'+esc(dateStr(r.date))+'</td><td>'+esc(r.nameA)+'</td><td>'+esc(r.nameB)+'</td><td>'+esc(r.winner==="A"?r.nameA:r.nameB)+'</td><td>'+r.gradeA+" / "+r.gradeB+'</td><td>'+esc(r.task.topic)+'</td></tr>').join("")+'</tbody></table></div>':'<p class="muted">Пока не было ни одного завершённого раунда.</p>')+'</section>';
}
function dateStr(value){const d=new Date(value);return isNaN(d.getTime())?"—":d.toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"});}
function topicNames(){return ["Все темы",...new Set(state.tasks.map(t=>t.topic))];}
function topicOptions(pick){return topicNames().map(x=>'<option value="'+esc(x)+'" '+(pick===x?"selected":"")+'>'+esc(x)+'</option>').join("");}
function taskItem(t){
return '<article class="task-item"><h3><span class="pill">'+esc(t.topic)+'</span> <span class="muted">Сложность '+t.level+'/3</span></h3><div class="split"><div><strong>А:</strong> '+esc(t.a.question)+'</div><div><strong>Б:</strong> '+esc(t.b.question)+'</div></div><details><summary>Ответы и решения</summary><div class="split">'+["a","b"].map(side=>'<div><strong>'+side.toUpperCase()+'</strong><ol>'+t[side].steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol><b>Ответ: '+esc(t[side].answer)+'</b></div>').join("")+'</div></details><div class="toolbar"><button type="button" class="ghost compact" data-act="edit-task" data-id="'+esc(t.id)+'">Изменить</button><button type="button" class="ghost compact" data-act="delete-task" data-id="'+esc(t.id)+'">Удалить</button></div></article>';
}
function taskEditor(){
const t=state.tasks.find(q=>q.id===state.editTaskId),input=(name,value,placeholder)=>'<input name="'+name+'" value="'+esc(value||"")+'" placeholder="'+esc(placeholder||"")+'" required maxlength="400">';
return '<form id="taskForm" class="add-block"><div class="section-head"><h2>'+(t?"Редактировать пару":"Добавить пару примеров")+'</h2>'+(t?'<button class="ghost compact" type="button" data-act="cancel-task">Отмена</button>':'')+'</div><div class="form-grid"><label class="field"><span>Тема</span>'+input("topic",t?.topic,"Например: Раскрытие скобок")+'</label><label class="field"><span>Сложность</span><select name="level">'+[1,2,3].map(n=>'<option value="'+n+'" '+(t?.level===n?"selected":"")+'>'+n+'</option>').join("")+'</select></label></div><div class="form-grid" style="margin-top:14px"><div class="field"><span>Пример для А</span>'+input("qA",t?.a.question,"2(x + 3)")+'<span>Ответ А</span>'+input("ansA",t?.a.answer,"2x + 6")+'<span>Решение А (один шаг в строке)</span><textarea name="stepsA" placeholder="2x + 6">'+esc(t?.a.steps.join("\\n")||"")+'</textarea></div><div class="field"><span>Пример для Б</span>'+input("qB",t?.b.question,"3(x + 2)")+'<span>Ответ Б</span>'+input("ansB",t?.b.answer,"3x + 6")+'<span>Решение Б (один шаг в строке)</span><textarea name="stepsB" placeholder="3x + 6">'+esc(t?.b.steps.join("\\n")||"")+'</textarea></div></div><div class="actions-center"><button class="primary" type="submit">'+(t?"Сохранить изменения":"Добавить в базу")+'</button></div></form>';
}
function renderTasks(){
const by=state.topic==="Все темы"?state.tasks:state.tasks.filter(t=>t.topic===state.topic);
$("screen").innerHTML='<div class="section-head"><div><div class="eyebrow">ПОДГОТОВКА ЗАДАНИЙ</div><h2>Банк задач · '+state.tasks.length+' пар</h2><p>В каждой паре два разных примера одной темы, с готовыми решениями и ответами.</p></div><div class="toolbar"><button type="button" class="ghost compact" data-act="import-tasks">↑ Импорт JSON</button><button type="button" class="ghost compact" data-act="export-tasks">↓ Экспорт JSON</button></div></div>'+
'<div class="notice">Примеры можно добавлять вручную или массово загружать через JSON. При импорте новые пары добавляются к существующим. Изменения сохраняются локально.</div>'+
'<section class="panel"><div class="section-head"><h2>Выбор темы</h2><span class="pill">'+by.length+' пар</span></div><div class="topics">'+topicNames().map(topic=>'<button type="button" class="topic '+(state.topic===topic?"active":"")+'" data-act="set-topic" data-topic="'+esc(topic)+'">'+esc(topic)+'</button>').join("")+'</div></section>'+
'<section class="panel"><div class="section-head"><h2>Примеры</h2></div><div class="task-list">'+(by.length?by.map(taskItem).join(""):'<div class="empty">Нет примеров по этой теме</div>')+'</div></section><section class="panel">'+taskEditor()+'</section>';
}
function render(){navbar();scoreboard();if(state.view==="setup")renderSetup();else if(state.view==="arena")renderArena();else if(state.view==="stats")renderStats();else renderTasks();}
function selectPerson(t){
let pool=active(t),recent=state.rounds.slice(-2).map(r=>t==="A"?r.aId:r.bId);
if(state.current?.[t==="A"?"aId":"bId"])recent.push(state.current[t==="A"?"aId":"bId"]);
const fresh=pool.filter(p=>!recent.includes(p.id));if(fresh.length)pool=fresh;return rand(pool);
}
function choose(){
if(!active("A").length||!active("B").length){notify("У каждой команды должен быть хотя бы один доступный ученик.");setView("setup");return;}
if(!state.tasks.length){notify("Сначала добавьте задания в банк.");setView("tasks");return;}
const a=selectPerson("A"),b=selectPerson("B");state.current={phase:"paired",aId:a.id,bId:b.id,nameA:a.name,nameB:b.name};state.started=true;state.showAnswers=false;state.view="arena";save();render();
}
function issue(){
if(state.current?.phase!=="paired")return;
let bank=state.tasks.filter(t=>state.topic==="Все темы"||t.topic===state.topic);
if(!bank.length){notify("В выбранной теме нет заданий.");return;}
let unused=bank.filter(t=>!state.usedTaskIds.includes(t.id));
if(!unused.length){state.usedTaskIds=state.usedTaskIds.filter(id=>!bank.some(t=>t.id===id));unused=bank;}
const t=rand(unused);state.usedTaskIds.push(t.id);state.current.phase="problems";state.current.task=JSON.parse(JSON.stringify(t));state.showAnswers=false;save();render();
}
function openGrade(winner){
if(state.current?.phase!=="problems")return;
pendingWinner=winner;const a=player(state.current.aId)?.name||state.current.nameA,b=player(state.current.bId)?.name||state.current.nameB;
$("gradeTitle").textContent="Победа команды "+teamLabel(winner);$("gradeHint").textContent="Победитель: "+(winner==="A"?a:b)+". Укажите оценки обоим участникам (от 2 до 10).";
$("gradeLabelA").textContent=teamLabel("A")+" · "+a;$("gradeLabelB").textContent=teamLabel("B")+" · "+b;
$("gradeA").value="";$("gradeB").value="";$("gradeDialog").showModal();
}
function commitRound(gradeA,gradeB){
const c=state.current;if(c?.phase!=="problems"||!["A","B"].includes(pendingWinner))return;
const r={id:"r-"+slug(),date:new Date().toISOString(),aId:c.aId,bId:c.bId,nameA:player(c.aId)?.name||c.nameA,nameB:player(c.bId)?.name||c.nameB,winner:pendingWinner,gradeA,gradeB,task:JSON.parse(JSON.stringify(c.task))};
state.rounds.push(r);state.current=Object.assign({},c,{phase:"result",winner:pendingWinner,gradeA,gradeB});pendingWinner=null;$("gradeDialog").close();save();render();notify("Раунд учтён. Статистика обновлена.");
}
function openProfile(id){
const p=player(id);if(!p)return;const st=pStats(id),hist=played(id).slice().reverse();
$("profileContent").innerHTML='<div class="modal-top"><div><div class="overline">КАРТОЧКА УЧАСТНИКА · '+esc(teamLabel(p.team))+'</div><h2>'+esc(p.name)+'</h2></div><button type="button" class="iconbtn" data-act="close-profile">×</button></div><div class="stat-grid" style="margin-top:20px"><div class="stat"><strong>'+st.count+'</strong><span>Раундов</span></div><div class="stat"><strong>'+st.wins+'</strong><span>Побед</span></div><div class="stat"><strong>'+st.losses+'</strong><span>Поражений</span></div><div class="stat"><strong>'+fmt(st.avg)+'</strong><span>Средний балл</span></div></div><h3>История выступлений</h3><div class="profile-history">'+(hist.length?hist.map(r=>'<div class="student"><span class="student-name">'+esc(dateStr(r.date))+' · '+esc(r.task.topic)+'</span><span class="'+((r.winner==="A"?r.aId:r.bId)===id?"success":"danger-text")+'">'+((r.winner==="A"?r.aId:r.bId)===id?"Победа":"Поражение")+'</span><b>'+esc(String(r.aId===id?r.gradeA:r.gradeB))+'/10</b></div>').join(""):'<p class="muted">Участник ещё не выходил к доске.</p>')+'</div><div class="modal-actions" style="margin-top:20px"><button type="button" class="primary" data-act="close-profile">Закрыть</button></div>';
$("profileDialog").showModal();
}
function addPlayers(team,names,replace){
const trimmed=names.map(x=>x.trim()).filter(Boolean).slice(0,250);if(!trimmed.length){notify("Введите хотя бы одно ФИ.");return;}
if(replace&&state.rounds.length&&!confirm("Замена состава уберёт прежних участников из сводной таблицы. Сохранённые итоги раундов останутся в истории. Продолжить?"))return;
if(replace)state.students=state.students.filter(p=>p.team!==team);
for(const name of trimmed)state.students.push({id:"s-"+slug(),name:name.slice(0,120),team,active:true});
save();render();notify((replace?"Состав заменён: ":"Добавлено: ")+trimmed.length);
}
function safeFilename(prefix,ext){return prefix+"-"+new Date().toISOString().slice(0,10)+"."+ext;}
function download(name,data,type){const file=new Blob([data],{type:type||"application/json;charset=utf-8"}),url=URL.createObjectURL(file),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportCsv(){const cells=[["Команда","Ученик","Активен","Раундов","Побед","Поражений","Средний балл"]];for(const p of state.students){const st=pStats(p.id);cells.push([teamLabel(p.team),p.name,p.active?"Да":"Нет",st.count,st.wins,st.losses,st.avg===null?"":fmt(st.avg)]);}
const csv="\\uFEFF"+cells.map(row=>row.map(s=>'"'+String(s).replace(/"/g,'""')+'"').join(";")).join("\\r\\n");download(safeFilename("algebra-duel-results","csv"),csv,"text/csv;charset=utf-8");}
function handleTaskEditor(form){
const f=new FormData(form),clean=x=>String(f.get(x)||"").trim(),split=x=>clean(x).split(/\\r?\\n/).map(s=>s.trim()).filter(Boolean);
const t={id:state.editTaskId||"t-"+slug(),topic:clean("topic"),level:Number(clean("level")),a:{question:clean("qA"),answer:clean("ansA"),steps:split("stepsA")},b:{question:clean("qB"),answer:clean("ansB"),steps:split("stepsB")}};
if(!validTask(t)){notify("Заполните оба примера, ответы и тему.");return;}
const normalized=normalizeTask(t);
if(state.editTaskId){const i=state.tasks.findIndex(x=>x.id===state.editTaskId);if(i>=0)state.tasks[i]=normalized;}else state.tasks.push(normalized);
state.editTaskId=null;state.topic="Все темы";save();render();notify("Пара заданий сохранена.");
}
function parseTaskImport(text){
const value=JSON.parse(text);const arr=Array.isArray(value)?value:value?.tasks;
if(!Array.isArray(arr)||!arr.length||arr.length>500)throw Error("Ожидается JSON-массив из 1–500 пар.");
if(!arr.every(validTask))throw Error("В каждой паре нужны topic, a и b (question, answer, steps: []).");
return arr.map(t=>normalizeTask(Object.assign({},t,{id:"import-"+slug()})));
}
function fileReader(input,cb){const file=input.files?.[0];input.value="";if(!file)return; if(file.size>2000000){notify("JSON должен быть меньше 2 МБ.");return;}file.text().then(cb).catch(e=>notify("Не удалось прочесть файл: "+e.message));}
function handleClick(e){
const btn=e.target.closest("[data-act]");if(!btn||btn.disabled)return;const act=btn.dataset.act;
if(act==="view")setView(btn.dataset.view);
else if(act==="fullscreen"){if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.().catch(()=>notify("Полноэкранный режим недоступен."));}
else if(act==="start"){state.started=true;state.view="arena";save();render();}
else if(act==="choose")choose();
else if(act==="issue")issue();
else if(act==="win")openGrade(btn.dataset.team);
else if(act==="reveal"){state.showAnswers=!state.showAnswers;save();render();}
else if(act==="close-grade"){$("gradeDialog").close();pendingWinner=null;}
else if(act==="close-profile")$("profileDialog").close();
else if(act==="profile")openProfile(btn.dataset.id);
else if(act==="stats-filter"){state.statsFilter=btn.dataset.filter;save();render();}
else if(act==="remove-player"){const p=player(btn.dataset.id);if(p&&confirm("Удалить «"+p.name+"» из списка?")){state.students=state.students.filter(x=>x.id!==p.id);save();render();}}
else if(act==="bulk-add"||act==="bulk-replace"){const t=btn.dataset.team,names=$("bulk-"+t).value.split(/\\r?\\n/);addPlayers(t,names,act==="bulk-replace");}
else if(act==="backup")download(safeFilename("algebra-duel-backup","json"),JSON.stringify({application:"algebra-duel",savedAt:new Date().toISOString(),data:state},null,2));
else if(act==="restore")$("backupFile").click();
else if(act==="csv")exportCsv();
else if(act==="undo"){if(state.rounds.length&&confirm("Отменить последний завершённый раунд и его оценки?")){state.rounds.pop();state.current=null;save();render();notify("Последний раунд отменён.");}}
else if(act==="set-topic"){state.topic=btn.dataset.topic;save();render();}
else if(act==="edit-task"){state.editTaskId=btn.dataset.id;save();render();$("taskForm")?.scrollIntoView({behavior:"smooth",block:"center"});}
else if(act==="cancel-task"){state.editTaskId=null;save();render();}
else if(act==="delete-task"){const t=state.tasks.find(x=>x.id===btn.dataset.id);if(t&&confirm("Удалить эту пару заданий?")){state.tasks=state.tasks.filter(x=>x.id!==t.id);if(state.editTaskId===t.id)state.editTaskId=null;save();render();}}
else if(act==="import-tasks")$("taskFile").click();
else if(act==="export-tasks")download(safeFilename("algebra-duel-tasks","json"),JSON.stringify({tasks:state.tasks},null,2));
}
document.addEventListener("click",handleClick);
document.addEventListener("change",e=>{
const el=e.target;
if(el.matches("[data-player-active]")){const p=player(el.dataset.playerActive);if(p){p.active=el.checked;save();render();}}
else if(el.matches("[data-team-name]")){const t=el.dataset.teamName;state.teamNames[t]=(el.value.trim()||t).slice(0,45);save();render();}
else if(el.id==="topicSelect"){state.topic=el.value;save();}
else if(el.id==="taskFile")fileReader(el,text=>{try{const tasks=parseTaskImport(text);state.tasks.push(...tasks);state.topic="Все темы";save();render();notify("Добавлено пар: "+tasks.length);}catch(e){notify("Ошибка импорта: "+e.message);}});
else if(el.id==="backupFile")fileReader(el,text=>{try{const payload=JSON.parse(text),next=payload?.data||payload;if(!validState(next))throw Error("Некорректный формат резервной копии.");if(confirm("Заменить текущую дуэль данными из резервной копии?")){localStorage.setItem(STORAGE_KEY,JSON.stringify(next));state=load();render();notify("Резервная копия восстановлена.");}}catch(e){notify("Ошибка восстановления: "+e.message);}});
});
document.addEventListener("submit",e=>{
if(e.target.id==="gradeForm"){e.preventDefault();const ga=Number($("gradeA").value),gb=Number($("gradeB").value);if(!($("gradeA").value&&$("gradeB").value)||ga<2||ga>10||gb<2||gb>10){notify("Нужны две оценки от 2 до 10.");return;}commitRound(ga,gb);}
else if(e.target.dataset.form==="add-player"){e.preventDefault();const form=e.target;addPlayers(form.dataset.team,[form.elements.name.value],false);}
else if(e.target.id==="taskForm"){e.preventDefault();handleTaskEditor(e.target);}
});
for(const d of ["gradeDialog","profileDialog"]){$(d).addEventListener("click",e=>{if(e.target===$(d)){if(d==="gradeDialog")pendingWinner=null;$(d).close();}});}
render();
})();