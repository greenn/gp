(function(){
"use strict";
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const nav=$$("#site-nav .nav-item"),menu=$("#menu-toggle"),side=$("#sidebar"),scrim=$("#scrim"),search=$("#guide-search"),clear=$("#search-clear"),status=$("#search-status");
const cards=$$("#command-grid .command-card"),sections=$$(".guide-section");const filters=$$(".filter");
let activeFilter="all", toastTimer;
function notice(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),1800);}
async function copy(text,btn){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text)}else{const t=document.createElement("textarea");t.value=text;t.style.position="fixed";t.style.left="-9999px";document.body.append(t);t.select();const ok=document.execCommand("copy");t.remove();if(!ok)throw new Error("clipboard unavailable");}notice("Команда скопирована");if(btn){btn.classList.add("done");setTimeout(()=>btn.classList.remove("done"),1500)}}catch(e){notice("Копирование недоступно — выделите текст вручную");}}
function closeMenu(){side.classList.remove("open");scrim.classList.remove("visible");menu.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");}
menu.addEventListener("click",()=>{const open=!side.classList.contains("open");side.classList.toggle("open",open);scrim.classList.toggle("visible",open);menu.setAttribute("aria-expanded",String(open));});
scrim.addEventListener("click",closeMenu);
nav.forEach(a=>a.addEventListener("click",()=>{nav.forEach(x=>x.classList.toggle("active",x===a));closeMenu();}));
window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search.focus()}if(e.key==="Escape"){closeMenu();if(document.activeElement===search)search.blur();}});
function applyFilters(){const q=search.value.trim().toLocaleLowerCase("ru-RU");let count=0;cards.forEach(card=>{const matches=(activeFilter==="all"||card.dataset.tags.split(" ").includes(activeFilter))&&(!q||(card.textContent+" "+(card.dataset.search||"")).toLocaleLowerCase("ru-RU").includes(q));card.hidden=!matches;if(matches)count++;});
$("#command-count").textContent="Показано команд: "+count+" из "+cards.length;
sections.forEach(section=>{if(!q){section.hidden=false;return;}if(section.id==="commands"){section.hidden=count===0 && !(section.getAttribute("data-search")||"").includes(q);return;}section.hidden=!(section.textContent+" "+(section.dataset.search||"")).toLocaleLowerCase("ru-RU").includes(q);});
const visible=sections.filter(x=>!x.hidden).length;status.textContent=q?("Найдено разделов: "+visible+", команд: "+count):"Все разделы доступны · Ctrl + K — поиск";clear.hidden=!q;}
search.addEventListener("input",applyFilters);
clear.addEventListener("click",()=>{search.value="";applyFilters();search.focus()});
filters.forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.filter;filters.forEach(b=>{const a=b===btn;b.classList.toggle("active",a);b.setAttribute("aria-pressed",String(a));});applyFilters();}));
document.addEventListener("click",e=>{const btn=e.target.closest("[data-copy]");if(btn)copy(btn.dataset.copy,btn);});
const form=$("#builder-form"),mode=$("#builder-mode"),platform=$("#builder-platform"),model=$("#builder-model"),detail=$("#builder-detail"),task=$("#builder-task"),ref=$("#builder-reference"),output=$("#builder-output"),note=$("#builder-note"),preview=$("#copy-preview");
function build(){model.disabled=platform.value!=="cursor";if(model.disabled)model.value="";const tokens=["@D",mode.value,platform.value];if(platform.value==="cursor"&&model.value)tokens.push(model.value);let t=task.value.trim();if(!t)t="[опиши нужный результат]";let value=tokens.join(" ")+" "+t;const d=detail.value.trim();if(d)value+="\nОграничение: "+d+".";if(ref.checked)value+="\nИспользуй приложенное изображение как визуальный референс.";output.textContent=value;note.textContent=(mode.value.includes("build")?"Режим build предполагает доступные инструменты и разрешение на реализацию. ":"")+(ref.checked?"Изображение понадобится прикрепить в ChatGPT и отдельно передать внешнему coding agent. ":"")+"Составляется только текст команды, ничего не отправляется.";preview.disabled=false;return value;}
["input","change"].forEach(ev=>form.addEventListener(ev,build));form.addEventListener("reset",()=>setTimeout(build,0));form.addEventListener("submit",e=>e.preventDefault());preview.addEventListener("click",()=>copy(build(),preview));
applyFilters();build();
})();
