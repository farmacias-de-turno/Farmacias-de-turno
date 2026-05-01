const CACHE_NAME = 'farmacia-v2';
const ASSETS = [
    './',
    './index.html',
    './script.js',
    './manifest.json',
    './img/logo-andresito.png',
    './img/redfarmako.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});