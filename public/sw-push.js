// Push notification and background sync service worker extensions

// Background sync event handler
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // 오프라인 상태에서 저장된 데이터 동기화
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncDataToServer(offlineData);
      await clearOfflineData();
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Push notification event handler
self.addEventListener('push', event => {
  if (!event.data) return;

  const options = {
    body: event.data.text() || 'POE2 헬퍼 업데이트',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'poe2-update',
    actions: [
      {
        action: 'view',
        title: '확인',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'dismiss',
        title: '닫기'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('POE2 헬퍼', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('https://poe2-korean-helper.vercel.app')
    );
  }
});

// Utility functions for offline data management
async function getOfflineData() {
  try {
    const db = await openDB();
    return await db.getAll('offline-store');
  } catch {
    return [];
  }
}

async function syncDataToServer(data) {
  // 실제 서버 동기화 로직은 필요에 따라 구현
  console.log('Syncing offline data:', data);
}

async function clearOfflineData() {
  try {
    const db = await openDB();
    await db.clear('offline-store');
  } catch (error) {
    console.log('Failed to clear offline data:', error);
  }
}

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('poe2-helper', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('offline-store')) {
        db.createObjectStore('offline-store', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}