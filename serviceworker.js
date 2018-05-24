/*
 * serviceworker.js for restaurant review (rrv)
 */

var RRV_CACHE = "rest-review-cache-v4";
var RRV_CACHE_URLS = [
  '/',  // include the root
  '/index.html',
  '/restaurant.html',
  '/index.js',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];


// pause the install event until we cache necessary assets
this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('RRV_CACHE').then(function(cache) {
			return cache.addAll(RRV_CACHE_URLS);
   })
 );
});


/*
 * If the response is defined then there's a match and the cached
 * response is returned. If it's not defined, then no match and
 * the request needs to go to the web server to get it.
 */
this.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response){
		if(response)
			return response; // return cached item
		return fetch(event.request).then(function(response) {
			return response; // else return whatever requested
		});
	}));
});


// remove old cache if version changes
self.addEventListener("activate", function(event) {
  event.waitUntil(
    // .keys - array of all caches created by our app
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        // create an array of promises to pass to .all
        // by using .map to create a promise for each cache name
        // all promises (deletes) must pass success for Promise.all to succeed
        cacheNames.map(function(cacheName) {
          if (cacheName !== RRV_CACHE && cacheName.startsWith("rest-review-cache-")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



