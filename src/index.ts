import {
    MediaLibraryWidgetOptions,
    MediaLibraryWidgetCallback,
    MediaLibraryWidgetOptionsExtended,
    InitialViewParameterEnum,
} from './interfaces/index';

export class ImagekitMediaLibraryWidget {
    private IK_HOST: string = 'https://eml.imagekit.io';
    private IK_FRAME_TITLE: string = 'ImageKit Embedded Media Library';
    private callbackFunction: MediaLibraryWidgetCallback;
    private widgetHost: string;
    private view: string | undefined;
    private options: MediaLibraryWidgetOptionsExtended;
    private modal: HTMLDivElement | undefined;
    private ikFrame!: HTMLDivElement;
    private styleEl: HTMLStyleElement | undefined;

    private windowClickHandler: (event: MouseEvent) => void;
    private messageHandler: (event: MessageEvent) => void;

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
        this.options = this.getDefaultOptions();
        // Create options by extending defaults with the passed in arguments
        if (options && typeof options === 'object') {
            Object.assign(this.options, options);
        }
        // Set callback function
        this.callbackFunction = callback && typeof callback === "function" ? callback : () => {};

        this.view = this.options.view;

        // Initialize event handlers for later removal
        this.windowClickHandler = (event: MouseEvent) => {
            if (this.modal && event.target === this.modal) {
                this.close();
            }
        };

        this.messageHandler = (event: MessageEvent) => {
            if (event.origin !== this.IK_HOST) {
                return;
            }
            if (event.data.eventType === "CLOSE_MEDIA_LIBRARY_WIDGET" || event.data.eventType === "INSERT") {
                this.callbackFunction(event.data);
                this.close();
            }
        };

        this.registerStyles();
        this.buildOut();
        this.setListeners();
    }

    private registerStyles(): void {
        this.styleEl = document.createElement('style');
        this.styleEl.innerHTML = `
            /* The Modal (background) */
            .ik-media-library-widget-modal {
                display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                padding-top: 2%; /* Location of the box */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0); /* Fallback color */
                background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
            }
            
            /* Modal Content */
            .ik-media-library-widget-modal-content {
                background-color: #fefefe;
                margin: auto;
                border: 1px solid #888;
                width: 96%;
                height: 94%;
            }
        `;
        document.head.appendChild(this.styleEl);
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

        mainFrame = document.createElement("iframe");
        mainFrame.title = this.IK_FRAME_TITLE;
        mainFrame.src = this.generateInitialUrl();
        mainFrame.setAttribute('sandbox', 'allow-top-navigation allow-same-origin allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-downloads');
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
                    if (this.modal) {
                        this.modal.style.display = "block";
                    }
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
                return `${this.IK_HOST}/media-library-widget?redirectTo=media-library-widget&isMediaLibraryWidget=true&widgetHost=${this.widgetHost}&mlWidgetInitialView=${btoa(JSON.stringify(this.options.mlSettings.initialView))}`;
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


    public open(): void {
        if (this.view?.toLowerCase() === 'modal' && this.modal) {
            this.modal.style.display = "block";
        }
    }

    private close(): void {
        if (this.view?.toLowerCase() === 'modal') {
            this.closeModal();
        }
    }

    private closeModal(): void {
        if (this.modal) {
            this.modal.style.display = "none";
        }
    }

    public destroy(): void {
        window.removeEventListener("click", this.windowClickHandler);
        window.removeEventListener("message", this.messageHandler);

        if (this.modal) {
            this.modal.remove();
            this.modal = undefined;
        } else if (this.ikFrame && this.ikFrame.parentNode) {
            this.ikFrame.parentNode.removeChild(this.ikFrame);
        }

        if (this.styleEl) {
            this.styleEl.remove();
            this.styleEl = undefined;
        }
    }

    private setListeners(): void {
        window.addEventListener("click", this.windowClickHandler);
        window.addEventListener("message", this.messageHandler);
    }

}

declare global {
    interface Window {
        IKMediaLibraryWidget: typeof ImagekitMediaLibraryWidget;
    }
}

window.IKMediaLibraryWidget = ImagekitMediaLibraryWidget;

export * from "./interfaces/index"