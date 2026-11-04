// Monitoring portali — oddiy service worker: avval tarmoq, tarmoq bo'lmasa — saqlangan nusxa
const C = "mp-v1";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(["./", "./manifest.json", "./icon-192.png"])).catch(() => {})); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)).catch(() => {}); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("./"))));
});
