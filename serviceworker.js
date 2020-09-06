const CACHE_NAME = 'v1';
const urlsToCache = ['index.html', 'offline.html'];

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(){
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

this.addEventListener('activate', function(event) {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then(function(cacheKeys){
            return Promise.all(
                cacheKeys.map(cacheName => {
                    if(!cacheWhiteList.includes(cacheName)){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});