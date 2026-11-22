/* T2F 11 command builder: one-row lineup or multiro w full contact sheet. */
(function(){
 "use strict";
 const el=id=>document.getElementById(id);
 if(!el("builder11"))return;
 const ids=["t11-mode","t11-start","t11-labels","t11-format","t11-height","t11-p","t11-rows","t11-columns","t11-position"];
 function refresh(){
  const mode=el("t11-mode").value,parts=["11"],full=mode==="full",group=full||mode==="lineup";
  if(el("t11-p").checked)parts.push("p");
  parts.push(mode);
  if(group){
   if(el("t11-height").checked)parts.push("height");
   if(full){
    if(el("t11-rows").value)parts.push(el("t11-rows").value);
    else if(el("t11-columns").value)parts.push(el("t11-columns").value);
   }
   if(el("t11-start").value)parts.push(el("t11-start").value);
   if(el("t11-labels").value==="numbers off")parts.push("numbers off");
   else if(full&&el("t11-position").value)parts.push(el("t11-position").value);
  }
  if(el("t11-format").value)parts.push(el("t11-format").value);
  const cmd=parts.join(" ");
  el("t11-result").textContent=cmd;el("t11-copy").dataset.copy=cmd;
  for(const id of ["t11-start","t11-labels","t11-height"])el(id).disabled=!group;
  for(const id of ["t11-rows","t11-columns","t11-position"])el(id).disabled=!full;
  el("t11-position").disabled=!full||el("t11-labels").value==="numbers off";
 }
 for(const id of ids)el(id).addEventListener("change",function(){
   if(id==="t11-rows"&&this.value)el("t11-columns").value="";
   if(id==="t11-columns"&&this.value)el("t11-rows").value="";
   refresh();
 });
 refresh();
})();