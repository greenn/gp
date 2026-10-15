
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
const navLinks=[...doc.querySelectorAll('.nav-item[href^="#"]')];
if("IntersectionObserver" in window){
const io=new IntersectionObserver(entries=>{
 const item=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
 if(!item)return;
 for(const link of navLinks){link.classList.toggle("active",link.getAttribute("href")==="#"+item.target.id)}
},{rootMargin:"-12% 0px -72% 0px",threshold:[0,.3,.7]});
doc.querySelectorAll("main section[id]").forEach(s=>io.observe(s));
}
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
 if((e.ctrlKey||e.metaKey)&&k==="k"){e.preventDefault();search?.focus();search?.scrollIntoView({behavior:"smooth",block:"center"})}
 if(e.key==="/" && !/INPUT|TEXTAREA|SELECT/.test(doc.activeElement?.tagName||"")){e.preventDefault();search?.focus();search?.scrollIntoView({behavior:"smooth",block:"center"})}
 if(e.key==="Escape"){if(sidebar.classList.contains("open"))closeNav();else if(doc.activeElement===search){search.value="";render();search.blur()}}
});
const select=doc.getElementById("build-command");
const path=doc.getElementById("build-path");
const date=doc.getElementById("build-date");
const output=doc.getElementById("built-command");
const copyBuild=doc.getElementById("copy-built");
const builderHint=doc.getElementById("builder-hint");
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
 "io":"Публикация страницы на GitHub Pages",
 "io-ds":"Интерактивная страница исследования"
};
function build(){
 if(!select||!path||!date||!output)return;
 const kind=select.value;
 const isVns=kind.startsWith("vns-");
 const isIo=kind.startsWith("io");
 const supportDate=!isVns&&!isIo;
 date.disabled=!supportDate;
 date.closest(".last")?.classList.toggle("disabled",!supportDate);
 path.placeholder=isVns?"например, 1014-2":isIo?"раздел выбирается автоматически":"например, vns или s/2025";
 path.disabled=isIo;
 const sub=path.value.trim().replace(/^\/+|\/+$/g,"");
 let command="";
 if(isIo)command=kind==="io-ds"?"@gp io ds":"@gp io";
 else if(isVns)command=kind==="vns-next-drive"?"@gp vns next drive":"@gp vns drive";
 else command="@gp "+kind;
 if(!isIo&&sub)command+=" "+sub;
 if(supportDate&&date.value!=="none")command+=" "+date.value;
 output.textContent=command;
 copyBuild.setAttribute("data-copy",command);
 builderHint.textContent=labels[kind]||"";
}
for(const el of [select,path,date])el?.addEventListener(el===path?"input":"change",build);
build();
})();
