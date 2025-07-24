// Popup script for managing settings

const DEFAULT_REDIRECT_URL = 'https://deer.social';
const DEFAULT_TEST_URL = 'https://bsky.app/profile/example.bsky.social';

// DOM elements
const enableToggle = document.getElementById('enableToggle');
const redirectUrlInput = document.getElementById('redirectUrl');
const resetBtn = document.getElementById('resetBtn');
const testUrlInput = document.getElementById('testUrl');
const resultUrlInput = document.getElementById('resultUrl');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');
const exampleBtns = document.querySelectorAll('.example-btn');

// Load settings on popup open
document.addEventListener('DOMContentLoaded', async () => {
  const settings = await chrome.storage.sync.get(['redirectUrl', 'enabled']);
  
  enableToggle.checked = settings.enabled !== false; // default to true
  redirectUrlInput.value = settings.redirectUrl || DEFAULT_REDIRECT_URL;
  testUrlInput.value = DEFAULT_TEST_URL;
  
  updateTestResult();
});

// Update test result when redirect URL changes
redirectUrlInput.addEventListener('input', updateTestResult);

// Reset button functionality
resetBtn.addEventListener('click', () => {
  redirectUrlInput.value = DEFAULT_REDIRECT_URL;
  updateTestResult();
  showStatus('Reset to default URL', 'success');
});

// Example button functionality
exampleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-url');
    redirectUrlInput.value = url;
    updateTestResult();
    showStatus(`Set to ${new URL(url).hostname}`, 'success');
  });
});

// Save settings
saveBtn.addEventListener('click', async () => {
  const redirectUrl = redirectUrlInput.value.trim();
  const enabled = enableToggle.checked;
  
  // Validate URL
  if (!isValidUrl(redirectUrl)) {
    showStatus('Please enter a valid URL', 'error');
    return;
  }
  
  // Save settings
  await chrome.storage.sync.set({
    redirectUrl: redirectUrl,
    enabled: enabled
  });
  
  showStatus('Settings saved successfully!', 'success');
});

// Helper functions
function updateTestResult() {
  const redirectUrl = redirectUrlInput.value.trim();
  const testUrl = testUrlInput.value;
  
  if (isValidUrl(redirectUrl) && testUrl.includes('bsky.app/')) {
    try {
      const hostname = new URL(redirectUrl).hostname;
      const result = testUrl.replace('bsky.app', hostname);
      resultUrlInput.value = result;
    } catch (e) {
      resultUrlInput.value = 'Invalid redirect URL';
    }
  } else {
    resultUrlInput.value = 'Enter a valid redirect URL';
  }
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function showStatus(message, type) {
  status.textContent = message;
  status.className = `status ${type}`;
  
  // Hide status after 3 seconds
  setTimeout(() => {
    status.style.opacity = '0';
    setTimeout(() => {
      status.className = 'status';
    }, 300);
  }, 3000);
}
