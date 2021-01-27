[<img width="250" alt="ImageKit.io" src="https://raw.githubusercontent.com/imagekit-developer/imagekit-javascript/master/assets/imagekit-light-logo.svg"/>](https://imagekit.io)

# [WIP] ImageKit Media Library Widget

[![npm version](https://img.shields.io/npm/v/imagekit-media-library-widget)](https://www.npmjs.com/package/imagekit-media-library-widget)

This plugin provides access to ImageKit Media Library through an embeddable UI from within your own CMS or website.

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Development](#development)
1. [Demo](#demo)
1. [CKEditor Integration](#ckeditor-integration)

---

## Installation

### Using CDN

```html
<script src="https://unpkg.com/imagekit-media-library-widget/dist/imagekit-media-library-widget.min.js"></script>
```

### Using NPM

Install `imagekit-media-library-widget`

```bash
npm install --save imagekit-media-library-widget
```

Now include it in your JS code

```js
// ES6 module
import ImagekitMediaLibraryWidget from 'imagekit-media-library-widget';

// Common JS syntax
const ImageKit = require("imagekit-media-library-widget")
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

Write a script to configure, initialize and instantiate the plugin:

```js
// initialize the Media Library Widget plugin
this.ImagekitMediaLibraryWidget();

// configuration options
const config = {
  name: 'Media Library Widget',
  container: '#container',   // the element in which the Media Library Widget will be rendered
  className: 'media-library-widget',
  dimensions: {
    height: '100%',
    width: '100%',
  },
  view: 'modal',  // modal/inline
  showOpenButton: true,  // default
  widgetHost: 'http://localhost:3000'
};

// define callback handler
function callback(payload) {
  // this is the callback handler
  // … consume json payload …
}

// instantiate the Media Library Widget plugin
const myFrame = new IKFrame(config, callback);
```

---

## Development

### Clone the repository

```bash
git clone https://github.com/imagekit-developer/embeddable-media-library.git
```

### Build the plugin

Navigate to the repository folder:

```bash
cd embeddable-media-library/
```

Run npm commands:

```bash
npm install
npm run build
```

The generated files are available under `dist/` folder.

---

## Demo

Build the plugin:

```bash
npm install
npm run build
```

Then, serve the included demo `sample-app` as follows:

```bash
cd samples/sample-app
npm install
npm start
```
The sample app should be available on `http://localhost:3000`.

---

## CKEditor Integration

This repository also includes an integration plugin for CKEditor 5. 

### Using the included CKEditor custom build

```bash
cd embeddable-media-library/ckeditor/
npm install
npm run build
cp -r build/ <path_to_your_app_directory>/ckeditor
```

### Using the integration plugin in your own CKEditor custom build

The integration plugin files are located at `ckeditor/plugin/`.

```
embeddable-media-library/
|- ckeditor/
  |- plugin/
    |- imagekit-logo.svg
    |- ImagekitMediaLibraryWidget.js
```

You can copy the files into your own ckeditor build:

```bash
cd embeddable-media-library/
cp -r ckeditor/plugin <path_to_your_ckeditor_build_directory◊>
```

Import and include it in your ckeditor config as show in in `ckeditor/src/ckeditor.js`.

**Example:**

```js
// custom plugin
import ImagekitMediaLibraryWidget from './../plugin/ImagekitMediaLibraryWidget.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  // include custom plugin in build
  ImagekitMediaLibraryWidget,
  // ...other components
];

export default Editor;
```

Build your editor:

```bash
npm run build
```

Include the generated build files in your application and use them:

```html
<div class="editor"></div>
```

```js
// ckeditor
let editor;

// initialize ckeditor
ClassicEditor
  .create(document.querySelector('.editor'), {
    toolbar: {
      items: [
        // include custom IK ckeditor plugin
        'imagekitMediaLibraryWidget',
        // other ckeditor plugins
        'bold',
        'italic',
        // ...
      ]
    },
    language: 'en',
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    licenseKey: '',
  })
  .then(newEditor => {
    editor = newEditor;
    window.editor = newEditor;
  }).catch(error => {
    console.error(error);
  });
```
