const CACHE_NAME = 'farmacia-v1';

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// El evento fetch es obligatorio para que aparezca la opción de "Descargar app"
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});