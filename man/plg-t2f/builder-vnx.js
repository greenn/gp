/* T2F VNX 0.10.10 command builder: text only; does not run image generation */
(function(){
  "use strict";
  const $ = id => document.getElementById(id);
  if (!$("vnx-builder")) return;
  const ids = ["vnx-layout","vnx-true","vnx-profile","vnx-v"];
  function refresh(){
    const each = $("vnx-layout").value === "each";
    $("vnx-profile").disabled = !each;
    $("vnx-v").disabled = !each;
    const result = ["vnx", $("vnx-true").value, each ? "each" : "", each ? $("vnx-profile").value : "", each ? $("vnx-v").value : ""].filter(Boolean).join(" ");
    $("vnx-result").textContent = result;
    $("vnx-copy").dataset.copy = result;
  }
  ids.forEach(id => $(id).addEventListener("input", refresh));
  refresh();
})();
