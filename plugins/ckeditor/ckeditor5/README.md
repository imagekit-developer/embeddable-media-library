# ImageKit Media Library Widget plugin for CKEditor 5

This plugin integrates the ImageKit Media Library Widget in a custom CKEditor 5 build. 

## Installation

To integrate this plugin, you should make a custom build of CKEditor 5. Follow the instructions [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html).

Install the plugin in your custom CKEditor project folder:

```
cd <path_to_custom_ckeditor_build>
npm install --save-dev imagekit-media-library-widget-ckeditor5
```

## Configuration in CKEditor build

To load the plugin, configure your editor by editing the `ckeditor.js` file:

```js
// custom plugin
import ImagekitMediaLibraryWidget from 'imagekit-media-library-widget-ckeditor5/src';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  // include custom plugin in build
  ImagekitMediaLibraryWidget,
  // ...other components
];

export default Editor;
```

### Build your editor

```bash
npm run build
```

## Using the integration plugin in frontend

Import the generated build files in your frontend project and use it as follows:

**Example:**

```html
<div class="editor"></div>

<script src="<path_to_custom_ckeditor_build>/ckeditor.js"></script>
```

```js
// ckeditor
var editor;

// initialize ckeditor
ClassicEditor
  .create(document.querySelector('.editor'), {
    toolbar: {
      items: [
        // include custom IK ckeditor plugin
        'imagekitMediaLibraryWidget',
        // other ckeditor plugins
        // ...
      ]
    },
    // other settings
  })
  .then(newEditor => {
    editor = newEditor;
    window.editor = newEditor;
  }).catch(error => {
    console.error(error);
  });
```
