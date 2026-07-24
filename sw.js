/* =====================================
   AI Tools Directory Service Worker
   Version 1.0.0
===================================== */

const CACHE_NAME = "ai-tools-directory-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./404.html",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

/* Install */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            console.log("Caching files...");

            return cache.addAll(ASSETS);

        })

    );

    self.skipWaiting();

});

/* Activate */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        console.log("Deleting old cache:", key);

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/* Fetch */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(cached => {

            return cached ||

                fetch(event.request)

                .then(response => {

                    const responseClone = response.clone();

                    caches.open(CACHE_NAME)

                    .then(cache => {

                        cache.put(event.request, responseClone);

                    });

                    return response;

                })

                .catch(() => {

                    if (
                        event.request.headers.get("accept") &&
                        event.request.headers.get("accept").includes("text/html")
                    ) {

                        return caches.match("./404.html");

                    }

                });

        })

    );

});
