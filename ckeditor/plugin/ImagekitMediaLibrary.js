import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// This SVG file import will be handled by webpack's raw-text loader.
// This means that imagekitLogo will hold the source SVG.
import imagekitLogo from './imagekit-logo.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class ImagekitMediaLibrary extends Plugin {
    init() {
        const editor = this.editor || window.editor;

        editor.ui.componentFactory.add('imagekitMediaLibrary', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'ImageKit Media Library',
                icon: imagekitLogo,
                tooltip: true
            });

            // Callback executed once the image is clicked.
            view.on('execute', () => {
                const modal = document.querySelector('.ik-eml-modal');
                modal.style.display = "block";
            });

            return view;
        });
    }
}
