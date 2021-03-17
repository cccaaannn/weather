// guide
// https://www.youtube.com/watch?v=E8BeSSdIUW4&ab_channel=vaadinofficial

const cacheName = "weather_static";
const staticAssets = [
    "./", 
    "./src/js/app.js",
    "./src/js/weather.js",
    "./src/js/utilities.js",
    "./src/js/storage.js",
    "./src/js/ui.js", 
    "./src/css/styles.css", 
    "./src/icons/icon-192x192.png"
]

self.addEventListener("install", async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting()
});

self.addEventListener("activate", e => {
    self.clients.claim();
});

self.addEventListener("fetch", async e => {
    const req = e.request;
    const url = new URL(req.url);

    // if we are fetching from app cache first 
    if(url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } 
    else{
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req){
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName);
    try{
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    }
    catch(e){
        const cached = await cache.match(req);
        return cached;
    }
}

