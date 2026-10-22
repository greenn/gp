/* GP Classroom Live Sync (optional). Configuration contains publishable keys only.
 * Public GP pages stay unchanged until a backend is configured.
 * Student data is sent only to an authenticated RLS-protected row.
 */
'use strict';
(async () => {
  const config = window.GP_LIVE_SYNC;
  if (!config?.url || !config?.publishableKey) return;
  const path = decodeURIComponent(location.pathname);
  const attendance = path.includes('/шк/res-6-1-2627/');
  const trip = path.includes('/шк/поездка-1026/');
  if (!attendance && !trip) return;

  const resource = attendance ? 'res-6-1-2627' : 'trip-1026';
  const keys = attendance
    ? ['gp.pb-2627-1.attendance.v1']
    : ['gp.trip-1026.roster.v1','gp.trip-1026.assignments.v1',
       'gp.trip-1026.bus.v1','gp.trip-1026.quest-swap.v1'];
  const flagKey = 'gp.class-sync.applied.' + resource;
  const node = document.createElement('aside');
  node.setAttribute('role','status');
  node.setAttribute('aria-live','polite');
  node.style.cssText = [
    'position:fixed','bottom:14px','right:14px','z-index:10000',
    'padding:9px 14px','border-radius:10px','font:13px/1.5 sans-serif',
    'background:#26333d','color:#fff','box-shadow:0 2px 14px #0004',
    'max-width:min(320px,calc(100vw - 28px))'
  ].join(';');
  node.textContent = 'Синхронизация: подключение…';
  document.body.append(node);
  const status = message => { node.textContent = 'Синхронизация: ' + message; };
  function snapshot() {
    const values = {};
    for (const key of keys) {
      try { const value=localStorage.getItem(key); if(value !== null) values[key]=value; }
      catch (_) {}
    }
    return {values};
  }
  const hash = value => JSON.stringify(value?.values || {});
  const hasData = value => Object.keys(value?.values || {}).length !== 0;
  function restore(value) {
    const items = value?.values || {};
    for (const key of keys) {
      try { if (Object.hasOwn(items, key)) localStorage.setItem(key, items[key]);
            else localStorage.removeItem(key); }
      catch (_) {}
    }
    try { localStorage.setItem(flagKey, hash(value)); } catch (_) {}
    location.reload();
  }
  let createClient;
  try {
    ({createClient} = await import('https://esm.sh/@supabase/supabase-js@2'));
  } catch (_) { status('не удалось загрузить библиотеку'); return; }
  const supabase = createClient(config.url, config.publishableKey, {
    auth: {persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });
  let session;
  try { ({data:{session}} = await supabase.auth.getSession()); }
  catch (_) { status('ошибка авторизации'); return; }
  if (!session) {
    node.textContent = '';
    const label = document.createElement('span');
    label.textContent = 'Синхронизация между устройствами ';
    const button = document.createElement('button');
    button.type='button';
    button.textContent='Войти через Google';
    button.style.cssText='padding:5px 8px;cursor:pointer;border-radius:5px';
    button.addEventListener('click',async()=>{
      const {error} = await supabase.auth.signInWithOAuth({
        provider:'google',options:{redirectTo:location.origin+location.pathname}
      });
      if(error)status('ошибка входа: '+error.message);
    });
    node.append(label,button);
    return;
  }

  const owner_id = session.user.id;
  const table = 'gp_classroom_sync';
  let cloudHash = '';
  let busy = false;
  const {data:row,error:loadError} = await supabase.from(table)
    .select('snapshot,updated_at')
    .eq('owner_id',owner_id).eq('resource_id',resource).maybeSingle();
  if (loadError) { status('ошибка базы: '+loadError.message); return; }

  const current = snapshot();
  if (row) {
    cloudHash = hash(row.snapshot);
    if (hash(current)!==cloudHash) {
      // A previously edited local snapshot is never silently discarded:
      // it may contain unsynced work. Show a deliberate conflict instead.
      let applied = null;
      try { applied = localStorage.getItem(flagKey); } catch (_) {}
      if (!hasData(current) || (applied && applied===hash(current))) {
        status('получены изменения с другого устройства');
        restore(row.snapshot);
        return;
      }
      status('локальные данные отличаются от облака. Сохраните JSON перед сверкой');
      return;
    }
  } else if (hasData(current)) {
    const {error} = await supabase.from(table).insert({
      owner_id,resource_id:resource,snapshot:current
    });
    if (error) { status('не удалось создать запись: '+error.message); return; }
    cloudHash = hash(current);
  } else {
    status('нет исходных данных. Откройте страницу на исходном устройстве');
    return;
  }
  try { localStorage.setItem(flagKey,cloudHash); } catch (_) {}
  status('подключена');
  let lastSent = cloudHash;
  async function upload() {
    if (busy) return;
    const payload = snapshot();
    const localHash = hash(payload);
    if (!hasData(payload) || localHash===lastSent) return;
    busy = true;
    const {error} = await supabase.from(table).update({
      snapshot:payload,updated_at:new Date().toISOString()
    }).eq('owner_id',owner_id).eq('resource_id',resource);
    busy = false;
    if(error) { status('ошибка записи: '+error.message); return; }
    cloudHash=localHash;
    lastSent=localHash;
    try { localStorage.setItem(flagKey,localHash); } catch (_) {}
    status('сохранено в облаке');
  }
  const channel=supabase.channel('gp-sync-'+resource+'-'+owner_id)
    .on('postgres_changes',{
      event:'UPDATE',schema:'public',table,filter:'owner_id=eq.'+owner_id
    },event=>{
      if(event.new?.resource_id!==resource) return;
      const incoming=event.new.snapshot;
      const receivedHash=hash(incoming);
      if(receivedHash===hash(snapshot())) {cloudHash=receivedHash;lastSent=receivedHash;return;}
      if(hash(snapshot())!==lastSent) {
        status('конфликт: локальные изменения ещё не синхронизированы');
        return;
      }
      status('обновляю данные');
      restore(incoming);
    }).subscribe();
  window.addEventListener('storage',event=>{if(keys.includes(event.key))void upload();});
  window.addEventListener('online',()=>void upload());
  setInterval(()=>void upload(),1800);
  window.addEventListener('pagehide',()=>{void supabase.removeChannel(channel);});
})();
