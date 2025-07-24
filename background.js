// Background script for handling redirects

// Default redirect URL
const DEFAULT_REDIRECT_URL = 'https://deer.social';

// Initialize storage with default values
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    redirectUrl: DEFAULT_REDIRECT_URL,
    enabled: true
  });
});

// Handle navigation events
chrome.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    // Only handle main frame navigations (not iframes)
    if (details.frameId !== 0) return;
    
    const settings = await chrome.storage.sync.get(['redirectUrl', 'enabled']);
    
    // Check if redirects are enabled
    if (!settings.enabled) return;
    
    const redirectUrl = settings.redirectUrl || DEFAULT_REDIRECT_URL;
    const originalUrl = details.url;
    
    // Check if this is a bsky.app URL
    if (originalUrl.includes('bsky.app/')) {
      const newUrl = originalUrl.replace('bsky.app', new URL(redirectUrl).hostname);
      
      // Update the tab with the new URL
      chrome.tabs.update(details.tabId, { url: newUrl });
    }
  },
  {
    url: [
      {
        hostEquals: 'bsky.app'
      }
    ]
  }
);

// Handle links clicked from external sources
chrome.webNavigation.onCommitted.addListener(
  async (details) => {
    // Only handle main frame navigations
    if (details.frameId !== 0) return;
    
    const settings = await chrome.storage.sync.get(['redirectUrl', 'enabled']);
    
    // Check if redirects are enabled
    if (!settings.enabled) return;
    
    const redirectUrl = settings.redirectUrl || DEFAULT_REDIRECT_URL;
    const originalUrl = details.url;
    
    // Check if this is a bsky.app URL and it's a navigation (not a reload)
    if (originalUrl.includes('bsky.app/') && details.transitionType !== 'reload') {
      const newUrl = originalUrl.replace('bsky.app', new URL(redirectUrl).hostname);
      
      // Update the tab with the new URL
      chrome.tabs.update(details.tabId, { url: newUrl });
    }
  },
  {
    url: [
      {
        hostEquals: 'bsky.app'
      }
    ]
  }
);
