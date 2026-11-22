/* T2F VNX command builder: controls only text, not generation */
(function(){
 "use strict";
 const $=id=>document.getElementById(id);
 if(!$("vnx-builder"))return;
 const ids=["vnx-layout","vnx-true","vnx-v"];
 function refresh(){
   const each=$("vnx-layout").value==="each";
   $("vnx-v").disabled=!each;
   const result=["vnx",$("vnx-true").value,each?"each":"",each?$("vnx-v").value:""].filter(Boolean).join(" ");
   $("vnx-result").textContent=result;
   $("vnx-copy").dataset.copy=result;
 }
 ids.forEach(id=>$(id).addEventListener("input",refresh));
 refresh();
})();
