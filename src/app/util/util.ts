export async function getLocalStore(key: string | string[]) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (obj) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else {
        if (Array.isArray(key)) resolve(obj);
        else resolve(obj[key]);
      }
    })
  })
}

export async function setLocalStore(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(data, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError)
      else resolve(true);
    });
  })
}
