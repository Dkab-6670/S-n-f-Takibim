const CACHE = 'sinif-takip-v3';
const CDN = ['cdn.tailwindcss.com', 'cdnjs.cloudflare.com', 'www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', 'icon-192.png'])).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;
  if (!same && !CDN.includes(url.hostname)) return; // Firebase veritabanı ve giriş istekleri hiç karışılmaz

  if (same) {
    // Sayfanın kendisi: önce internet (yeni sürüm hemen gelsin), olmazsa önbellek
    e.respondWith(
      fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match('./')))
    );
  } else {
    // Tasarım ve simge kütüphaneleri: önbellekten hemen ver, arkada yenile
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; }).catch(() => hit);
        return hit || net;
      })
    );
  }
});
