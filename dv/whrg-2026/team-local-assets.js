(() => {
  const requested=(new URLSearchParams(location.search).get('team')||'').toLowerCase();
  if(!requested.includes('spqr')) return;
  const card=document.getElementById('galleryCard');
  const add=()=>{
    const gallery=card?.querySelector('.gallery');
    if(!gallery || gallery.querySelector('[data-local-spqr]')) return false;
    const fig=document.createElement('figure');
    fig.className='gallery-item'; fig.dataset.localSpqr='1';
    fig.innerHTML='<img class="object-contain" src="./assets/spqr-t2-illustration.webp" alt="Локальная UI-иллюстрация SPQR humanoid"><figcaption class="gallery-caption"><b>WHRG project illustration</b><p>Локальная иллюстрация для интерфейса. Не документальная фотография и не точная копия Booster T2.</p><div class="gallery-actions"><a href="./assets/spqr-t2-illustration.webp" download>скачать WEBP ↓</a></div></figcaption>';
    gallery.prepend(fig); return true;
  };
  if(!add()){
    const o=new MutationObserver(()=>{if(add())o.disconnect()});
    o.observe(card,{childList:true,subtree:true});
  }
})();
