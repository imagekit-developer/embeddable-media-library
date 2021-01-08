import styles from './styles.css'

function ImagekitMediaLibraryWidget() {
  const IK_HOST = 'https://stage-eml.imagekit.io';
  // const IK_HOST = 'https://dev4.imagekit.io';
  const IK_SRC = `${IK_HOST}/media-library-widget`;
  const WIDGET_HOST = `http://localhost:3000`;
  const FULL_HOST = `${IK_SRC}?widgetHost=${WIDGET_HOST}`

  // Define constructor 
  this.IKFrame = function () {
    // Create global element references
    this.security = null;

    // Define option defaults 
    var defaults = {
      className: "ik-frame",
      container: "",
      containerDimensions: {
        height: '100%',
        width: '100%'
      },
      dimensions: {
        height: '100%',
        width: '100%'
      },
      name: 'ImageKit Media Library',
      style: {
        border: 'none'
      },
      view: 'modal',
      showOpenButton: true,
    };

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = Object.assign({}, defaults, arguments[0]);
    }

    // Set callback function
    if (arguments[1] && typeof arguments[1] === "function") {
      this.callback = arguments[1];
    }

    this.init();
  }

  IKFrame.prototype.init = function () {
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
    mainFrame.title = this.options.name;
    mainFrame.src = IK_SRC;
    // mainFrame.src = FULL_HOST;
    mainFrame.sandbox = 'allow-top-navigation allow-same-origin allow-scripts allow-forms';
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
      if (this.options.showOpenButton) {
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
      if (this.options.showOpenButton) {
        docFragment.appendChild(button);
      }
      docFragment.appendChild(modal);

      // append docFragment to container
      container.appendChild(docFragment);
    }
  }

  const closeModal = () => {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  }

  // Called sometime after postMessage is called
  window.addEventListener("message", (event) => {
    if (event.origin !== IK_HOST) {
      return;
    }

    if (event.data.eventType === 'CLOSE_MEDIA_LIBRARY_WIDGET') {
      closeModal();
    } else if (event.data.eventType === 'INSERT') {
      this.callback(event.data);
      closeModal();
    }
  });
}

export default ImagekitMediaLibraryWidget;