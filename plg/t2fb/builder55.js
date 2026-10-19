/* T2FB v0.9.0 — 55 natural photo command composer. No image uploads. */
(function(){
"use strict";
const $=id=>document.getElementById(id);
if(!$("page-commands55"))return;
const ids=["f55-era","f55-medium","f55-stock","f55-light","f55-genre","f55-ratio","f55-grain","f55-freedom","f55-keep-face","f55-keep-age","f55-keep-outfit","f55-prompt","f55-extra"];
const KEY="t2fb-mode55-v1";
const sanitize=s=>String(s||"").replace(/\s+/g," ").trim().slice(0,240);
function restore(){
 try{
  const saved=JSON.parse(localStorage.getItem(KEY)||"{}");
  if(!saved||typeof saved!=="object")return;
  ids.forEach(id=>{
   const el=$(id),value=saved[id];
   if(value===undefined)return;
   if(el.type==="checkbox")el.checked=value===true;
   else if(el.tagName==="SELECT" && [...el.options].some(o=>o.value===value))el.value=value;
   else if(el.type==="range" && /^[0-5]$/.test(String(value)))el.value=value;
   else if(el.type==="text")el.value=sanitize(value);
  });
 }catch(_){}
}
function output(){
 const read=id=>$(id).value;
 const parts=["55"];
 if($("f55-prompt").checked)parts.push("p");
 for(const id of ["f55-era","f55-medium","f55-stock","f55-light","f55-genre","f55-ratio"]){
  const v=read(id);if(v)parts.push(v);
 }
 if(read("f55-grain")!=="0")parts.push("grain",read("f55-grain"));
 if(read("f55-freedom")!=="4")parts.push("freedom",read("f55-freedom"));
 if($("f55-keep-face").checked)parts.push("keep face");
 if($("f55-keep-age").checked)parts.push("keep age");
 if($("f55-keep-outfit").checked)parts.push("keep outfit");
 const extra=sanitize(read("f55-extra"));if(extra)parts.push(extra);
 return parts.join(" ");
}
function update(){
 const result=output();
 $("f55-result").textContent=result;
 $("f55-copy").dataset.copy=result;
 $("f55-grain-value").textContent=$("f55-grain").value;
 $("f55-freedom-value").textContent=$("f55-freedom").value;
 const saved={};
 for(const id of ids){const el=$(id);saved[id]=el.type==="checkbox"?el.checked:el.value;}
 try{localStorage.setItem(KEY,JSON.stringify(saved));}catch(_){}
 if(typeof window.T2FB_REFRESH_OUTPUT==="function")window.T2FB_REFRESH_OUTPUT();
}
async function copy(){
 const value=output();
 try{
  if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);
  else{const el=document.createElement("textarea");el.value=value;el.style.position="fixed";el.style.left="-9999px";document.body.appendChild(el);el.select();if(!document.execCommand("copy"))throw Error("blocked");el.remove();}
  $("f55-copy").textContent="Скопировано ✓";setTimeout(()=>$("f55-copy").textContent="Копировать",1300);
 }catch(_){$("f55-copy").textContent="Выделите текст";setTimeout(()=>$("f55-copy").textContent="Копировать",1500);}
}
window.T2FB55={output,refresh:update};
restore();
ids.forEach(id=>$(id).addEventListener("input",update));
$("f55-copy").addEventListener("click",copy);
update();
})();