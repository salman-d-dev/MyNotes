const CACHE_NAME = 'my-notes-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Remove duplicate '/' here if it's not intended
  // Add other URLs 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

//**Activation Event Listener ** will check activating state of service worker.
self.addEventListener('activate', event =>{
  console.log("Activating SW");
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  console.log(`Fetching ${event.request.url}`);
  // Check if request scheme is supported
  if (event.request.url.startsWith('http')) {
    if(navigator.onLine){
      //we need to close the response because it is a stream consumable only once , since we're doing it twice by cache and by browser for fetch

      let fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        function(response){
          //check if valid response
          if(!response || response.status !== 200 || response.type !== 'basic'){
            return response
          }

          //clone the response as the browser and the cache will have to consume it
          let responseToCache = response.clone();
          caches.open(CACHE_NAME)
          .then( function(cache){
            cache.put(event.request, responseToCache)
          });

          return response;

        }
      )
    } else {
      event.respondWith(
        caches.match(event.request)
        .then( function(response){
          //cache-hit, return response
          if(response){
            return response;
          }
        })
      )
    }
  }
});
