let log = console.log.bind(console);//bind our console to a variable
let version = "0.0.1";
let cacheName = "ChallengeFinBIYAGA";
let cache = cacheName + "-" + version;
let filesToCache = [
    './',
    './index.html',
    './app.js',
    './idb.js',
    './css/bootstrap.css',
    './css/bootstrap.min.css',
    './css/mdb.css',
    './css/mdb.min.css',
    './css/style.css',
    './css/style.min.css',
    // 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    // 'https://mdbootstrap.com/material-design-for-bootstrap/',
//     './img/01.jpg',
//     './img/bg-7.jpg',
//     './js/bootstrap.js',
//     './js/bootstrap.min.js',
//     './js/jquery-3.2.1.min.js',
//     './js/mdb.js',
//     './js/mdb.min.js',
//     './js/popper.min.js',
//     './scss/core/bootstrap/_functions.scss',
//     './scss/core/bootstrap/_variables.scss',
//     './scss/core/_colors.scss',
//     './scss/core/_global.scss',
//     './scss/core/_helpers.scss',
//     './scss/core/_masks.scss',
//     './scss/core/_mixins.scss',
//     './scss/core/_typography.scss',
//     './scss/core/_variables.scss',
//     './scss/core/_waves.scss',
//     './scss/free/_animations-basic.scss',
//     './scss/free/_animations-extended.scss',
//     './scss/free/_badges.scss',
//     './scss/free/_buttons.scss',
//     './scss/free/_cards.scss',
//     './scss/free/_carousels.scss',
//     './scss/free/_dropdowns.scss',
//     './scss/free/_footers.scss',
//     './scss/free/_forms.scss',
//     './scss/free/_input-group.scss',
//     './scss/free/_list-group.scss',
//     './scss/free/_modals.scss',
//     './scss/free/_msc.scss',
//     './scss/free/_navbars.scss',
//     './scss/free/_pagination.scss',
//     './scss/free/_tables.scss',
//     './scss/_custom.scss',
//     './scss/mdb.scss'
  ];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
    })
  );
});



// let cacheName = 'myFilesToCache-v2';
// let filesToCache here
// install event here

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');

    e.waitUntil(
        caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );

    return self.clients.claim();
});



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function(cache) {
                  return cache.match('./index.html');
                });
            });
        }
      })
  );
});      

        
        
        // // '/ChallengeFin/font/Roboto-Bold.eot',
        // // '/ChallengeFin/font/Roboto-Bold.ttf',
        // // '/ChallengeFin/font/Roboto-Bold.woff',
        // // '/ChallengeFin/font/Roboto-Bold.woff2',
        // // '/ChallengeFin/font/Roboto-Light.eot',
        // // '/ChallengeFin/font/Roboto-Light.ttf',
        // // '/ChallengeFin/font/Roboto-Light.woff',
        // // '/ChallengeFin/font/Roboto-Light.woff2',
        // // '/ChallengeFin/font/Roboto-Medium.eot',
        // // '/ChallengeFin/font/Roboto-Medium.ttf',
        // // '/ChallengeFin/font/Roboto-Medium.woff',
        // // '/ChallengeFin/font/Roboto-Medium.woff2',
        // // '/ChallengeFin/font/Roboto-Regular.eot',
        // // '/ChallengeFin/font/Roboto-Regular.ttf',
        // // '/ChallengeFin/font/Roboto-Regular.woff',
        // // '/ChallengeFin/font/Roboto-Regular.woff2',
        // // '/ChallengeFin/font/Roboto-Thin.eot',
        // // '/ChallengeFin/font/Roboto-Thin.ttf',
        // // '/ChallengeFin/font/Roboto-Thin.woff',
        // // '/ChallengeFin/font/Roboto-Thin.woff2',
        // 
