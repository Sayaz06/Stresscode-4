// ✅ Service Worker untuk Stresscode-4
const CACHE_NAME = "stresscode4-cache-v17";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles.css",
  "./app.js",
  "./ui.js",
  "./data.js",
  "./auth.js",
  "./state.js",
  "./firebase-config.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// ✅ Install SW & cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// ✅ Activate SW & delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// ✅ Fetch handler (cache-first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          caches.match("./index.html")
        )
      );
    })
  );
});

