const CACHE = 'sinif-takip-v7';
const CDN = ['cdn.tailwindcss.com', 'cdnjs.cloudflare.com', 'www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'].map(u => c.add(u).catch(() => {})))));
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
    // Hızlı açılış: önbellekten hemen ver, arkada yenile (yeni sürüm bir sonraki açılışta; sürüm uyarısı da bildirir)
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then(hit => {
        const net = fetch(req, { cache: 'reload' }).then(r => { if (r && r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => hit);
        return hit || net;
      })
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
