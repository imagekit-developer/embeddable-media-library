[<img width="250" alt="ImageKit.io" src="https://raw.githubusercontent.com/imagekit-developer/imagekit-javascript/master/assets/imagekit-light-logo.svg"/>](https://imagekit.io)

# ImageKit Media Library Widget

[![npm version](https://img.shields.io/npm/v/imagekit-media-library-widget)](https://www.npmjs.com/package/imagekit-media-library-widget)

This plugin provides access to ImageKit Media Library through an embeddable UI within your own CMS or website.

![01-mlw-intro.png](assets/screenshots/01-mlw-intro.png)

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Demo](#demo)
1. [Integrations](#integrations)
    1. [CKEditor](#ckeditor)

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

Check out our detailed guide on ImageKit Docs: [Media Library Widget](https://docs.imagekit.io/sample-projects/imagekit-media-library-widget)

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

**Note: Google Chrome (Incognito)**

In order to use this plugin on Google Chrome in Incognito mode, you need to enable third-party cookies:

![07-mlw-incognito.png](assets/screenshots/07-mlw-incognito.png)

---

## Demo

Install dependencies and serve the included demo `sample-app`:

```bash
cd samples/sample-app
npm install
npm start
```
The sample app should be available on `http://localhost:3000`.

---

## Integrations

### CKEditor

This repository includes a custom build for CKEditor 5 that integrates the widget using [imagekit-ckeditor5-plugin](https://www.npmjs.com/package/imagekit-ckeditor5-plugin). 

![01-mlw-ck.gif](assets/gifs/01-mlw-ck.gif)

#### Installing the included CKEditor build

Build the editor:

```bash
cd embeddable-media-library/samples/sample-ckeditor/
npm install
npm run build
```

Copy it to your web project directory:

```bash
cp -r build/ <path_to_your_app_directory>/ckeditor/
```

Configure it within your web app:

```html
<html>
  <body>
    <!-- This is where the CKEditor will be rendered -->
    <div class="editor"></div>
    <!-- This will be used by media library widget -->
    <div id="container"></div>
  </body>

  <!-- include custom ckeditor -->
  <script src="<path_to_your_webpage_source>/ckeditor.js"></script>

  <!-- configure the editor and widget -->
  <script>
  // ckeditor
  var editor;

  // imagekit media library widget configuration
  var pluginOptions = {
    container: '#container',
    className: 'media-library-widget',
    dimensions: {
      height: '100%',
      width: '100%',
    },
  };

  // initialize ckeditor
  ClassicEditor
    .create(document.querySelector('.editor'), {
        imagekitMediaLibraryWidget: {
          config: pluginOptions
        }
      })
    .then(newEditor => {
      editor = newEditor;
      window.editor = newEditor;
    }).catch(error => {
      console.error(error);
    });
  </script>
</html>
```
