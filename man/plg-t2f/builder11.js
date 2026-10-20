/* T2F 11 Fashion Series command builder — true scale and fashion silhouette are automatic. */
(function(){
 "use strict";
 const el=id=>document.getElementById(id);
 if(!el("builder11"))return;
 const ids=["t11-mode","t11-start","t11-labels","t11-format","t11-height","t11-p"];
 function refresh(){
  const mode=el("t11-mode").value,parts=["11"];
  if(el("t11-p").checked)parts.push("p");
  parts.push(mode);
  if(mode==="lineup"){
   if(el("t11-height").checked)parts.push("height");
   if(el("t11-start").value)parts.push(el("t11-start").value);
   if(el("t11-labels").value==="numbers off")parts.push("numbers off");
  }
  if(el("t11-format").value)parts.push(el("t11-format").value);
  const cmd=parts.join(" ");
  el("t11-result").textContent=cmd;el("t11-copy").dataset.copy=cmd;
  for(const id of ["t11-start","t11-labels","t11-height"])el(id).disabled=(mode!=="lineup");
 }
 ids.forEach(id=>el(id).addEventListener("input",refresh));
 refresh();
})();