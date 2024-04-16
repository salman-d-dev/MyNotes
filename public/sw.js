// const CACHE_NAME = 'my-notes-cache-v1';

// self.addEventListener('fetch', event => {
//   console.log(`Fetching ${event.request.url}`);
//   // Check if request scheme is supported
//   if (event.request.url.startsWith('http')) {
//     if (navigator.onLine) {
//       // Fetch dynamic data directly without caching
//       if (event.request.url.includes('/api/v1/notes')) {
//         return fetch(event.request);
//       }

//       // For other requests, cache and respond
//       let fetchRequest = event.request.clone();
//       return fetch(fetchRequest).then(
//         function(response) {
//           // Check if valid response
//           if (!response || response.status !== 200 || response.type !== 'basic') {
//             return response;
//           }

//           // Clone the response and cache it
//           let responseToCache = response.clone();
//           caches.open(CACHE_NAME)
//             .then(function(cache) {
//               cache.put(event.request, responseToCache);
//             });

//           return response;
//         }
//       )
//     } else {
//       // Respond with cached resources if offline
//       event.respondWith(
//         caches.match(event.request)
//           .then(function(response) {
//             // Cache hit, return response
//             if (response) {
//               return response;
//             }
//           })
//       )
//     }
//   }
// });
