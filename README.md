# Production

## How to Install addon extension in Google Chrome browser

1. Open the Extension Management page by navigating to chrome://extensions.
    
    ( The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions. )

2. Enable Developer Mode by clicking the toggle switch next to Developer mode.

3. Click the LOAD UNPACKED button and select the extension directory. ( The "addon" Map )

# Development

### Install all package

- npm install
- npm install -g typescript

### Package

- Current Onsenui version 2.10.10
  - npm install onsenui

### Makefile

- production
  - Build addon
- develop
  - Watch typescript files
- server
  - Start server http localhost:4000
- clean
  - Remove addon build folder
- clean-tsc
  - Removes tsc build folder
