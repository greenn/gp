/* Reusable T2F 77 school-default composer for manual and t2fb. */
(function(){
 "use strict";
 const $=id=>document.getElementById(id);
 if(!$("builder77"))return;
 const ids=["t77-theme","t77-outfit","t77-place","t77-frame","t77-light","t77-format","t77-face","t77-age","t77-b","t77-prompt","t77-extra"];
 function output(){
  const parts=["77"];
  if($("t77-prompt").checked)parts.push("p");
  for(const id of ["t77-theme","t77-outfit","t77-place","t77-frame","t77-light","t77-format"]){const v=$(id).value;if(v)parts.push(v);}
  if($("t77-face").checked)parts.push("keep face");
  if($("t77-age").checked)parts.push("keep age");
  if($("t77-b").checked && !parts.some(x=>x.includes("outfit")))parts.push("match outfit");
  const extra=$("t77-extra").value.replace(/\s+/g," ").trim().slice(0,240);
  if(extra)parts.push(extra);
  return parts.join(" ");
 }
 function refresh(){
  const cmd=output();
  $("t77-result").textContent=cmd;
  $("t77-copy").dataset.copy=cmd;
  if(typeof window.T2FB_REFRESH_OUTPUT==="function")window.T2FB_REFRESH_OUTPUT();
 }
 ids.forEach(id=>$(id).addEventListener("input",refresh));
 if(!document.getElementById("guide-search-input")){
  $("t77-copy").addEventListener("click",async()=>{
   try{await navigator.clipboard.writeText(output());$("t77-copy").textContent="Скопировано ✓";}
   catch(_){const ta=document.createElement("textarea");ta.value=output();document.body.appendChild(ta);ta.select();try{document.execCommand("copy");$("t77-copy").textContent="Скопировано ✓";}catch(e){$("t77-copy").textContent="Выделите команду";}ta.remove();}
   setTimeout(()=>$("t77-copy").textContent="Копировать",1500);
  });
 }
 window.T2FB77={output,refresh};
 refresh();
})();