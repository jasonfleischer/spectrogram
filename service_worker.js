const CACHE_NAME = 'v13';
const ROOT_DIRECTORY_NAME = "spectrogram";
const CACHE = [
        '/'+ROOT_DIRECTORY_NAME+'/index.html',
        '/'+ROOT_DIRECTORY_NAME+'/css/bundle.css',
        '/'+ROOT_DIRECTORY_NAME+'/js/bundle.js'
      ];
	
self.addEventListener('install', function(event) {
    console.log(ROOT_DIRECTORY_NAME+': install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHE);
        }).then(function() { return self.skipWaiting(); })
    );
});

// network-first so new deployments are picked up; cache is the offline fallback
self.addEventListener('fetch', function(event) {
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;
    event.respondWith(
        fetch(event.request).then(function(response) {
            if (response && response.ok && new URL(event.request.url).origin === self.location.origin) {
                var copy = response.clone();
                caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
            }
            return response;
        }).catch(function() {
            return caches.match(event.request);
        })
    );
});

self.addEventListener('activate', function activator(event) {
    console.log(ROOT_DIRECTORY_NAME+': activate');
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        }).then(function() { return self.clients.claim(); })
    );
});
