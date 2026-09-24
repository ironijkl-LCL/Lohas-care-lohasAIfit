// ==========================================
// Family OS Service Worker
// ==========================================

const CACHE_VERSION = '2025-01-15T10:30:00Z';  // build 時自動注入
const CACHE_NAME = `family-os-${CACHE_VERSION}`;

// ⚠️ 所有資源必須 same-origin（App Store 要求）
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/js/vendor/dompurify.min.js',
  '/js/vendor/html5-qrcode.min.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ==========================================
// Install
// ==========================================
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Failed to cache ${url}:`, err);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// ==========================================
// Activate
// ==========================================
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ==========================================
// Fetch
// ==========================================
function fetchWithTimeout(request, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), timeout);
    fetch(request).then(
      (res) => { clearTimeout(timer); resolve(res); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // 1. 只處理 GET
  if (e.request.method !== 'GET') {
    return;
  }

  // 2. 跳過 chrome-extension / devtools
  if (url.startsWith('chrome-extension://') || url.startsWith('devtools://')) {
    return;
  }

  // 3. 雲端 API → Network-First（with timeout）
  if (url.includes('firebaseio.com') || url.includes('googleapis.com') || url.includes('openfoodfacts.org')) {
    e.respondWith(
      fetchWithTimeout(e.request)
        .then((res) => {
          // 成功就 cache 一份（下次 offline 用）
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
          return res;
        })
        .catch(() => caches.match(e.request))
        .catch(() => new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }))
    );
    return;
  }

  // 4. Navigation request → Network-First with offline fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetchWithTimeout(e.request)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
          return res;
        })
        .catch(() => caches.match(e.request))
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // 5. 靜態資源 → Cache-First with background update
  e.respondWith(
    caches.match(e.request).then((cachedRes) => {
      if (cachedRes) {
        // 背景更新
        fetchWithTimeout(e.request, 5000)
          .then((networkRes) => {
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, networkRes));
          })
          .catch(() => {});
        return cachedRes;
      }
      return fetchWithTimeout(e.request)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
          return res;
        });
    })
  );
});

// ==========================================
// Push Notification
// ==========================================
self.addEventListener('push', (e) => {
  if (!e.data) return;

  let payload;
  try {
    payload = e.data.json();
  } catch {
    payload = { notification: { title: '🏠 Family OS', body: e.data.text() } };
  }

  const title = payload.notification?.title || '🏠 Family OS 提醒';
  const options = {
    body: payload.notification?.body || '您有一項即將開始的家庭行程。',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    data: payload.data || {},
    tag: payload.data?.tag || 'family-os-default',
    renotify: true,
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open', title: '開啟' },
      { action: 'dismiss', title: '稍後' }
    ]
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

// ==========================================
// Notification Click
// ==========================================
self.addEventListener('notificationclick', (e) => {
  e.notification.close();

  if (e.action === 'dismiss') return;

  const targetUrl = e.notification.data?.url || '/';

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 有開嘅 window → focus + navigate
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // 冇開 → 開新
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// ==========================================
// Message（主執行緒 ↔ SW 溝通）
// ==========================================
self.addEventListener('message', (e) => {
  if (e.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (e.data?.type === 'CLEAR_CACHE') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});
