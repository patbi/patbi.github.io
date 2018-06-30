self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/ChallengeFin/',
        '/ChallengeFin/index.html',
        '/ChallengeFin/app.js',
        '/ChallengeFin/idb.js',
        '/ChallengeFin/sw.js',
        '/ChallengeFin/index.js',        
        '/ChallengeFin/image-list.js',
        // '/ChallengeFin/css/bootstrap.css',
        // '/ChallengeFin/css/bootstrap.min.css',
        // '/ChallengeFin/css/mdb.css',
        // '/ChallengeFin/css/mdb.min.css',
        // '/ChallengeFin/css/style.css',
        // '/ChallengeFin/css/style.min.css',
        // 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        // 'https://mdbootstrap.com/material-design-for-bootstrap/',
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
        // '/ChallengeFin/img/01.jpg',
        // '/ChallengeFin/img/bg-7.jpg',
        // '/ChallengeFin/js/bootstrap.js',
        // '/ChallengeFin/js/bootstrap.min.js',
        // '/ChallengeFin/js/jquery-3.2.1.min.js',
        // '/ChallengeFin/js/mdb.js',
        // '/ChallengeFin/js/mdb.min.js',
        // '/ChallengeFin/js/popper.min.js',
        // '/ChallengeFin/scss/core/bootstrap/_functions.scss',
        // '/ChallengeFin/scss/core/bootstrap/_variables.scss',
        // '/ChallengeFin/scss/core/_colors.scss',
        // '/ChallengeFin/scss/core/_global.scss',
        // '/ChallengeFin/scss/core/_helpers.scss',
        // '/ChallengeFin/scss/core/_masks.scss',
        // '/ChallengeFin/scss/core/_mixins.scss',
        // '/ChallengeFin/scss/core/_typography.scss',
        // '/ChallengeFin/scss/core/_variables.scss',
        // '/ChallengeFin/scss/core/_waves.scss',
        // '/ChallengeFin/scss/free/_animations-basic.scss',
        // '/ChallengeFin/scss/free/_animations-extended.scss',
        // '/ChallengeFin/scss/free/_badges.scss',
        // '/ChallengeFin/scss/free/_buttons.scss',
        // '/ChallengeFin/scss/free/_cards.scss',
        // '/ChallengeFin/scss/free/_carousels.scss',
        // '/ChallengeFin/scss/free/_dropdowns.scss',
        // '/ChallengeFin/scss/free/_footers.scss',
        // '/ChallengeFin/scss/free/_forms.scss',
        // '/ChallengeFin/scss/free/_input-group.scss',
        // '/ChallengeFin/scss/free/_list-group.scss',
        // '/ChallengeFin/scss/free/_modals.scss',
        // '/ChallengeFin/scss/free/_msc.scss',
        // '/ChallengeFin/scss/free/_navbars.scss',
        // '/ChallengeFin/scss/free/_pagination.scss',
        // '/ChallengeFin/scss/free/_tables.scss',
        // '/ChallengeFin/scss/_custom.scss',
        // '/ChallengeFin/scss/mdb.scss',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/ChallengeFin/img/bg-7.jpg');
      });
    }
  }));
});

