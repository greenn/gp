(function () {
 "use strict";
 const $=id=>document.getElementById(id);
 const sidebar=$("sidebar"),scrim=$("scrim"),toggle=$("menu-toggle");
 const guide=$("guide-search-input"),status=$("guide-search-status");
 const bar=$("focus-bar"),crumb=$("focus-breadcrumb"),empty=$("guide-search-empty");
 const sections=[...document.querySelectorAll("main.doc > section[id]")];
 const navs=[...document.querySelectorAll(".sidebar .nav-item")];
 const groups=[...document.querySelectorAll(".sidebar .side-group")];
 const names={overview:"Обзор",start:"Как использовать",real:"REAL 1–10",mode12:"Режим 12",mode22:"Режим 22",mode32:"Режим 32",mode55:"Режим 55 · Живое фото",mode77:"Режим 77 · Одежда и сцена",next:"22 next",new:"NEW · изоляция",clean:"clean",commands:"Все команды",faq:"Вопросы и ответы"};
 const aliases={overview:"начало главная т2ф t2f изображения",start:"начало вызов режим использовать @t2f фото",real:"real up down max reset status seed реализм 1 10 ступени уровень",mode12:"12 photo 3d ps1 ps2 ps3 ps4 ps5 aaaaa voxel retro фото в 3д",mode22:"22 pose позы эмоции ракурс cam лицо одежда keep change s r fashion visual novel",mode32:"32 параметры p01 p32 камера свет материал объектив iso photorealism",mode55:"55 пленка film 50 60 70 80 90 00 10 20 десятилетие живое фото естественное воплощение grain freedom keep",mode77:"77 школа по умолчанию face outfit scene лицо одежда локация лагерь лето school camp summer lookbook model keep face match outfit",next:"22 next s m h d w mo y секунда минута час день неделя месяц год раньше позже время",new:"new 1 2 3 независимая изоляция чистый контекст генерация отдельный чат fresh independent",clean:"clean сброс очистить контекст новая картинка",commands:"команды быстрые синтаксис каталог копирование",faq:"вопросы ответы ограничения"};
 let current="landing";
 function norm(x){return String(x||"").toLocaleLowerCase("ru").replace(/ё/g,"е").replace(/\s+/g," ").trim();}
 function navClose(){sidebar.classList.remove("open");scrim.classList.remove("show");toggle?.setAttribute("aria-expanded","false");}
 toggle?.addEventListener("click",()=>{const open=sidebar.classList.toggle("open");scrim.classList.toggle("show",open);toggle.setAttribute("aria-expanded",String(open))});
 scrim?.addEventListener("click",navClose);
 function moveTo(element){if(!element)return;requestAnimationFrame(()=>element.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));}
 function renderSections(ids,searching,scroll){
  const shown=new Set(ids);
  sections.forEach(s=>s.hidden=!shown.has(s.id));
  navs.forEach(a=>{const id=a.getAttribute("href").slice(1);a.hidden=searching&&!shown.has(id);a.classList.toggle("active",current===id || (current==="landing"&&id==="overview"));});
  groups.forEach(g=>{g.hidden=searching&&g.querySelector(".nav-item")&&![...g.querySelectorAll(".nav-item")].some(a=>!a.hidden)});
  const focus=current!=="landing";
  document.body.classList.toggle("guide-filtered",focus);
  bar.hidden=!focus;
  empty.hidden=ids.length>0;
  $("guide-search-clear").hidden=!guide.value;
  status.textContent=!focus?"Показаны все разделы":ids.length===0?"Ничего не найдено":ids.length===1?"Показан 1 раздел":"Разделов: "+ids.length;
  crumb.textContent=names[current]||(searching?"Поиск по справке":"");
  if(scroll)moveTo(ids.length?sections.find(s=>shown.has(s.id)):empty);
 }
 function landing(scroll=true,update=true){
  current="landing";guide.value="";
  renderSections(sections.map(s=>s.id),false,scroll);navClose();
  if(update&&location.hash)history.pushState(null,"",location.pathname+location.search);
 }
 function focus(id,scroll=true,update=true){
  if(!names[id]||id==="overview")return landing(scroll,update);
  current=id;guide.value="";renderSections([id],false,scroll);navClose();
  if(update&&location.hash!=="#"+id)history.pushState({page:id},"","#"+id);
 }
 function exact(q){
  q=q.replace(/^@t2f\s*/,"");
  if(/^(new(?:\s|$)|изоляц|независим)/.test(q))return "new";
  if(/^(77|школ|лагер|outfit|одежд|lookbook|каталог|camp|school|съемк|съёмк)/.test(q))return "mode77";
  if(/^(55|пленк|плёнк|свободн|воплощен)/.test(q))return "mode55";
  if(/^(22\s*next|next|время|секунд|минут|час|год|временн)/.test(q))return "next";
  if(/^(real|реализм|уровень|качество|up|down)/.test(q))return "real";
  if(/^(12|ps1|ps2|ps3|ps4|ps5|n64|aaaa|3d|3д)/.test(q))return "mode12";
  if(/^(32|iso|p0[1-9]|p[12][0-9]|p3[012])/.test(q))return "mode32";
  if(/^(22|pose|cam|keep|change|поза|ракурс)/.test(q))return "mode22";
  if(/^(clean|сброс)/.test(q))return "clean";
  if(/^(команд|catalog|commands)/.test(q))return "commands";
  if(/^(вопрос|faq)/.test(q))return "faq";
  return null;
 }
 function searchGuide(){
  const q=norm(guide.value);
  if(!q){landing(false);return;}
  current="search";
  const matched=exact(q);
  const result=sections.filter(s=>matched?s.id===matched:norm((aliases[s.id]||"")+" "+s.textContent).includes(q)).map(s=>s.id);
  renderSections(result,true,false);navClose();
  if(result.length)moveTo(sections.find(s=>s.id===result[0]));
 }
 guide.addEventListener("input",searchGuide);
 $("guide-search-clear").addEventListener("click",()=>{landing();guide.focus()});
 $("guide-search-reset").addEventListener("click",()=>{landing();guide.focus()});
 $("back-to-landing").addEventListener("click",()=>landing());
 document.querySelectorAll("[data-focus]").forEach(b=>b.addEventListener("click",()=>focus(b.dataset.focus)));
 document.querySelectorAll('.nav-item[href^="#"],.brand[href^="#"],.hero-actions a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();focus(a.getAttribute("href").slice(1))}));
 function readHash(){const p=decodeURIComponent(location.hash.slice(1));if(names[p])focus(p,false,false);else landing(false,false);}
 addEventListener("popstate",readHash);addEventListener("hashchange",readHash);readHash();
 let timer;
 const toast=$("toast");
 function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove("show"),2100);}
 async function copy(value){
  try{
   if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);}
   else{const el=document.createElement("textarea");el.value=value;el.style.position="fixed";el.style.left="-9999px";document.body.appendChild(el);el.select();if(!document.execCommand("copy"))throw Error("blocked");el.remove();}
   notify("Команда скопирована");
  }catch(e){notify("Не удалось скопировать. Выделите команду вручную.");}
 }
 document.addEventListener("click",e=>{
  const b=e.target.closest("button[data-copy]");
  if(!b)return;
  copy(b.getAttribute("data-copy")||"");
 });
 const items=[
 ["general","@T2F","Один максимально реалистичный кадр исходного 3D-рендера","основная команда фото"],
 ["general","@T2F clean","Сбросить настройки и начать обработку нового изображения","сброс контекста новый старт"],
 ["new","NEW","NEW 1: независимая генерация по текущему сообщению","новый кадр"],
 ["new","NEW 1","Не использовать предыдущие изображения и настройки","изоляция"],
 ["new","NEW 2","Строго использовать только новые однозначные источники","источники"],
 ["new","NEW 3","Подготовить самостоятельный промпт для нового чата","отдельный чат"],
 ["new","NEW 1 77 studio full body","Новый студийный кадр с отдельными референсами","фотосъёмка"],
 ["new","NEW 2 77 FACE=A OUTFIT=B SCENE=C","Взять только явно новые референсы A/B/C","одежда локация"],
 ["new","NEW 2 красный автомобиль на снегу","Создать новый кадр по тексту, без прошлого изображения","генерация"],
 ["new","NEW 3 22 frontal portrait 85mm","Подготовить самостоятельный промпт для нового чата","портрет"],
 ["real","REAL 1","Установить первую ступень фотореализма","начальный уровень"],
 ["real","REAL 5","Установить уровень 5/10","кожа"],
 ["real","REAL 10","Установить максимальный уровень 10/10","максимальный реализм"],
 ["real","REAL UP","Увеличить уровень на единицу","real +1"],
 ["real","REAL UP 0","Увеличить на единицу; 0 — специальное обозначение шага +1","real вверх"],
 ["real","REAL UP 2","Увеличить на две ступени","real повысить"],
 ["real","REAL +2","Короткая форма повышения на две ступени","up"],
 ["real","REAL DOWN","Снизить на одну ступень","уменьшить"],
 ["real","REAL DOWN 2","Снизить на две ступени","понизить"],
 ["real","REAL -2","Короткая форма снижения на две ступени","down"],
 ["real","REAL MAX","Установить 10/10","максимум"],
 ["real","REAL STATUS","Показать уровень без генерации","статус"],
 ["real","REAL RESET","Вернуть счётчик REAL к 1 без генерации","сброс уровня"],
 ["real","REAL SEED STATUS","Показать seed только при наличии достоверных данных","метаданные"],
 ["real","REAL SEED SAVE","Отметить подтверждённый seed в текущей беседе","сохранить seed"],
 ["real","REAL SEED USE","Применить seed, только если API действительно его поддерживает","повторить изображение"],
 ["real","REAL SEED CLEAR","Убрать отметку сохранённого seed","семя"],
 ["12","12","Фото → одно 3D-изображение AAAAA по умолчанию","3d cgi"],
 ["12","12 {}","То же: один кадр AAAAA","пустые параметры"],
 ["12","12 {PS1}","Ретро low-poly графика PlayStation 1","старые игры"],
 ["12","12 {N64}","Графика в стиле Nintendo 64","ретро"],
 ["12","12 {PS2, ночь, туман}","3D-игра начала 2000-х с ночным светом","ночь"],
 ["12","12 {PS3, SSAO, rainy night}","Игровой стиль конца 2000-х","дождь"],
 ["12","12 {PS5, PBR, 16:9}","Современный игровой CGI","pbr"],
 ["12","12 {AAAAA, PBR, 50mm}","Максимально подробный CGI","качество"],
 ["12","12 {VOXEL}","Стилизовать как воксельную сцену","кубики"],
 ["12","12 {LOW_POLY}","Упрощённые плоские полигоны","low poly"],
 ["22","22 фото","Создать фотографию из исходного 3D-рендера","фото"],
 ["22","22 p","Только промпт, без картинки","текст"],
 ["22","22 r 2","Сдвинуть степень натурализации, а не глобальный REAL","реализм r"],
 ["22","22 фото pose three-quarter","Поворот три четверти","ракурс поза"],
 ["22","22 фото pose over-shoulder","Взгляд через плечо","поворот"],
 ["22","22 фото pose walking pose","Обычный шаг","ходьба"],
 ["22","22 фото pose hands on hips","Руки на бёдрах","руки"],
 ["22","22 фото cam 50","Оптика 50 мм","объектив"],
 ["22","22 фото cam 85","Портретная оптика 85 мм","камера"],
 ["22","22 фото keep face keep outfit","Сохранить лицо и одежду","сходство"],
 ["22","22 фото change pose keep face","Разрешить новую позу при сохранении лица","изменение"],
 ["22","22 фото S2 r 2 raw 1","Нейтральный кадр, умеренная натурализация, натуральные фактуры","безопасность реализм"],
 ["22","22 фото outpaint 3","Расширить границы кадра","достроить"],
 ["22","22 фото hands","Исправить кисти рук","пальцы"],
 ["22","22 фото legs","Достроить ноги и обувь","полный рост"],
 ["22","22 фото clean 2","Уменьшить артефакты фото; не сбрасывает сеанс","исправление"],
 ["32","32 @BASE_NEUTRAL {}","Нейтральный фотореализм","пресет"],
 ["32","32 @PORTRAIT_EDITORIAL {focal_mm=85}","Портретная съёмка 85 мм","портрет"],
 ["32","32 @SMARTPHONE_CASUAL {}","Повседневный снимок на смартфон","камера"],
 ["32","32 @NIGHT_URBAN {}","Ночная городская съёмка","ночь"],
 ["32","32 @PRODUCT_STUDIO {}","Студийное фото предмета","предмет"],
 ["55","55","Натуральное фото-воплощение вместо точного копирования","свободная фотография"],
 ["55","55 плёнка","Правдоподобная аналоговая фотография","35 мм film"],
 ["55","55 50","Фотостиль 1950-х","ретро"],
 ["55","55 60","Фотостиль 1960-х","ретро"],
 ["55","55 70","Фотостиль 1970-х","эпоха"],
 ["55","55 80","Фотостиль 1980-х","эпоха"],
 ["55","55 90","Фотостиль 1990-х","девяностые"],
 ["55","55 00","Фотостиль 2000-х","нулевые"],
 ["55","55 10","Фотостиль 2010-х","десятые"],
 ["55","55 20","Фотостиль 2020-х","современное"],
 ["55","55 90 плёнка","Девяностые на плёночном фото","film"],
 ["55","55 80 вспышка","Восьмидесятые с прямой накамерной вспышкой","flash"],
 ["55","55 00 мыльница","Повседневная цифровая компактная камера 2000-х","цифра"],
 ["55","55 00 мыльница вспышка","Типичное домашнее фото начала 2000-х","flash"],
 ["55","55 70 чб окно","Чёрно-белое фото 1970-х при оконном свете","монохром"],
 ["55","55 90 плёнка grain 2 freedom 4","Плёночный снимок 90-х с умеренным зерном и свободной позой","grain"],
 ["55","55 90 плёнка keep face keep age","Стилистика 1990-х с сохранением узнаваемого лица и возраста","сходство"],
 ["55","55 80 плёнка grain 2 freedom 5","Максимально естественное переосмысление референса","freedom"],
 ["55","55 p","Выдать только текст промпта, не генерировать фото","текст"],
 ["55","55 help","Справка и перечень пресетов","помощь"],
 ["77","77","Школа по умолчанию, создать модельную фотосъёмку по лицу","лицо одежда школа"],
 ["77","77 школа","Школьный lookbook без дополнительной настройки","школа"],
 ["77","77 лагерь","Школьная фотосъёмка для лагеря","camp"],
 ["77","77 лагерь лето full body","Летний лагерный образ в полный рост","лето"],
 ["77","77 лето park","Летняя одежда в парке, школьный контекст","лето парк"],
 ["77","77 keep face match outfit nature","Лицо A, комплект B и природная сцена","сохранить лицо"],
 ["77","77 catalog face=A outfit=B scene=C","Три размеченных референса, одно фото","лицо одежда локация"],
 ["77","77 lookbook match outfit full body","Целостная модельная съёмка комплекта одежды","каталог"],
 ["77","77 sportswear schoolyard soft light","Школьная спортивная форма, мягкий свет","спорт"],
 ["77","77 summer camp park sunny","Летняя лагерная сцена на природе","кампания"],
 ["77","77 keep hair keep age half body","Сохранение причёски и возраста, съёмка по пояс","портрет"],
 ["77","77 catalog studio clean background","Студийная каталожная съёмка для школьных задач","студия"],
 ["77","77 p лагерь лето","Готовый текст промпта без генерации","промпт"],
 ["77","77 help","Показать синтаксис и пресеты 77","справка"],
 ["next","22 next","Следующая секунда, продолжение движения","время секунда"],
 ["next","22 next 5s","Через пять секунд","вперёд"],
 ["next","22 next -s","За секунду до кадра","назад"],
 ["next","22 next -30s","Тридцать секунд назад","назад"],
 ["next","22 next m","Через минуту","минуты"],
 ["next","22 next -m","Минутой ранее","назад"],
 ["next","22 next h","Час спустя, возможный новый этап","часы"],
 ["next","22 next -h","Предыдущий час","ранее"],
 ["next","22 next d","Следующий день","дни"],
 ["next","22 next w","Через неделю","недели"],
 ["next","22 next mo","Через месяц, mo не m","месяцы"],
 ["next","22 next y","Через год: чуть старше, прежнее место по умолчанию","возраст"],
 ["next","22 next -y","Год назад: немного моложе","возраст назад"]
 ];
 const list=$("command-list"),search=$("command-search"),count=$("search-count"),noItems=$("commands-empty"),filters=[...document.querySelectorAll(".filter[data-filter]")];
 let filter="all";
 function updateList(){
  const q=norm(search.value),selected=items.filter(([group,cmd,desc,tags])=>(filter==="all"||group===filter)&&norm(cmd+" "+desc+" "+tags).includes(q));
  const fragment=document.createDocumentFragment();
  for(const [group,cmd,desc] of selected){
   const row=document.createElement("div");row.className="command-row";row.dataset.group=group;
   const code=document.createElement("code");code.className="syntax";code.textContent=cmd;
   const label=document.createElement("span");label.className="desc";label.textContent=desc;
   const btn=document.createElement("button");btn.type="button";btn.className="copy";btn.setAttribute("data-copy",cmd);btn.setAttribute("aria-label","Скопировать "+cmd);btn.textContent="Копировать";
   row.append(code,label,btn);fragment.appendChild(row);
  }
  list.replaceChildren(fragment);
  count.textContent="Найдено команд: "+selected.length+" из "+items.length;
  noItems.classList.toggle("visible",selected.length===0);
  filters.forEach(b=>{const on=b.dataset.filter===filter;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});
 }
 search.addEventListener("input",updateList);
 filters.forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;updateList();}));
 updateList();
 function buildNext(){
  const val=Number($("next-number").value);
  const n=Number.isFinite(val)&&val>=0&&val<=1000000?val:1;
  const u=$("next-unit").value,minus=$("next-direction").value==="-";
  const token=n===0?"0s":(minus?"-":"")+(n===1?"":String(n))+u;
  const raw=n===1&&!minus&&u==="s"?"22 next":"22 next "+token;
  const extra=$("next-extra").value.replace(/\s+/g," ").trim();
  const out=raw+(extra?" "+extra:"");
  $("next-built").textContent=out;$("next-copy").setAttribute("data-copy",out);
 }
 ["next-number","next-unit","next-direction","next-extra"].forEach(id=>$(id).addEventListener("input",buildNext));
 buildNext();

 // T2F 0.10.1: NEW command builder; does not call any image service.
 function buildNew(){
  const isolation=$("new-isolation").value;
  const mode=$("new-mode").value;
  const details=$("new-details").value.replace(/\s+/g," ").trim();
  const command=["NEW",isolation,mode,details].filter(Boolean).join(" ");
  $("new-built").textContent=command;
  $("new-copy").dataset.copy=command;
 }
 ["new-isolation","new-mode","new-details"].forEach(id=>$(id).addEventListener("input",buildNew));
 buildNew();

 // T2F 55: builder for combining natural-photo presets. Uses only local DOM state.
 const fiftyIds=["f55-era","f55-medium","f55-stock","f55-light","f55-genre","f55-ratio","f55-grain","f55-freedom","f55-keep-face","f55-keep-age","f55-keep-outfit","f55-prompt","f55-extra"];
 function build55(){
  const val=id=>$(id).value;
  const flags=[val("f55-era"),val("f55-medium"),val("f55-stock"),val("f55-light"),val("f55-genre"),val("f55-ratio")].filter(Boolean);
  if($("f55-grain").value!=="0")flags.push("grain",$("f55-grain").value);
  if($("f55-freedom").value!=="4")flags.push("freedom",$("f55-freedom").value);
  if($("f55-keep-face").checked)flags.push("keep face");
  if($("f55-keep-age").checked)flags.push("keep age");
  if($("f55-keep-outfit").checked)flags.push("keep outfit");
  const extra=val("f55-extra").replace(/\s+/g," ").trim();
  const prompt=$("f55-prompt").checked?"p":null;
  const cmd=["55",prompt,...flags,extra].filter(Boolean).join(" ");
  $("f55-result").textContent=cmd;
  $("f55-copy").dataset.copy=cmd;
  $("f55-grain-value").textContent=val("f55-grain");
  $("f55-freedom-value").textContent=val("f55-freedom");
 }
 fiftyIds.forEach(id=>$(id)?.addEventListener("input",build55));
 build55();

 document.addEventListener("keydown",e=>{
  const tag=document.activeElement?.tagName||"";
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();guide.focus();}
  else if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(tag)){e.preventDefault();guide.focus();}
  else if(e.key==="Escape"){
   if(sidebar.classList.contains("open"))navClose();
   else if(document.activeElement===guide){if(guide.value)landing(false);guide.blur();}
   else if(document.activeElement===search){search.value="";updateList();search.blur();}
  }
 });
})();