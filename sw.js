const CACHE_NAME = 'farmacia-v9';

// Activos estáticos: se sirven desde caché (cambian poco)
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './img/logo-andresito.png',
    './img/redfarmako.png'
];

// script.js usa network-first: siempre se intenta bajar fresco de la red
const NETWORK_FIRST_PATTERN = /script\.js(\?.*)?$/;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            cache.addAll([...STATIC_ASSETS, './script.js'])
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (NETWORK_FIRST_PATTERN.test(event.request.url)) {
        // Network-first para script.js: siempre intentar red primero
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
    } else {
        // Cache-first para el resto de activos estáticos
        event.respondWith(
            caches.match(event.request).then(response => response || fetch(event.request))
        );
    }
});
