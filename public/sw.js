// A simple service worker that meets the PWA installability requirements
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A simple pass-through fetch handler is required by Chrome to trigger the PWA install prompt.
  // In a real offline-first PWA, you would add caching logic here.
});
