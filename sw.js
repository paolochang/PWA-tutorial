const staticCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/src/script/app.js',
  '/src/script/ui.js',
  '/src/script/materialize.min.js',
  '/src/css/materialize.min.css',
  '/src/css/styles.css',
  '/src/assets/images/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/src/app/pages/about.html',
  '/src/app/pages/contact.html'
];

// install service worker
self.addEventListener('install', event => {
  // console.log('service worker has been installed');

  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  )
});

// activate event
self.addEventListener('activate', event => {
  // console.log('service worker has been activated');
})

// fetch event
self.addEventListener('fetch', event => {
  // console.log('fetch event', event);

  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request);
    })
  )
})