'use strict';
import styles from './styles.css'

function ImagekitMediaLibraryWidget() {
  var IK_HOST = 'https://eml.imagekit.io';
  var IK_SRC = `${IK_HOST}/media-library-widget?redirectTo=media-library-widget&isMediaLibraryWidget=true`;
  var IK_FRAME_TITLE = 'ImageKit Embedded Media Library';
  var insertCallback;

  // Define constructor 
  var IKMediaLibraryWidget = function () {
    // Create global element references
    this.security = null;
    this.widgetHost = window.location.href;

    // Define option defaults 
    var defaults = {
      className: "",
      container: "",
      containerDimensions: {
        height: '100%',
        width: '100%'
      },
      dimensions: {
        height: '100%',
        width: '100%'
      },
      style: {
        border: 'none'
      },
      view: 'modal',
      renderOpenButton: true,
    };

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = Object.assign({}, defaults, arguments[0]);
    }

    // Set callback function
    if (arguments[1] && typeof arguments[1] === "function") {
      this.callback = arguments[1];
      insertCallback = this.callback;
    }

    this.init();
  }

  IKMediaLibraryWidget.prototype.init = function () {
    buildOut.call(this);
  }

  var button, modal, modalContent; // modal-only elements

  function buildOut() {
    var container, docFragment, mainFrame; // common elements

    // If container is an HTML string, find the DOM node, else use it directly.
    if (typeof this.options.container === "string") {
      container = document.querySelector(this.options.container);
    } else {
      container = this.options.container;
    }

    // Create a DocumentFragment to build with
    docFragment = document.createDocumentFragment();

    // Create ikFrame element
    this.ikFrame = document.createElement("div");
    this.ikFrame.className = this.options.className;
    this.ikFrame.style.height = this.options.containerDimensions.height;
    this.ikFrame.style.width = this.options.containerDimensions.width;
    this.ikFrame.callback = this.callback;

    mainFrame = document.createElement("iframe");
    mainFrame.title = IK_FRAME_TITLE;
    mainFrame.src = `${IK_SRC}&widgetHost=${this.widgetHost}`;
    mainFrame.sandbox = 'allow-top-navigation allow-same-origin allow-scripts allow-forms allow-modals';
    mainFrame.height = this.options.dimensions.height;
    mainFrame.width = this.options.dimensions.width;
    mainFrame.style.border = this.options.style.border;

    this.ikFrame.appendChild(mainFrame);

    if (this.options.view.toLowerCase() !== 'modal') {
      // Append ikFrame to DocumentFragment
      docFragment.appendChild(this.ikFrame);

      // Append DocumentFragment to body
      container.appendChild(docFragment);
    } else {
      if (this.options.renderOpenButton) {
        // create button
        button = document.createElement("button");
        button.innerHTML = "Open Media Library";
        button.onclick = function () {
          modal.style.display = "block";
        }
      }

      // create modal
      modal = document.createElement("div");
      modalContent = document.createElement("div");
      modal.classList.add("ik-media-library-widget-modal");
      modalContent.classList.add("ik-media-library-widget-modal-content");
      modalContent.appendChild(this.ikFrame);
      modal.appendChild(modalContent);

      // append button and modal to docFragment
      if (this.options.renderOpenButton) {
        docFragment.appendChild(button);
      }
      docFragment.appendChild(modal);

      // append docFragment to container
      container.appendChild(docFragment);
    }
  }

  function closeModal() {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  }

  // Called sometime after postMessage is called
  window.addEventListener("message", function (event) {
    if (event.origin !== IK_HOST) {
      return;
    }

    if (event.data.eventType === 'CLOSE_MEDIA_LIBRARY_WIDGET') {
      closeModal();
    } else if (event.data.eventType === 'INSERT') {
      insertCallback(event.data);
      closeModal();
    }
  });

  return window.IKMediaLibraryWidget = IKMediaLibraryWidget;
}

export default ImagekitMediaLibraryWidget();
