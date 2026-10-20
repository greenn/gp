'use strict';
(function () {
  const KEY = 'gp.pb-2627-1.attendance.v1';
  const $ = (s) => document.querySelector(s);
  const fields = ['days', 'daysSick', 'lessons', 'lessonsSick', 'late'];
  const names = ['Дней всего', 'Дней по болезни', 'Уроков всего', 'Уроков по болезни', 'Опозданий'];
  let state = {version: 1, teacher: '', academicYear: '2026/27', students: []};
  let dragId = null;
  let persistent = true;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const number = (v) => {const n = Number(v); return Number.isFinite(n) && n >= 0 ? Math.min(999999, Math.floor(n)) : 0;};
  const manual = (a,b) => a.order-b.order || a.name.localeCompare(b.name,'ru');
  const sum = (rows, field) => rows.reduce((n,x) => n + (x[field] || 0), 0);
  function normalize(raw) {
    if (!raw || typeof raw !== 'object') throw new Error('Ожидается JSON с массивом students.');
    const source = Array.isArray(raw) ? raw : raw.students;
    if (!Array.isArray(source) || source.length > 1000) throw new Error('Не найден корректный массив students (до 1000 строк).');
    const seen = new Set();
    const students = source.map((r, i) => {
      if (!r || typeof r !== 'object') throw new Error('Некорректная строка № ' + (i+1));
      let id = String(r.id || 'student-' + (i+1)).slice(0,70);
      while (seen.has(id)) id += '-copy';
      seen.add(id);
      const item = {id, name: String(r.name || 'Без имени').slice(0,160), pinned: Boolean(r.pinned), order: Number.isFinite(Number(r.order)) ? Number(r.order) : i};
      fields.forEach((f) => {item[f] = number(r[f]);});
      return item;
    });
    return {version:1, teacher:String(raw.teacher||'').slice(0,150), academicYear:String(raw.academicYear || '2026/27').slice(0,32), students};
  }
  function load() {
    try {const saved = localStorage.getItem(KEY); if (saved) state = normalize(JSON.parse(saved));}
    catch (e) {persistent = false; flash('Не удалось восстановить сохранённую таблицу. Импортируйте резервную копию.', true);}
  }
  function save() {
    try {localStorage.setItem(KEY,JSON.stringify(state)); persistent=true; $('#saveStatus').textContent='● Сохранено в браузере';}
    catch (e) {persistent=false; $('#saveStatus').textContent='Не удалось сохранить — скачайте JSON'; flash('Автосохранение в браузере недоступно. Выгрузите JSON для резервной копии.', true);}
  }
  function flash(message, error=false) {
    const box=$('#flash'); box.textContent=message; box.classList.toggle('error',error); box.hidden=false;
  }
  function subset(rows) {
    const q=$('#search').value.trim().toLocaleLowerCase('ru');
    const mode=$('#filter').value;
    return rows.filter((r) => (!q || r.name.toLocaleLowerCase('ru').includes(q)) && (mode==='all' || (mode==='missed' && (r.days>0 || r.lessons>0)) || (mode==='sick' && (r.daysSick>0 || r.lessonsSick>0)) || (mode==='clear' && r.days===0 && r.lessons===0)));
  }
  function sorted(rows) {
    const mode=$('#sort').value;
    return rows.sort((a,b)=>{
      if(mode==='nameAsc') return a.name.localeCompare(b.name,'ru');
      if(mode==='nameDesc') return b.name.localeCompare(a.name,'ru');
      if(mode==='daysDesc') return b.days-a.days || manual(a,b);
      if(mode==='daysAsc') return a.days-b.days || manual(a,b);
      if(mode==='lessonsDesc') return b.lessons-a.lessons || manual(a,b);
      if(mode==='lessonsSickDesc') return b.lessonsSick-a.lessonsSick || manual(a,b);
      if(mode==='lateDesc') return b.late-a.late || manual(a,b);
      return manual(a,b);
    });
  }
  function rowHTML(r, i) {
    const cells=fields.map((f)=>{
      const invalid=(f==='daysSick' && r.daysSick>r.days) || (f==='lessonsSick' && r.lessonsSick>r.lessons);
      return '<td><input class="value-input'+(invalid?' invalid':'')+'" type="number" min="0" max="999999" step="1" value="'+r[f]+'" data-field="'+f+'" aria-label="'+names[fields.indexOf(f)]+' — '+esc(r.name)+'" title="'+(invalid?'По болезни больше общего количества':'Изменить значение')+'"></td>';
    }).join('');
    return '<tr class="data-row'+(r.pinned?' pinned-row':'')+'" data-id="'+esc(r.id)+'" data-pin="'+r.pinned+'">'+
      '<td><span class="drag-handle" draggable="true" role="img" aria-label="Перетащить строку" title="Перетащить строку">⠿</span></td>'+
      '<td class="row-index">'+(i+1)+'</td>'+
      '<td><input class="name-input" data-field="name" aria-label="ФИО" value="'+esc(r.name)+'" maxlength="160"></td>'+cells+
      '<td><button class="pin-button'+(r.pinned?' active':'')+'" data-action="pin" title="'+(r.pinned?'Открепить':'Закрепить')+'" aria-label="'+(r.pinned?'Открепить':'Закрепить')+' '+esc(r.name)+'" aria-pressed="'+r.pinned+'">'+(r.pinned?'◆':'◇')+'</button></td>'+
      '<td class="move-buttons"><button type="button" class="move-button" data-action="up" title="Выше" aria-label="Выше">↑</button><button type="button" class="move-button" data-action="down" title="Ниже" aria-label="Ниже">↓</button></td></tr>';
  }
  function groupHTML(pinned, rows, start) {
    let text = '<tr class="row-group '+(pinned?'pinned-group':'')+'" data-group="'+(pinned?'pinned':'regular')+'"><td colspan="10">'+(pinned?'◆ ЗАКРЕПЛЁННЫЕ':'СПИСОК')+' · '+rows.length+(pinned?' — всегда на виду':'')+'</td></tr>';
    rows.forEach((r,i) => {text+=rowHTML(r,start+i);});
    return text;
  }
  function render() {
    const all=state.students;
    const pinned=all.filter(x=>x.pinned).sort(manual);
    const regular=sorted(subset(all.filter(x=>!x.pinned)));
    const shown=pinned.concat(regular);
    $('#teacher').textContent=state.teacher || 'не указан';
    document.querySelector('.topright').textContent=state.academicYear;
    $('#statPeople').textContent=all.length;
    $('#statDays').textContent=sum(all,'days');
    $('#statDaysSick').textContent=sum(all,'daysSick');
    $('#statLessons').textContent=sum(all,'lessons');
    $('#statLessonsSick').textContent=sum(all,'lessonsSick');
    $('#statLate').textContent=sum(all,'late');
    $('#filteredCount').textContent=shown.length + ' / ' + all.length;
    let html=groupHTML(true,pinned,0)+groupHTML(false,regular,pinned.length);
    if(!all.length) html+='<tr><td class="nothing" colspan="10"><strong>Пока нет данных</strong>Нажмите «Загрузить JSON» и выберите файл, полученный в чате.</td></tr>';
    else if(!shown.length) html+='<tr><td class="nothing" colspan="10">По выбранным условиям нет строк. Сбросьте фильтры.</td></tr>';
    $('#rows').innerHTML=html;
    const nums=fields.map(x=>'<td>'+sum(all,x)+'</td>').join('');
    const numsShown=fields.map(x=>'<td>'+sum(shown,x)+'</td>').join('');
    $('#foot').innerHTML='<tr><td colspan="3">Итого · весь класс</td>'+nums+'<td colspan="2"></td></tr>'+
      ((shown.length!==all.length)?'<tr class="secondary"><td colspan="3">Видимые (включая закреплённые)</td>'+numsShown+'<td colspan="2"></td></tr>':'');
    $('#exportBtn').disabled=$('#csvBtn').disabled=$('#clearBtn').disabled=!all.length;
    document.querySelectorAll('th[data-sort]').forEach((x)=>x.dataset.active=String(x.dataset.sort===$('#sort').value));
    if (persistent) $('#saveStatus').textContent=all.length?'● Сохранено в браузере':'Ожидается загрузка данных';
  }
  function reorder(id, target, destPin, after=false) {
    const r=state.students.find(x=>x.id===id);
    if(!r) return;
    r.pinned=destPin;
    const others=state.students.filter(x=>x.id!==id).sort(manual);
    const dest=others.filter(x=>x.pinned===destPin);
    let i=target ? dest.findIndex(x=>x.id===target) : -1;
    if(i<0) i=dest.length; else if(after) i++;
    dest.splice(i,0,r);
    const rest=others.filter(x=>x.pinned!==destPin);
    state.students=(destPin?dest.concat(rest):rest.concat(dest));
    state.students.forEach((x,index)=>x.order=index);
    $('#sort').value='manual';
    save();render();
  }
  function moveArrow(id, step) {
    const r=state.students.find(x=>x.id===id);
    if(!r)return;
    const part=state.students.filter(x=>x.pinned===r.pinned).sort(manual);
    const i=part.findIndex(x=>x.id===id), j=i+step;
    if(j<0||j>=part.length)return;
    reorder(id,part[j].id,r.pinned,step>0);
  }
  function download(filename,text,type) {
    const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function backup() {
    const stamp=new Date().toISOString().slice(0,10);
    download('pb-2627-1-'+stamp+'.json',JSON.stringify(state,null,2)+'\n','application/json;charset=utf-8');
    flash('Резервная копия JSON скачана. Храните её в защищённом месте.');
  }
  function csv() {
    const lines=[['№','ФИО',...names,'Закреплена']];
    state.students.slice().sort((a,b)=>(Number(b.pinned)-Number(a.pinned))||manual(a,b)).forEach((r,i)=>lines.push([i+1,r.name,...fields.map(f=>r[f]),r.pinned?'да':'нет']));
    const safe=(v)=>'"'+String(v).replace(/"/g,'""')+'"';
    download('pb-2627-1.csv','\ufeff'+lines.map(r=>r.map(safe).join(';')).join('\r\n'),'text/csv;charset=utf-8');
  }
  async function importFile(file) {
    if (!file)return;
    try {
      if (file.size>5*1024*1024) throw new Error('Файл слишком большой (не более 5 МБ).');
      const incoming=normalize(JSON.parse(await file.text()));
      if(state.students.length&&!confirm('Заменить текущие данные? Перед заменой при необходимости сохраните JSON.'))return;
      state=incoming;save();render();flash('Загружено '+incoming.students.length+' строк. Данные сохранены в этом браузере.');
    } catch (e) {flash('Ошибка импорта: '+e.message,true);}
  }
  $('#rows').addEventListener('change',(e)=>{
    const input=e.target.closest('input[data-field]'),tr=e.target.closest('tr[data-id]');
    if(!input||!tr)return;
    const r=state.students.find(x=>x.id===tr.dataset.id);if(!r)return;
    const key=input.dataset.field;
    r[key]=key==='name'?(input.value.trim().slice(0,160)||'Без имени'):number(input.value);
    save();render();
  });
  $('#rows').addEventListener('click',(e)=>{
    const b=e.target.closest('button[data-action]'),tr=e.target.closest('tr[data-id]');if(!b||!tr)return;
    const id=tr.dataset.id,r=state.students.find(x=>x.id===id);if(!r)return;
    if(b.dataset.action==='pin')reorder(id,null,!r.pinned);
    if(b.dataset.action==='up')moveArrow(id,-1);
    if(b.dataset.action==='down')moveArrow(id,1);
  });
  $('#rows').addEventListener('dragstart',(e)=>{
    if(!e.target.closest('.drag-handle')){e.preventDefault();return;}
    const tr=e.target.closest('tr[data-id]');if(!tr)return;
    dragId=tr.dataset.id;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragId);
    tr.classList.add('dragging');
  });
  function clearDrop(){document.querySelectorAll('.dragover,.drop-hover,.dragging').forEach(x=>x.classList.remove('dragover','drop-hover','dragging'));}
  $('#rows').addEventListener('dragover',(e)=>{
    if(!dragId)return;
    const target=e.target.closest('tr[data-id],tr[data-group]');if(!target)return;
    e.preventDefault();e.dataTransfer.dropEffect='move';clearDrop();target.classList.add(target.dataset.id?'dragover':'drop-hover');
  });
  $('#rows').addEventListener('drop',(e)=>{
    if(!dragId)return;
    e.preventDefault();
    const target=e.target.closest('tr[data-id],tr[data-group]');
    if(target) {
      const group=target.dataset.group, destPin=group ? group==='pinned' : target.dataset.pin==='true';
      const after=Boolean(target.dataset.id && e.clientY>target.getBoundingClientRect().top+target.getBoundingClientRect().height/2);
      if(target.dataset.id!==dragId)reorder(dragId,target.dataset.id||null,destPin,after);
    }
    dragId=null;clearDrop();
  });
  $('#rows').addEventListener('dragend',()=>{dragId=null;clearDrop();});
  $('#fileInput').addEventListener('change',async(e)=>{await importFile(e.target.files[0]);e.target.value='';});
  $('#importBtn').addEventListener('click',()=>$('#fileInput').click());
  $('#exportBtn').addEventListener('click',backup);
  $('#csvBtn').addEventListener('click',csv);
  $('#printBtn').addEventListener('click',()=>window.print());
  $('#search').addEventListener('input',render);
  $('#filter').addEventListener('change',render);
  $('#sort').addEventListener('change',render);
  $('#resetView').addEventListener('click',()=>{$('#search').value='';$('#filter').value='all';$('#sort').value='manual';render();});
  document.querySelector('thead').addEventListener('click',e=>{const th=e.target.closest('[data-sort]');if(th){$('#sort').value=th.dataset.sort;render();}});
  $('#addBtn').addEventListener('click',()=>{
    const name=prompt('ФИО нового ученика:');if(!name||!name.trim())return;
    const id='student-'+Date.now()+'-'+Math.random().toString(36).slice(2,6);
    const r={id,name:name.trim().slice(0,160),days:0,daysSick:0,lessons:0,lessonsSick:0,late:0,pinned:false,order:state.students.length};
    state.students.push(r);save();render();
  });
  $('#clearBtn').addEventListener('click',()=>{
    if(!confirm('Удалить все сохранённые сведения из этого браузера? Сначала сохраните резервный JSON.'))return;
    state={version:1,teacher:'',academicYear:'2026/27',students:[]};
    try{localStorage.removeItem(KEY);}catch(e){} persistent=true;render();flash('Локальные данные удалены.');
  });
  $('#settingsBtn').addEventListener('click',()=>{$('#teacherInput').value=state.teacher;$('#yearInput').value=state.academicYear;$('#settings').showModal();});
  $('#settings').addEventListener('close',()=>{
    if($('#settings').returnValue==='save') {state.teacher=$('#teacherInput').value.trim().slice(0,150);state.academicYear=$('#yearInput').value.trim().slice(0,32)||'2026/27';save();render();}
  });
  load();render();
})();