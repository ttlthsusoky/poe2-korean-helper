// Push notification service worker
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'POE2 헬퍼 업데이트',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'poe2-notification',
    vibrate: [200, 100, 200],
    actions: [
      {
        action: 'view',
        title: '확인'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('POE2 헬퍼', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('https://poe2-korean-helper.vercel.app')
    );
  }
});

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(backgroundSync());
  }
});

async function backgroundSync() {
  try {
    // 간단한 백그라운드 동기화 구현
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: Date.now() })
    });
    
    if (response.ok) {
      console.log('Background sync completed');
    }
  } catch (error) {
    console.log('Background sync failed:', error);
    throw error; // 재시도를 위해 에러 throw
  }
}