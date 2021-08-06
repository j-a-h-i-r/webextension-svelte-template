chrome.storage.local.get("key", ({ key }) => {
    console.log('Value from chrome.store', key);
});
