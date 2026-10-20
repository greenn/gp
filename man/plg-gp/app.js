
(function(){
"use strict";
const doc=document;
const sidebar=doc.querySelector("#sidebar");
const scrim=doc.querySelector("#scrim");
const toggle=doc.querySelector("#menu-toggle");
const closeNav=()=>{sidebar.classList.remove("open");scrim.classList.remove("show");toggle?.setAttribute("aria-expanded","false")};
toggle?.addEventListener("click",()=>{const open=sidebar.classList.toggle("open");scrim.classList.toggle("show",open);toggle.setAttribute("aria-expanded",String(open))});
scrim?.addEventListener("click",closeNav);
doc.querySelectorAll(".nav-item").forEach(link=>link.addEventListener("click",closeNav));


const guideInput=doc.getElementById("guide-search-input");
const guideStatus=doc.getElementById("guide-search-status");
const guideClear=doc.getElementById("guide-search-clear");
const guideReset=doc.getElementById("guide-search-reset");
const guideEmpty=doc.getElementById("guide-search-empty");
const guideSections=[...doc.querySelectorAll("main.doc > section[id]")];
const guideLinks=[...doc.querySelectorAll('.sidebar a[href^="#"]')];
const guideGroups=[...doc.querySelectorAll(".sidebar .side-group")];
const backBar=doc.getElementById("focus-bar");
const backButton=doc.getElementById("back-to-landing");
const breadcrumb=doc.getElementById("focus-breadcrumb");
const guideAliases={
 overview:"начало home overview главная обзор",
 vns:"vns collect фото изображения картинки генерации промпты",
 drive:"drive google облако папки cur cur+ сохранение",
 archive:"drive-log drive-all drive-txt log журнал история архив zip экспорт переписка вложения",
 doc:"doc docs google документы вкладки pdf docx deep research file all",
 io:"io github github-pages публикация сайт страница web",
  upd:"upd update обновить обновление исправить изменить страница подпуть неполное название ключ существующая публикация",
 commands:"commands команды справочник каталог",
 builder:"builder конструктор генератор",
 faq:"faq вопросы ответы ограничения помощь"
};
const topicNames={overview:"Начало",vns:"VNS",drive:"Drive",archive:"История и архив",doc:"Google Docs",io:"IO",upd:"UPD · Обновить страницу",commands:"Все команды",builder:"Конструктор",faq:"Вопросы и ответы"};
let pageMode="landing";
function normalQuery(value){return String(value).toLocaleLowerCase("ru").replace(/ё/g,"е").trim().replace(/\s+/g," ")}
function exactGuideTopic(value){
 const q=normalQuery(value).replace(/^@gp\s+/,"");
 if(/^(drive-(log|txt|all))([\s-]|$)/.test(q) || /^(лог|архив|журнал|история|zip)(\s|$)/.test(q))return "archive";
 if(/^(doc|docs|вкладк|документ)(\s|$)/.test(q))return "doc";
 if(/^(upd|update|обнов|изменить|правка)(\s|$)/.test(q))return "upd";
  if(/^(io|github|публикац|сайт)(\s|$)/.test(q))return "io";
 if(/^(vns|collect|фото|изображения|картинки)(\s|$)/.test(q))return "vns";
 if(/^(drive|google|облако)(\s|$)/.test(q))return "drive";
 if(/^(commands|команды|справочник)(\s|$)/.test(q))return "commands";
 if(/^(builder|конструктор)(\s|$)/.test(q))return "builder";
 if(/^(faq|вопросы)(\s|$)/.test(q))return "faq";
 if(/^(overview|начало|главная)(\s|$)/.test(q))return "overview";
 return null;
}
const scrollBehavior=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth";
function scrollToElement(element,smooth){
 if(!element)return;
 window.requestAnimationFrame(()=>element.scrollIntoView({block:"start",behavior:smooth?scrollBehavior():"instant"}));
}
function updateView(visible,opts={}){
 const active=new Set(visible);
 for(const section of guideSections)section.hidden=!active.has(section.id);
 // The sidebar remains a usable menu in focused mode; search narrows it only while typing.
 for(const link of guideLinks){
  const id=decodeURIComponent(link.getAttribute("href").slice(1));
  link.hidden=Boolean(opts.searching)&&!active.has(id);
  link.classList.toggle("active",opts.selected===id);
  if(link.classList.contains("folder"))link.classList.toggle("selected",opts.selected===id);
 }
 for(const group of guideGroups){
  group.hidden=Boolean(opts.searching)&&![...group.querySelectorAll('a[href^="#"]')].some(link=>!link.hidden);
 }
 const narrowed=Boolean(opts.searching)||pageMode!=="landing";
 doc.body.classList.toggle("guide-filtered",narrowed);
 guideClear.hidden=!guideInput?.value;
 backBar.hidden=!narrowed;
 guideEmpty.hidden=active.size>0;
 if(guideStatus)guideStatus.textContent=narrowed?(active.size===0?"Ничего не найдено":active.size===1?"Показан 1 раздел":"Разделов: "+active.size):"Показаны все разделы";
 if(breadcrumb)breadcrumb.textContent=opts.selected?topicNames[opts.selected]||opts.selected:opts.searching?"Поиск по справке":"";
 if(opts.scroll)scrollToElement(active.size?guideSections.find(s=>active.has(s.id)):guideEmpty,opts.smooth);
}
function setLandingMode(scroll=true,updateUrl=true){
 pageMode="landing";
 if(guideInput)guideInput.value="";
 updateView(guideSections.map(s=>s.id),{selected:"overview",scroll,smooth:true});
 if(updateUrl&&window.location.hash)window.history.pushState(null,"",window.location.pathname+window.location.search);
 closeNav();
}
function focusSection(id,scroll=true,updateUrl=true){
 if(!topicNames[id])return setLandingMode(scroll,updateUrl);
 if(id==="overview")return setLandingMode(scroll,updateUrl);
 pageMode=id;
 if(guideInput)guideInput.value="";
 updateView([id],{selected:id,scroll,smooth:true});
 if(updateUrl&&window.location.hash!=="#"+id)window.history.pushState({focus:id},"","#"+id);
 closeNav();
}
function applyGuideSearch(scroll=true){
 const query=normalQuery(guideInput?.value||"");
 if(!query){setLandingMode(scroll);return;}
 pageMode="search";
 const topic=exactGuideTopic(query);
 const hits=guideSections.filter(section=>topic?section.id===topic:normalQuery((guideAliases[section.id]||"")+" "+section.textContent).includes(query));
 updateView(hits.map(s=>s.id),{searching:true,selected:hits.length===1?hits[0].id:null,scroll,smooth:false});
 closeNav();
}
function clearGuide(){setLandingMode(true);guideInput?.focus()}
guideInput?.addEventListener("input",()=>applyGuideSearch(true));
guideClear?.addEventListener("click",clearGuide);
guideReset?.addEventListener("click",clearGuide);
backButton?.addEventListener("click",()=>setLandingMode(true));
doc.querySelectorAll("[data-focus]").forEach(button=>button.addEventListener("click",()=>focusSection(button.dataset.focus)));
doc.querySelectorAll('.sidebar a[href^="#"], .brand[href^="#"], .hero-actions a[href^="#"]').forEach(link=>{
 link.addEventListener("click",event=>{
  const id=decodeURIComponent(link.getAttribute("href").slice(1));
  if(!topicNames[id])return;
  event.preventDefault();
  focusSection(id);
 });
});
window.addEventListener("popstate",()=>{
 const id=decodeURIComponent(window.location.hash.slice(1));
 if(id&&topicNames[id]&&id!=="overview")focusSection(id,true,false);
 else setLandingMode(true,false);
});
window.addEventListener("hashchange",()=>{
 const id=decodeURIComponent(window.location.hash.slice(1));
 if(id&&topicNames[id]&&id!=="overview")focusSection(id,true,false);
 else setLandingMode(true,false);
});
const initial=decodeURIComponent(window.location.hash.slice(1));
if(initial&&topicNames[initial]&&initial!=="overview")focusSection(initial,false,false);
else setLandingMode(false,false);

let toastTimer;
const toast=doc.getElementById("toast");
function notify(msg){if(!toast)return;toast.textContent=msg;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
async function copyText(s){
 try{
  if(navigator.clipboard && window.isSecureContext)await navigator.clipboard.writeText(s);
  else{
   const tmp=doc.createElement("textarea");tmp.value=s;tmp.setAttribute("readonly","");
   tmp.style.position="fixed";tmp.style.left="-9999px";doc.body.appendChild(tmp);
   tmp.select();const ok=doc.execCommand("copy");tmp.remove();if(!ok)throw new Error("copy blocked");
  }
  notify("Команда скопирована");return true;
 }catch(err){notify("Скопируйте команду вручную");return false}
}
doc.addEventListener("click",async e=>{
 const button=e.target.closest("[data-copy]");
 if(!button)return;
 const value=button.getAttribute("data-copy") || doc.querySelector(button.getAttribute("data-copy-target")||"#__none__")?.textContent||"";
 if(!value)return;
 const ok=await copyText(value);
 if(ok){button.classList.add("done");setTimeout(()=>button.classList.remove("done"),1500)}
});
const search=doc.getElementById("command-search");
const rows=[...doc.querySelectorAll(".command-row")];
const status=doc.getElementById("search-count");
const empty=doc.getElementById("empty-state");
const filters=[...doc.querySelectorAll(".filter[data-filter]")];
let activeFilter="all";
function clean(value){return value.toLocaleLowerCase("ru").replace(/ё/g,"е").trim()}
function render(){
 const q=clean(search?.value||"");let count=0;
 for(const row of rows){
  const group=row.dataset.group||"",matched=(activeFilter==="all"||activeFilter===group)&&clean(row.textContent+" "+(row.dataset.keywords||"")).includes(q);
  row.hidden=!matched;if(matched)count++;
 }
 if(status)status.textContent="Найдено команд: "+count+" из "+rows.length;
 empty?.classList.toggle("visible",count===0);
 for(const btn of filters){const sel=btn.dataset.filter===activeFilter;btn.classList.toggle("active",sel);btn.setAttribute("aria-pressed",String(sel))}
}
search?.addEventListener("input",render);
for(const f of filters)f.addEventListener("click",()=>{activeFilter=f.dataset.filter;render()});
render();
doc.addEventListener("keydown",e=>{
 const k=e.key.toLowerCase();
 if((e.ctrlKey||e.metaKey)&&k==="k"){e.preventDefault();guideInput?.focus();guideInput?.scrollIntoView({behavior:"smooth",block:"center"})}
 if(e.key==="/" && !/INPUT|TEXTAREA|SELECT/.test(doc.activeElement?.tagName||"")){e.preventDefault();guideInput?.focus();guideInput?.scrollIntoView({behavior:"smooth",block:"center"})}
 if(e.key==="Escape"){if(sidebar.classList.contains("open"))closeNav();else if(doc.activeElement===guideInput){if(guideInput.value)clearGuide();else if(pageMode!=="landing")setLandingMode(true);guideInput.blur()}else if(doc.activeElement===search){search.value="";render();search.blur()}}
});
const select=doc.getElementById("build-command");
const path=doc.getElementById("build-path");
const date=doc.getElementById("build-date");
const output=doc.getElementById("built-command");
const copyBuild=doc.getElementById("copy-built");
const builderHint=doc.getElementById("builder-hint");
const docTitle=doc.getElementById("build-tab-title");
const docMode=doc.getElementById("build-doc-mode");
const docTitleWrap=doc.getElementById("doc-builder-title-wrap");
const docModeWrap=doc.getElementById("doc-builder-mode-wrap");
const dateWrap=doc.getElementById("build-date-wrap");
const labels={
 "drive":"Сохранение результатов задачи в Drive",
 "drive-all":"Все доступные файлы",
 "drive-all-gpt":"Файлы, созданные GPT",
 "drive-log":"ZIP истории + Google Drive",
 "drive-log-gpt":"ZIP сообщений и файлов GPT",
 "drive-log-my":"ZIP сообщений и файлов пользователя",
 "drive-txt":"Только тексты GPT",
 "drive-txt-all":"Тексты обеих сторон",
 "drive-txt-my":"Только тексты пользователя",
 "vns-drive":"Фото, MD, JSON, ZIP и Google Drive",
 "vns-next-drive":"Только новые генерации + Drive",
 "doc-tab":"Добавить новую вкладку в существующий Google Документ",
 "io":"Публикация страницы на GitHub Pages",
 "io-ds":"Интерактивная страница исследования",
  "upd":"Обновить существующую опубликованную страницу по ключу или части пути"
};
function build(){
 if(!select||!path||!date||!output)return;
 const kind=select.value;
 const isVns=kind.startsWith("vns-");
 const isIo=kind.startsWith("io");
 const isDoc=kind==="doc-tab";
  const isUpd=kind==="upd";
 const supportDate=!isVns&&!isIo&&!isDoc&&!isUpd;
 if(docTitleWrap)docTitleWrap.hidden=!isDoc;
 if(docModeWrap)docModeWrap.hidden=!isDoc;
 if(dateWrap)dateWrap.hidden=isDoc||isUpd;
 date.disabled=!supportDate;
 date.closest(".last")?.classList.toggle("disabled",!supportDate);
 path.placeholder=isUpd?"Например, plg-t2f или man/plg-t2f":isDoc?"@nws или ссылка Google Docs":isVns?"например, 1014-2":isIo?"раздел выбирается автоматически":"например, vns или s/2025";
 path.disabled=isIo;
 const sub=path.value.trim().replace(/^\/+|\/+$/g,"");
 let command="";
 if(isDoc){
  const target=sub||"@nws";
  const title=(docTitle?.value||"").trim().replace(/"/g,"");
  command="@gp doc tab "+target+(title?' "'+title+'"':"")+(docMode?.value&&docMode.value!=="current"?" "+docMode.value:"");
 }else if(isUpd)command="@gp upd";
  else if(isIo)command=kind==="io-ds"?"@gp io ds":"@gp io";
 else if(isVns)command=kind==="vns-next-drive"?"@gp vns next drive":"@gp vns drive";
 else command="@gp "+kind;
 if(!isIo&&!isDoc&&sub)command+=" "+sub;
 if(supportDate&&date.value!=="none")command+=" "+date.value;
 output.textContent=command;
 copyBuild.setAttribute("data-copy",command);
 builderHint.textContent=labels[kind]||"";
}
for(const el of [select,path,date,docTitle,docMode])el?.addEventListener(el===path||el===docTitle?"input":"change",build);
build();
})();
