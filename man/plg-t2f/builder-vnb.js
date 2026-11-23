/* T2F VNB 0.10.11: text-only builder */
(function(){"use strict";const $=id=>document.getElementById(id);if(!$("vnb-builder"))return;
function refresh(){const result=["vnb",$("vnb-layout").value,$("vnb-profile").value,$("vnb-v").value].filter(Boolean).join(" ");$("vnb-result").textContent=result;$("vnb-copy").dataset.copy=result;}
["vnb-layout","vnb-profile","vnb-v"].forEach(id=>$(id).addEventListener("change",refresh));refresh();})();
