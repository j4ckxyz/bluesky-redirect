# Bluesky Redirect Extension

A Chromium browser extension that automatically redirects `bsky.app` links to alternative Bluesky clients like `deer.social`.

## Features

- 🔄 **Automatic Redirects**: Redirects all `bsky.app` URLs to your preferred Bluesky client
- 🎯 **Customizable Target**: Set any alternative Bluesky client URL (defaults to `deer.social`)
- ⚡ **Instant Redirection**: Works for direct navigation, link clicks, and external links
- 🔧 **Easy Configuration**: Simple popup interface for settings
- ✅ **Smart Matching**: Preserves all URL paths, query parameters, and fragments
- 🎛️ **Toggle Control**: Enable/disable redirects without uninstalling

## URL Examples

The extension redirects all URLs under `bsky.app` to your preferred client while preserving:
- Profile paths
- Post identifiers
- Feed names
- Any URL parameters

### Common Redirect Patterns

1. **User Profiles**
   - `https://bsky.app/profile/alice.bsky.social` 
     → `https://deer.social/profile/alice.bsky.social`

2. **Individual Posts**
   - `https://bsky.app/profile/bob.bsky.social/post/3kp7q2fq7bv2a`
     → `https://deer.social/profile/bob.bsky.social/post/3kp7q2fq7bv2a`

3. **Feeds**
   - `https://bsky.app/profile/did:plc:xyz123/feed/my-fav-feed`
     → `https://deer.social/profile/did:plc:xyz123/feed/my-fav-feed`

4. **Custom Algorithms**
   - `https://bsky.app/profile/bsky.app/feed/whats-hot`
     → `https://deer.social/profile/bsky.app/feed/whats-hot`

5. **Search Results**
   - `https://bsky.app/search?q=bluesky`
     → `https://deer.social/search?q=bluesky`

### Custom Client Examples

Set these as your redirect target:
```
https://deer.social
https://sky.pablof7z.com
https://bs.jazco.io
https://www.arcst.one
https://www.chronik.one
```
## Popular Alternative Clients

The extension comes with quick-select buttons for popular alternatives:
- **deer.social** (default) - Enhanced Bluesky client
- **bluesky.app** - Original client (for reverting)
- **staging.bsky.app** - Staging environment

Or enter any custom URL that follows the same URL structure as bsky.app.

### Installation

### From GitHub Release

1. Go to the [Releases page](https://github.com/[YOUR_REPO]/releases) for this extension
2. Download the latest `bluesky-redirect-extension.zip` file
3. Extract the ZIP file to a folder on your computer
4. Open Chrome/Chromium and navigate to `chrome://extensions/`
5. Enable "Developer mode" in the top right
6. Click "Load unpacked" and select the extracted folder
7. The extension will appear in your toolbar

### From Source (Developer Mode)

1. Clone this repository `git clone https://github.com/[YOUR_REPO]/bluesky-redirect-extension.git`
2. Open Chrome/Chromium and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the cloned repository directory
5. The extension will appear in your toolbar

### Configuration

1. Click the extension icon in the toolbar
2. Toggle "Enable redirects" on/off as needed
3. Enter your preferred redirect URL (e.g., `https://deer.social`)
4. Click "Save Settings"
5. Test with the preview to see how URLs will be transformed

## How It Works

The extension uses multiple approaches to ensure comprehensive redirect coverage:

1. **Content Script**: Immediate redirect for direct navigation to bsky.app
2. **Background Script**: Handles navigation events and external link clicks
3. **Web Navigation API**: Intercepts navigation events before page load

This multi-layered approach ensures that redirects work for:
- Typing `bsky.app` URLs directly in the address bar
- Clicking links from other websites
- Following links from emails or other applications
- Bookmarks and history navigation

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: `storage`, `webNavigation`, `activeTab`
- **Host Permissions**: Only `bsky.app` domains
- **Storage**: Uses Chrome's sync storage for settings persistence

## Privacy

- The extension only accesses `bsky.app` URLs
- No data is collected or transmitted to external servers
- Settings are stored locally in your browser
- No tracking or analytics

## Troubleshooting

### Redirects Not Working?
1. Check that the extension is enabled in `chrome://extensions/`
2. Verify that redirects are enabled in the extension settings
3. Make sure your target URL is valid (starts with `http://` or `https://`)

### Want to Temporarily Disable?
Just click the extension icon and toggle "Enable redirects" off.

### Need to Change the Target URL?
Click the extension icon, enter a new URL, and click "Save Settings".

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `background.js` - Service worker for navigation handling
- `content.js` - Content script for immediate redirects
- `popup.html/css/js` - Settings interface
- Icon files for the extension

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

**Disclaimer:** This software is provided "as is", without warranty of any kind, express or implied. The author shall not be held liable for any damages arising from the use of this extension.

## Credits & Development

- **Maintainer**: [Bluesky @j4ck.xyz](https://bsky.app/profile/j4ck.xyz)  
- **Coded with** Claude 4 Sonnet AI assistant  
- **Goose Platform**: Part of the "Codename Goose" vibecoding project  
- **Special Thanks**: Deer.social team for inspiring this redirect tool

_"When goose honks, bluesky links redirect!"_ 🦢✨
