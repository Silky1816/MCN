self.Minecraft = {
  version: `Minecraft JavaScript Edition v${1.04}`,
  cache: true
};
self.addEventListener("activate",event => {
  event.waitUntil(caches.keys().then(versions => Promise.all(versions.map(cache => {
    if (cache.startsWith("Minecraft") && cache !== Minecraft.version) return caches.delete(cache);
  }))));
  event.waitUntil(clients.claim());
});
self.addEventListener("fetch",event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request).then(async response => {
      if (Minecraft.cache) caches.open(Minecraft.version).then(cache => cache.put(event.request,response));
      return response.clone();
    });
  }));
});