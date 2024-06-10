import {
    MediaLibraryWidgetOptions,
    MediaLibraryWidgetCallback,
    MediaLibraryWidgetOptionsExtended,
    InitialViewParameterEnum,
} from './interfaces/index';

class ImagekitMediaLibraryWidget {
    private IK_HOST: string = 'https://eml.imagekit.io';
    private IK_FRAME_TITLE: string = 'ImageKit Embedded Media Library';
    private callbackFunction: MediaLibraryWidgetCallback;
    private widgetHost: string;
    private view: string | undefined;
    private options: MediaLibraryWidgetOptionsExtended;
    private modal: HTMLDivElement | undefined;
    private ikFrame!: HTMLDivElement;

    private getDefaultOptions(): MediaLibraryWidgetOptionsExtended {
        return {
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
    }

    constructor(options: MediaLibraryWidgetOptions, callback: MediaLibraryWidgetCallback) {
        // Create global element references
        this.widgetHost = window.location.href;
        // Define option defaults 
        const defaults = this.getDefaultOptions();
        // Create options by extending defaults with the passed in arguments
        this.options = Object.assign({}, defaults, options);
        this.callbackFunction = callback;
        this.view = this.options.view;
        this.buildOut();
        this.setListeners.bind(this)
        this.setListeners(this.modal!, this.callbackFunction, this.IK_HOST, this.close.bind(this));
    }

    private buildOut(): void {
        let container: Element | null, docFragment: DocumentFragment, mainFrame: HTMLIFrameElement, button: HTMLButtonElement | undefined;

        // If container is an HTML string, find the DOM node, else use it directly.
        if (typeof this.options.container === "string") {
            container = document.querySelector(this.options.container);
        } else {
            container = this.options.container;
        }

        // Create a DocumentFragment to build with
        docFragment = document.createDocumentFragment();

        // Create ikFrame element
        this.ikFrame = document.createElement("div") as HTMLDivElement & { callback: MediaLibraryWidgetCallback };
        this.ikFrame.className = this.options.className || ""; // Assign an empty string as the default value
        this.ikFrame.style.height = this.options?.containerDimensions?.height || "100%";
        this.ikFrame.style.width = this.options?.containerDimensions?.width || "100%";
        // this.ikFrame.callback = this.callbackFunction;


        mainFrame = document.createElement("iframe");
        mainFrame.title = this.IK_FRAME_TITLE;
        mainFrame.src = this.generateInitialUrl();
        mainFrame.setAttribute('sandbox', 'allow-top-navigation allow-same-origin allow-scripts allow-forms allow-modals');
        mainFrame.height = this.options?.dimensions?.height || "100%";
        mainFrame.width = this.options?.dimensions?.width || "100%";
        mainFrame.style.border = this.options.style.border;

        this.ikFrame.appendChild(mainFrame);

        if (this.view?.toLowerCase() !== 'modal') {
            // Append ikFrame to DocumentFragment
            docFragment.appendChild(this.ikFrame);

            // Append DocumentFragment to body
            if (container) container.appendChild(docFragment);
        } else {
            if (this.options.renderOpenButton) {
                // create button
                button = document.createElement("button");
                button.innerHTML = "Open Media Library";
                button.onclick = () => {
                    modal.style.display = "block";
                }
            }

            // create modal
            const modal = document.createElement("div");
            const modalContent = document.createElement("div");
            modal.classList.add("ik-media-library-widget-modal");
            modalContent.classList.add("ik-media-library-widget-modal-content");
            modalContent.appendChild(this.ikFrame);
            modal.appendChild(modalContent);
            this.modal = modal;

            // append button and modal to docFragment
            if (button && this.options.renderOpenButton) {
                docFragment.appendChild(button);
            }
            docFragment.appendChild(modal);

            // append docFragment to container
            if (container) container.appendChild(docFragment);
        }

        const iframe = document.querySelector(`[title="${this.IK_FRAME_TITLE}"]`) as HTMLIFrameElement;
        if (iframe) {
            this.postMessageOnLoad(iframe, this.options, this.IK_HOST);
        }
    }

    private generateInitialUrl(): string {
        if (this.options?.mlSettings?.initialView) {
            // check if key exists in InitialViewParameterEnum
            const key = Object.keys(this.options.mlSettings.initialView)[0];
            if (Object.values(InitialViewParameterEnum).includes(key as InitialViewParameterEnum)) {
                return `${this.IK_HOST}/media-library-widget?redirectTo=media-library-widget&isMediaLibraryWidget=true&widgetHost=${this.widgetHost}&mlWidgetInitialView=${JSON.stringify(this.options.mlSettings.initialView)}`;
            }
        }
        return `${this.IK_HOST}/media-library-widget?redirectTo=media-library-widget&isMediaLibraryWidget=true&widgetHost=${this.widgetHost}`;
    }

    private postMessageOnLoad(iframe: HTMLIFrameElement, options: MediaLibraryWidgetOptionsExtended, IK_HOST: string) {

        iframe.onload = function () {
            if (iframe.contentWindow) {
                iframe.contentWindow.postMessage(JSON.stringify({
                    mlSettings: options.mlSettings,
                }), IK_HOST);
            }
        };
    }

    private close(): void {
        if (this.view?.toLowerCase() === 'modal') {
            this.closeModal();
        }
    }

    private closeModal(): void {
        if(this.modal)
        {
            this.modal.style.display = "none";
        }
    }

    private setListeners(modal: HTMLDivElement, callbackFunction: MediaLibraryWidgetCallback, IK_HOST: string, close: () => void): void {

        window.onclick = function (event) {
            if (event.target == modal) {
                close();
            }
        }
        // Called sometime after postMessage is called
        window.addEventListener("message", function (event) {
            if (event.origin !== IK_HOST) {
                return;
            }

            if (event.data.eventType === "CLOSE_MEDIA_LIBRARY_WIDGET" || event.data.eventType === "INSERT") {
                callbackFunction(event.data);
                close();
            }
        });
    }

}

declare global {
    interface Window {
        IKMediaLibraryWidget: typeof ImagekitMediaLibraryWidget;
    }
}

window.IKMediaLibraryWidget = ImagekitMediaLibraryWidget;

export default ImagekitMediaLibraryWidget;
