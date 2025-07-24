// Content script for immediate redirects
(async function() {
  // Get settings from storage
  const settings = await chrome.storage.sync.get(['redirectUrl', 'enabled']);
  
  // Check if redirects are enabled
  if (!settings.enabled) return;
  
  const redirectUrl = settings.redirectUrl || 'https://deer.social';
  const currentUrl = window.location.href;
  
  // Check if we're on bsky.app and should redirect
  if (currentUrl.includes('bsky.app/')) {
    const newUrl = currentUrl.replace('bsky.app', new URL(redirectUrl).hostname);
    
    // Immediate redirect
    window.location.replace(newUrl);
  }
})();
