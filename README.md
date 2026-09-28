[<img width="250" alt="ImageKit.io" src="https://raw.githubusercontent.com/imagekit-developer/imagekit-javascript/master/assets/imagekit-light-logo.svg"/>](https://imagekit.io)

# ImageKit Media Library Widget

[![npm version](https://img.shields.io/npm/v/imagekit-media-library-widget)](https://www.npmjs.com/package/imagekit-media-library-widget)

This plugin provides access to ImageKit Media Library through an embeddable UI within your own CMS or website.

![01-mlw-intro.png](assets/screenshots/01-mlw-intro.png)

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Demo](#demo)

---

## Installation

### Using CDN

```html
<script src="https://unpkg.com/imagekit-media-library-widget/dist/imagekit-media-library-widget.min.js"></script>
```

### Using NPM

Install `imagekit-media-library-widget`:

```bash
npm install --save imagekit-media-library-widget
```

Now include it in your JS code:

```js
// ES6 module
import IKMediaLibraryWidgetCore from 'imagekit-media-library-widget';

// Common JS syntax
const IKMediaLibraryWidgetCore = require("imagekit-media-library-widget");
```
---

## Usage

Check out our detailed guide on ImageKit Docs: [Media Library Widget](https://docs.imagekit.io/sample-projects/embeddable-media-library-widget)

### Quick start (HTML and JS)

Include the script in your HTML:

```html
<script src="https://unpkg.com/imagekit-media-library-widget/dist/imagekit-media-library-widget.min.js"></script>
```

Define a DOM container for the plugin. This accepts any CSS selector:

```html
<div id="container"></div>
```
or
```html
<div class="container"></div>
```

Configure and instantiate the plugin:

```js
// configuration options
var config = {
  container: '#container',   // the element in which the Media Library Widget will be rendered
  className: 'media-library-widget',
  dimensions: {
    height: '100%',
    width: '100%',
  },
  view: 'modal',  // inline | modal (default)
  renderOpenButton: true,  // false | true (default)
  /*
  mlSettings: {  // optional
    initialView: {  
      
      // sets initial state of Media Library, refer to the ImageKit Docs for more information
      // https://docs.imagekit.io/sample-projects/embeddable-media-library-widget

      // only one of the following parameters can be passed at a time
    
      folderPath: "<your-folder-path>",
      fileId: "<file_id>",
      searchQuery: "<search-query>",
      collection: { 
         // pass empty object to open Media Collections page
         id: "<collection-id>" // open specific Media Collection
      },
      fileType: "images" | "videos" | "cssJs" | "others"
    },
    multiple: true // false | true (default),
    maxFiles: 20 // relevant when `multiple` is true
    toolbar: {
      // sets the visibility of the toolbar buttons
      // defaults to true for all buttons except showAccountSwitcher
      showCloseButton: false,
      showInsertButton: false,
      showAccountSwitcher: true
    },
    queryParams: {
      // Add custom query parameters to the Media Library widget URL
      // These will be appended to the final URL as query parameters
      customParam1: "value1",
      customParam2: 123,
      customParam3: true
    },
    loginViaSSO: true, // to automatically initiate Single Sign-On (SSO) login by default
    widgetImagekitId: "<your-imagekit-id>" // the ImageKit ID used to authenticate and open the Media Library
  }
  */
};

// define callback handler
function callback(payload) {
  // this is the callback handler
  // … consume json payload …
}

// instantiate the Media Library Widget plugin
var mediaLibraryWidget = new IKMediaLibraryWidget(config, callback);
```

![01-mlw.gif](assets/gifs/01-mlw.gif)

### Switching between ImageKit accounts

If a user's email belongs to more than one ImageKit account, the widget can show a **Switch account** option in the account menu of its toolbar, next to **Log out**. It is off by default. Turn it on with `mlSettings.toolbar.showAccountSwitcher: true`.

- The option only appears when the logged-in user has access to more than one account.
- When `mlSettings.widgetImagekitId` is set, the widget stays on that account and the **Switch account** option is not shown.
- When the widget is opened with a signed login link, the **Switch account** option is not shown.
- After switching, the widget reloads in the selected account and opens the `initialView` passed in `mlSettings`, if any.

**Note: Google Chrome (Incognito)**

To use this plugin on Google Chrome in Incognito mode, you need to enable third-party cookies:

![07-mlw-incognito.png](assets/screenshots/07-mlw-incognito.png)

---

## Demo

Run following commands:

```bash
npm install
npm run sample
```
It will install dependencies and serve the included demo: `sample-app`.
The sample app should be available on `http://localhost:3000`.

### Playground

For trying out options while developing, run:

```bash
npm run playground
```

It builds the widget and serves `samples/eml-playground` on `http://127.0.0.1:3005`: a settings form for the widget, `mlSettings` and toolbar options, and a log of the `INSERT` and `CLOSE` callbacks. The **EML host** field points the widget at a different host.

To test logins with a signed link, copy `samples/eml-playground/sample.env` to `samples/eml-playground/.env`, fill in your account's public and private API keys, and restart the playground. The signature is created by the playground server, so the private key never reaches the browser. The signed login options only appear when both keys are set.

