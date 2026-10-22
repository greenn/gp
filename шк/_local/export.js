'use strict';
(() => {
 const $=id=>document.getElementById(id), base=new URL('../',location.href);
 const params=new URLSearchParams(location.hash.slice(1));
 const provided={attendance:params.get('attendance')||'',trip:params.get('trip')||''};
 if(location.hash)history.replaceState(null,'',location.pathname+location.search);
 const cache={};
 const status=message=>{$('status').textContent=message};
 async function load(path){const response=await fetch(new URL(path,base),{cache:'no-store'});if(!response.ok)throw Error('Не удалось загрузить '+path);return response.text()}
 const b64=txt=>Uint8Array.from(atob(txt),c=>c.charCodeAt(0));
 async function decrypt(path,code,upper=false){
  const p=JSON.parse(await load(path));const raw=new TextEncoder().encode(upper?code.trim().toUpperCase():code.trim());
  const material=await crypto.subtle.importKey('raw',raw,{name:'PBKDF2'},false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(p.salt),iterations:p.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
  let decrypted;try{decrypted=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64(p.iv)},key,b64(p.ciphertext))}catch(_){throw Error('Не удалось открыть исходные данные: '+path)}
  return JSON.parse(new TextDecoder().decode(decrypted));
 }
 const safe=obj=>JSON.stringify(obj).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
 function inline(html,css,parts){
  html=html.replace(/<link\s+rel="stylesheet"\s+href="[^"]+"\s*\/?\s*>/g,'');
  html=html.replace(/<script\s+src="[^"]+"\s+defer><\/script>/g,'');
  html=html.replace('</head>','<style>'+css+'</style></head>');
  for(const code of parts){if(code.toLowerCase().includes('</script'))throw Error('Нельзя встроить исходный скрипт')}
  return html.replace('</body>',parts.map(code=>'<script>\n'+code+'\n</script>').join('\n')+'</body>');
 }
 async function makeAttendance(data){
  const [html,css,app]=await Promise.all(['res-6-1-2627/index.html','res-6-1-2627/style.css','res-6-1-2627/app.js'].map(load));
  const marker='const saved=localStorage.getItem(KEY);if(saved)state=normalize(JSON.parse(saved));';
  const catchMarker="catch(e){persistent=false;flash('Не удалось восстановить сохранённую таблицу. Импортируйте резервную копию.',true);}}";
  if(!app.includes(marker)||!app.includes(catchMarker))throw Error('Изменился загрузчик посещаемости');
  const patched=app.replace(marker,marker+'else if(window.__GP_LOCAL_ATTENDANCE)state=normalize(window.__GP_LOCAL_ATTENDANCE);')
    .replace(catchMarker,"catch(e){if(window.__GP_LOCAL_ATTENDANCE)state=normalize(window.__GP_LOCAL_ATTENDANCE);else{persistent=false;flash('Не удалось восстановить сохранённую таблицу.',true);}}}");
  const seed='window.__GP_LOCAL_ATTENDANCE='+safe(data)+';try{const k="gp.pb-2627-1.attendance.v1";if(!localStorage.getItem(k))localStorage.setItem(k,JSON.stringify(window.__GP_LOCAL_ATTENDANCE))}catch(_){}';
  return inline(html,css,[seed,patched]);
 }
 async function makeTrip(data){
  const paths=['поездка-1026/index.html','поездка-1026/style.css','поездка-1026/bus.css','поездка-1026/bus-panel.html','поездка-1026/app.js','поездка-1026/bus.js','поездка-1026/swap-quests.js'];
  const [html,css,busCss,panel,app,bus,swap]=await Promise.all(paths.map(load));
  const fetchLine="try{const response=await fetch('./bus-panel.html',{cache:'no-store'});if(!response.ok)throw Error('HTTP '+response.status);busView.innerHTML=await response.text()}";
  if(!bus.includes(fetchLine))throw Error('Изменился загрузчик автобуса');
  const start=app.lastIndexOf('(async()=>{let pin=privateLinkCode');if(start<0)throw Error('Изменился загрузчик поездки');
  const patched=app.slice(0,start)+'(()=>{const rows=readRoster()||window.__GP_LOCAL_TRIP_ROSTER;if(rows){applyPeople(rows);forgetOldCodes()}else missingRoster()})();\n})();';
  const seed='window.__GP_LOCAL_TRIP_ROSTER='+safe(data.people)+';window.__GP_LOCAL_BUS_PANEL='+safe(panel)+';try{const k="gp.trip-1026.roster.v1";if(!localStorage.getItem(k))localStorage.setItem(k,JSON.stringify(window.__GP_LOCAL_TRIP_ROSTER))}catch(_){}';
  return inline(html,css+busCss,[seed,bus.replace(fetchLine,'try{busView.innerHTML=window.__GP_LOCAL_BUS_PANEL}'),patched,swap]);
 }
 function download(name,contents){const blob=new Blob([contents],{type:'text/html;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),20000)}
 async function make(codes){
  $('downloads').hidden=true;status('Открываю исходные списки…');
  try{
   const [attendance,trip]=await Promise.all([decrypt('res-6-1-2627/initial-data.enc.json',codes.attendance),decrypt('поездка-1026/roster.enc.json',codes.trip,true)]);
   if(attendance.students?.length!==21||trip.people?.length!==22||trip.people.filter(p=>p.role==='student').length!==20)throw Error('Неверный состав исходной базы');
   status('Создаю готовые страницы…');
   cache.attendance=await makeAttendance(attendance);cache.trip=await makeTrip(trip);
   $('downloads').hidden=false;$('codes').hidden=true;
   status('Готово. Исходные данные сохранены без изменений. Скачайте обе страницы.');
  }catch(e){status('Ошибка: '+e.message);$('codes').hidden=false}
 }
 $('create').addEventListener('click',()=>void make({attendance:$('attendanceCode').value,trip:$('tripCode').value}));
 $('saveAttendance').addEventListener('click',()=>download('attendance.html',cache.attendance));
 $('saveTrip').addEventListener('click',()=>download('trip.html',cache.trip));
 if(provided.attendance&&provided.trip)void make(provided);
 else{$('codes').hidden=false;status('Укажите исходные коды один раз, чтобы создать готовые локальные страницы.')}
})();