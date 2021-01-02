# Embeddable Media Library

This plugin provides access to ImageKit Media Library through an embeddable UI from within your own CMS or website.

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Development](#development)
1. [CKEditor Integration](#ckeditor-integration)
1. [Demo](#demo)

## Installation

Thorugh CDN:

```html
<script src="<CDN_LINK>/imagekit-eml.min.js"></script>
```

Through npm:

```bash
npm install --save embeddable-media-library
```

Include it:

```js
import ImagekitEML from 'embeddable-media-library';
```

## Usage

Check out our detailed guide on ImageKit Docs: [Embeddable Media Library](https://docs.imagekit.io/sample-projects/embeddable-media-library)

### Quick start (HTML and JS)

Include the script in your HTML:

```html
<script src="<CDN_LINK>/imagekit-eml.min.js"></script>
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
// initialize the EML plugin
this.ImageKitEML();

// configuration options
const config = {
  name: 'Embedded Media Library',
  container: '#container',   // the element in which the EML will be rendered
  className: 'embedded-media-library',
  dimensions: {
    height: '100%',
    width: '100%',
  },
  view: 'modal',  // modal/inline
  showOpenButton: true  // default
};

// define callback handler
function callback(payload) {
  // this is the callback handler
  // … consume json payload …
}

// instantiate the EML plugin
const myFrame = new IKFrame(config, callback);
```

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
    |- ImagekitMediaLibrary.js
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
import ImagekitMediaLibrary from './../plugin/ImagekitMediaLibrary.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	// include custom plugin in build
  ImagekitMediaLibrary,
  // ...other components
];

export default Editor;
```

Build your editor:

```bash
npm run build
```

Include the generated build files in your application and use them.

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
