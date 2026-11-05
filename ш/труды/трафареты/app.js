(function website(){
"use strict";
const root=document.getElementById("app"),id=document.body.dataset.page||"home",pre=document.body.dataset.base||"./";
const menus=[["home","","Обзор"],["school","school/","Урок 45 мин"],["technology","technology/","Технология"],["spray","spray/","Граффити"],["templates","templates/","Шаблоны"],["videos","videos/","Видео"],["materials","materials/","Материалы"],["safety","safety/","Безопасность"]];
const path=x=>pre+(menus.find(y=>y[0]===x)||menus[0])[1], asset=x=>pre+"assets/"+x;
const htmlEscape=s=>String(s).replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
const a=(label,url,cls="btn")=>`<a class="${cls}" href="${htmlEscape(url)}" ${url.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""}>${htmlEscape(label)}</a>`;
const steps=arr=>arr.map((x,i)=>`<div class="step"><b class="number">${i+1}</b><p>${x}</p></div>`).join("");
const table=(heads,rows)=>`<div class="tablewrap"><table><thead><tr>${heads.map(t=>`<th>${t}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(t=>`<td>${t}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const intro=(t,p)=>`<div class="intro"><h2>${t}</h2><p>${p}</p></div>`;
let data,stock={};try{stock=JSON.parse(localStorage.getItem("stencils.gp.stock")||"{}")}catch(_){}
const save=()=>{try{localStorage.setItem("stencils.gp.stock",JSON.stringify(stock))}catch(_){}};
const needed=x=>x.needs.map(k=>(data.materials.find(m=>m.id===k)||{}).name||k);
const missing=x=>x.needs.filter(k=>!stock[k]).map(k=>(data.materials.find(m=>m.id===k)||{}).name||k);
const section=(t,body)=>`<section class="section"><h3>${t}</h3>${body}</section>`;
function home(){
return intro("От бумаги до многоцветного граффити","Полный справочник на основе исследований: цветоделение, изготовление отдельных трафаретов, контрольные метки, работа губкой и аэрозолями, прямые ссылки и готовые шаблоны.")+
`<div class="grid two" style="margin-top:21px"><div class="panel" style="margin:0"><span class="kicker">Для 6 класса</span><h3>45 минут · 2 слоя</h3><p>Два бумажных трафарета, два цвета гуаши, поролон. Только безопасная техника в помещении.</p>${a("Открыть урок",path("school"),"btn primary")}</div><div class="panel" style="margin:0"><span class="kicker">Печатные шаблоны</span><h3>10 сюжетов · 20 масок</h3><p>Для каждого изображения по два листа А4 с общей системой меток, плюс цветной образец.</p>${a("Выбрать сюжет",path("templates"),"btn primary")}</div></div>`+
section("Разделы",`<div class="grid">${menus.slice(1).map((m,i)=>`<div class="card"><a class="tile cardbody" href="${path(m[0])}"><div class="kicker">0${i+1}</div><h3>${m[2]}</h3><p>${({school:"Этапы, время, оценивание и подготовка учителя.",technology:"Цветоделение, мостики, регистрация, способы резки.",spray:"Работа с аэрозолем: порядок, фиксация, расстояния, ошибки.",templates:"Печатные SVG, изображения, быстрый и подробный процесс.",videos:"YouTube, примеры и исследовательские источники.",materials:"Личный список инструментов и фильтрация по наличию.",safety:"Безопасность шестиклассников и профессиональные требования."})[m[0]]}</p><span class="small">Перейти →</span></a></div>`).join("")}</div>`)+
section("Пример двухцветной печати",`<div class="grid two"><div class="panel"><img src="${asset("robot-final.svg")}" alt="Робот, сложенный из двух цветовых масок" style="max-height:230px;width:100%;object-fit:contain"/><p class="muted small">Светлый корпус и отдельный тёмный слой с деталями.</p></div><div class="panel"><h3>Главное правило</h3>${steps(["Один цвет = отдельный лист с прорезями.","Все листы имеют одинаковые контрольные метки.","Следующий слой накладывается только после подсыхания предыдущего.","В результате получается единый многоцветный отпечаток."])}</div></div>`);
}
function school(){
const times=[["0–3","Введение","Показать готовый отпечаток и два трафарета"],["3–6","Демонстрация","Показать короткий фрагмент видео и совмещение"],["6–9","Инструктаж","Ножницы, гуашь, порядок на столе"],["9–13","Выбор","Выбрать шаблон и два цвета"],["13–22","Вырезание","Подготовить оба шаблона"],["22–28","Первый цвет","Закрепить и напечатать большой силуэт"],["28–32","Подсыхание","Подготовить второй лист"],["32–38","Второй цвет","Совместить кресты и напечатать детали"],["38–42","Оценка","Проверить результат"],["42–45","Уборка","Сдать материалы и очистить стол"]];
return intro("Урок труда в 6 классе · 45 минут","Два отдельных трафарета и две краски. Используется губка и водная гуашь. Контуры лучше подготовить заранее.")+
`<div class="notice good"><strong>Результат:</strong> один двухцветный рисунок А4 с совмещёнными слоями. Для сложных рисунков подготовку и печать разумно разделить на два урока.</div>`+
section("Очень кратко",`<div class="panel">${steps(["Вырезать два трафарета","Нанести цвет №1","Подсушить и совместить три метки","Нанести цвет №2 и снять шаблон"])}</div>`)+
section("Технологическая карта",table(["Минуты","Этап","Действие"],times))+
section("Подробно",`<div class="panel">${steps(["Выбрать рисунок из набора и определить цвета","Распечатать два листа с масштабом 100%","Вырезать крупные серые области на каждом листе","Закрепить лист-основу, затем трафарет №1","Тампонировать почти сухой губкой; не растирать краску","Снять первый лист и подсушить отпечаток","Совместить три контрольных креста трафарета №2","Закрепить и нанести второй цвет","Снять лист, подписать работу и убрать материалы"])}<div class="notice">Если первый слой ещё влажный, второй трафарет накладывать нельзя. Внутренние замкнутые вырезы предварительно делает учитель.</div></div>`)+
section("Что нужно",`<div class="grid two"><div class="panel"><h3>На одного ученика</h3><p>3 листа А4, ножницы, карандаш, плотная бумага, скотч, поролон, 2 цвета гуаши, салфетка.</p><p class="muted small">На 22 ученика — минимум 66 листов, плюс запас.</p>${a("Проверить наличие",path("materials"))}</div><div class="panel"><h3>Подготовка учителя</h3><p>Распечатать шаблоны, проверить метки и масштаб, подготовить трудно вырезаемые отверстия, защитить столы, выделить место для сушки.</p>${a("Шаблоны А4",path("templates"))}</div></div>`)+
section("Оценивание · 10 баллов",table(["Критерий","Баллы"],[["Два самостоятельных трафарета","2"],["Регистрация по меткам","2"],["Два цветовых слоя","2"],["Аккуратные края","2"],["Безопасность и порядок","2"]]));
}
function technology(){
const phases=[["1. Исходник","Собственный простой рисунок или фотография с правом использования; убрать фон и мелкие детали."],["2. Цветоделение","Упростить палитру до 2–4 цветов. Для каждого цвета создать отдельную маску одинакового размера."],["3. Перемычки","Внутренние части листа, которые иначе выпадут при вырезании, соединить с рамкой узкими мостиками."],["4. Регистрация","Добавить 3 одинаковых крестика на все листы вне рисунка. Не менять масштаб при печати."],["5. Изготовление","Вырезать отверстия в каждой маске. Сначала выполнить пробное совмещение без краски."],["6. Нанесение","Крупный светлый тон, подсыхание; следующий слой по меткам; детали и контроль результата. Порядок зависит от красок и композиции."]];
return intro("Технология многослойного трафарета","Multi-layer stencil art, color separation, stencil bridges, registration marks.")+
section("Подробные этапы",`<div class="panel">${phases.map(x=>`<p><strong>${x[0]}</strong><br/><span class="muted">${x[1]}</span></p>`).join("")}</div>`)+
section("Перемычки и контрольные метки",`<div class="grid two"><div class="panel"><h3>Перемычки (bridges)</h3><p>Например, центр буквы «О» выпадет после вырезания кольца. Оставьте два соединения; их можно перекрыть последующим слоем. Слишком тонкие соединения рвутся.</p></div><div class="panel"><h3>Совмещение (registration)</h3><p>Кресты в трёх одинаковых местах всех трафаретов. На основе отмечают их положение карандашом. Рядом можно разместить угловые упоры из малярного скотча.</p></div></div>`)+
section("Способы изготовления",table(["Способ","Плюсы","Ограничения"],[["От руки + ножницы","Доступно в школе","Сложные отверстия вырезать трудно"],["Принтер + ручная резка","Масштаб и метки совпадают","Дольше ручная резка"],["Плоттер","Точные повторяемые детали","Стоимость и подготовка файлов"],["Mylar и плоттер","Многоразовые маски","Сложнее ручная резка и очистка"]]))+
section("Советы",`<div class="panel">${steps(["Работать с 2–3 цветами, если опыта мало","Не оставлять тонких выпадющих островков","Печатать каждый лист в масштабе 100%","Оставлять небольшой нахлёст соседних цветовых областей","Проверять пробный отпечаток до чистовой работы"])}</div>`);
}
function spray(){
return intro("Граффити · spray paint stencil art","Технология аэрозольной печати для взрослых при организованной безопасной работе. В обычном школьном кабинете аэрозоли не применяют.")+
`<div class="notice"><strong>Для учеников шестого класса:</strong> использовать вместо баллончика гуашь с губкой. ${a("Меры безопасности",path("safety"))}</div>`+
section("Быстро",`<div class="panel">${steps(["Цветоделение и отдельная маска на каждый цвет","Вырезание мостиков и разметка трёх крестов","Крепление первой маски и тонкий проход краски","Высыхание, следующий трафарет по меткам, повторение"])}</div>`)+
section("Подробно",`<div class="panel">${steps(["Выбрать контрастный исходник, убрать сложный фон","В редакторе уменьшить число цветов и вывести отдельные трафареты","Вырезать слои вручную или на плоттере, сохранить перемычки","Сделать одинаковые метки и пробно совместить все листы","Выбрать законную площадку, защитить соседние поверхности, обеспечить подходящую вентиляцию и СИЗ","Закрепить первый лист, следовать инструкции баллончика; делать короткие тонкие проходы","Снять трафарет; дождаться требуемого высыхания","Совместить следующую маску, повторить для каждого цвета","После завершения очистить многоразовые трафареты по паспорту материала и убрать рабочее место"])}</div>`)+
section("Расстояние и предотвращение подтёков",table(["Источник","Расстояние","Примечание"],[["Stencil Stop","25–38 см","10–15 дюймов для их многослойных трафаретов"],["Montana STENCIL Spray","Около 15 см","Продуктовая инструкция может отличаться"],["Практическое правило","По инструкции своего баллончика","Проба на отдельной основе"]]))+
section("Частые ошибки",table(["Проблема","Причина","Исправление"],[["Размытый край","Трафарет отстаёт от основы","Закрепить, нанести тоньше"],["Смещение цвета","Нет регистрации","Три метки и упоры"],["Белые промежутки","Нет перекрытия слоёв","Небольшой нахлёст масок"],["Краска срывается","Недостаточно высохла","Выдержать сушку"],["Выпадают детали","Нет перемычек","Добавить мостики до резки"]]));
}
let catFilter="Все",diffFilter="Все",searchValue="",availableOnly=false,videoLang="Все",videoType="Все";
function templateCard(x){
const absent=missing(x);
return `<article class="card"><div class="preview"><img loading="lazy" src="${asset(x.id+"-final.svg")}" alt="Образец: ${htmlEscape(x.name)}"/></div><div class="cardbody"><div class="meta"><span class="pill ok">2 слоя</span><span class="pill">${x.difficulty}</span><span class="pill">${x.minutes} мин</span></div><h3>${x.name}</h3><p>${x.category}</p><p><span class="colordot" style="background:${x.colors[0]}"></span>Цвет 1 <span class="colordot" style="background:${x.colors[1]};margin-left:12px"></span>Цвет 2</p><p class="availability ${absent.length?"":"ok"}">${absent.length?"Не отмечены: "+htmlEscape(absent.join(", ")):"Все материалы отмечены"}</p><div class="actions">${a("Слой 1 · SVG",asset(x.id+"-1.svg"))}${a("Слой 2 · SVG",asset(x.id+"-2.svg"))}${a("Образец",asset(x.id+"-final.svg"))}</div><details><summary>Быстро / подробно</summary><p><strong>Быстро:</strong> цвет 1 → подсушить → регистрация → цвет 2.</p><ol>${x.quick.map(z=>`<li>${z}</li>`).join("")}</ol><p>Материалы: ${needed(x).join(", ")}. Печатать в масштабе 100%.</p></details></div></article>`;
}
function filterTemplates(){
const list=data.motifs.filter(x=>(catFilter==="Все"||x.category===catFilter)&&(diffFilter==="Все"||x.difficulty===diffFilter)&&(!searchValue||(`${x.name} ${x.category}`).toLowerCase().includes(searchValue))&&(!availableOnly||missing(x).length===0));
document.getElementById("shown").textContent=`Показано ${list.length} из ${data.motifs.length}`;
document.getElementById("templateList").innerHTML=list.length?list.map(templateCard).join(""):'<div class="empty">Ничего не найдено. Снимите фильтры или отметьте материалы в отдельном разделе.</div>';
}
function templates(){
return intro("Сюжеты и шаблоны А4","Десять собственных двухцветных изображений. На каждый — два отдельных SVG-трафарета с тремя одинаковыми контрольными крестами.")+
`<div class="notice good">Откройте оба слоя и распечатайте в масштабе <strong>100%</strong>. Серые фигуры вырезаются по контуру. Метки должны совпадать. Для сложных внутренних отверстий требуется предварительная подготовка учителем.</div>`+
section("Поиск и фильтр",`<div class="filters"><input type="search" id="q" placeholder="Найти: кот, сова, робот..." aria-label="Поиск"/><select id="category"><option>Все</option>${[...new Set(data.motifs.map(x=>x.category))].map(x=>`<option>${x}</option>`).join("")}</select><select id="difficulty"><option>Все</option><option>Легко</option><option>Средне</option></select><label><input id="available" type="checkbox"/> Только с имеющимися материалами</label></div><p class="muted small" id="shown"></p><div class="grid" id="templateList"></div>`);
}
function videoCard(x){
return `<div class="card video"><div class="play">▶</div><div><span class="pill">${x.lang}</span><span class="pill ok">${x.type}</span><h4>${htmlEscape(x.title)}</h4><p>${htmlEscape(x.description)}</p>${a("Открыть на YouTube ↗",x.url)}</div></div>`;
}
function filterVideos(){
const q=document.getElementById("vq").value.toLowerCase();
const list=data.videos.filter(x=>(videoLang==="Все"||x.lang===videoLang)&&(videoType==="Все"||x.type===videoType)&&(!q||(x.title+" "+x.description).toLowerCase().includes(q)));
document.getElementById("videosList").innerHTML=list.length?list.map(videoCard).join(""):'<div class="empty">Видео не найдены.</div>';
}
function videos(){
return intro("YouTube и примеры работ","Практические ссылки с указанием охвата. Некоторые ролики показывают только резку, только нанесение или однослойную печать.")+
section("Видеоуроки",`<div class="filters"><input id="vq" type="search" placeholder="Найти видео..."/><select id="lang"><option>Все</option><option>RU</option><option>EN</option></select><select id="kind"><option>Все</option>${[...new Set(data.videos.map(x=>x.type))].map(x=>`<option>${x}</option>`).join("")}</select></div><div class="grid" id="videosList"></div>`)+
section("Примеры реального stencil art",`<div class="grid">${data.examples.map((x,i)=>`<div class="card"><img class="preview" style="height:160px;width:100%;object-fit:contain" alt="Собственный учебный пример" src="${asset(data.motifs[i].id+"-final.svg")}"/><div class="cardbody"><h3>${x.title}</h3><p>${x.detail}</p>${a("Авторская работа ↗",x.url)}</div></div>`).join("")}</div><p class="muted small">Миниатюры здесь — наши учебные SVG, а не изображения чужих работ. Ссылка открывает оригинальный сайт правообладателя.</p>`)+
section("Библиография и методика",`<div class="panel sourcegroup">${data.references.map(x=>`<p><span class="pill">${x.type}</span> ${a(x.title,x.url)}</p>`).join("")}</div>`);
}
function materials(){
return intro("Наличие материалов и инструментов","Отметьте имеющееся. Выбор сохраняется только в localStorage этого браузера и влияет на фильтр доступных сюжетов.")+
`<div class="panel"><div class="filters"><span class="pill ok" id="counter"></span><button id="schoolSet" class="btn">Отметить школьный набор</button><button id="clearSet" class="btn">Сбросить</button></div>${[...new Set(data.materials.map(x=>x.group))].map(g=>`<h3>${g}</h3><div class="inputlist">${data.materials.filter(x=>x.group===g).map(x=>`<label class="checkitem"><input type="checkbox" data-stock="${x.id}" ${stock[x.id]?"checked":""}/>${x.name}</label>`).join("")}</div>`).join("")}</div>`+
section("Доступность по составу",`<div class="grid" id="stockProjects"></div>`)+
`<div class="notice">Наличие аэрозоля, респиратора и площадки по отдельности не является подтверждением безопасности. Для аэрозольных работ требуется оценка условий и инструкция конкретной краски.</div>`;
}
function safety(){
return intro("Безопасность в школе и при работе с аэрозолями","Разделение школьной гуашевой техники и профессиональной аэрозольной технологии.")+
`<div class="notice"><strong>В обычном школьном кабинете аэрозольные краски не применять.</strong> Для шестого класса сохраняем всю технологию совмещения слоёв, но используем гуашь и губку.</div>`+
section("На уроке",`<div class="panel">${steps(["Использовать ножницы, не оставлять их раскрытыми и передавать кольцами вперёд","Не выдавать детям макетные ножи без специального контроля; трудные внутренние вырезы готовит учитель","Закрыть столы бумагой, не размещать краски у розеток и ноутбуков","Не пить и не есть на рабочем месте, вымыть руки после урока","Убрать обрезки, губки, стаканы и салфетки"])}</div>`)+
section("Для взрослой аэрозольной практики",`<div class="panel">${steps(["Проверить разрешение владельца поверхности и местные правила","Изучить состав и паспорт безопасности выбранной краски","Обеспечить подходящую вентиляцию и отвод аэрозольных частиц и растворителей","Подобрать защиту глаз, кожи и органов дыхания с учётом конкретного вещества","Не работать рядом с огнём, искрами, горячими поверхностями","Защитить окружающие поверхности и исключить воздействие на посторонних","Правильно хранить краски и утилизировать отходы"])}</div>`)+
`<div class="notice"><strong>Важно:</strong> медицинская маска не заменяет респиратор с подходящими фильтрами. Само по себе открытое окно не гарантирует достаточную вентиляцию.</div>`+
section("Нормативные и технические источники",`<div class="panel">${data.references.filter(x=>x.type==="Безопасность").map(x=>`<p>${a(x.title,x.url)}</p>`).join("")}</div>`);
}
function updateMaterialSummary(){
document.getElementById("counter").textContent=`Отмечено: ${Object.values(stock).filter(Boolean).length} из ${data.materials.length}`;
document.getElementById("stockProjects").innerHTML=data.motifs.map(x=>`<div class="card cardbody"><h3>${x.name}</h3><p>${missing(x).length?"Не отмечены: "+missing(x).join(", "):"Все основные материалы отмечены"}</p>${a("Открыть задания",path("templates"))}</div>`).join("");
}
function init(){
document.getElementById("links").innerHTML=menus.map(m=>`<a class="tab ${m[0]===id?"active":""}" href="${path(m[0])}" ${m[0]===id?'aria-current="page"':""}>${m[2]}</a>`).join("");
const sections={home,school,technology,spray,templates,videos,materials,safety};
root.innerHTML=(sections[id]||home)();
if(id==="templates"){
document.getElementById("q").oninput=e=>{searchValue=e.target.value.toLowerCase();filterTemplates()};
document.getElementById("category").onchange=e=>{catFilter=e.target.value;filterTemplates()};
document.getElementById("difficulty").onchange=e=>{diffFilter=e.target.value;filterTemplates()};
document.getElementById("available").onchange=e=>{availableOnly=e.target.checked;filterTemplates()};
filterTemplates();
}
if(id==="videos"){
document.getElementById("vq").oninput=filterVideos;
document.getElementById("lang").onchange=e=>{videoLang=e.target.value;filterVideos()};
document.getElementById("kind").onchange=e=>{videoType=e.target.value;filterVideos()};
filterVideos();
}
if(id==="materials"){
document.getElementById("schoolSet").onclick=()=>{["paper","card","scissors","pencil","tape","sponge","gouache"].forEach(x=>stock[x]=true);save();init()};
document.getElementById("clearSet").onclick=()=>{stock={};save();init()};
document.querySelectorAll("[data-stock]").forEach(el=>el.addEventListener("change",e=>{stock[e.target.dataset.stock]=e.target.checked;save();updateMaterialSummary()}));
updateMaterialSummary();
}
}
fetch(pre+"catalog.json").then(x=>{if(!x.ok)throw Error("Ошибка загрузки данных");return x.json()}).then(x=>{data=x;init()}).catch(e=>{root.innerHTML=`<div class="notice">Не удалось загрузить каталог: ${htmlEscape(e.message)}. Проверьте подключение и обновите страницу.</div>`});
})();