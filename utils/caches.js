import { getList } from './fetchDB';

const fetchDataAndCache = async () => {
  if ('caches' in window) {
  try {
    // Check if cache exists
    const cacheNames = await caches.keys();
    const cacheExists = cacheNames.includes('keysCache');
    
    if (cacheExists) {
      // If cache exists, retrieve data from cache
      const cache = await caches.open('keysCache');
      const cachedResponse = await cache.match('https://api.example.com/data');

      if (cachedResponse) {
        const data = await cachedResponse.json();
        return Promise.resolve(data);
      }
    }
    
    // If cache doesn't exist or data not found in cache, fetch and cache data

    getList().then(async (response) => {

      console.log(response);
    const data = await response.data.record.data;   ;
    const cache = await caches.open('keysCache');
    const cacheRequest = new Request('https://api.example.com/data');
    const cacheResponse = new Response(JSON.stringify(data));
    await cache.put(cacheRequest, cacheResponse);

    return Promise.resolve(data);
    })
    .catch((err) => {
      throw err
    })
  } catch (error) {
    return Promise.reject("Failed to create cache", error);
  }
}else {
  return Promise.reject("Cache is not available");
}
};

export { fetchDataAndCache }
