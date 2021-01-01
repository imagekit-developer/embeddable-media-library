import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class ImagekitMediaLibrary extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('imagekitMediaLibrary', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'ImageKit Media Library',
                icon: imageIcon,
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

export default ImagekitMediaLibrary;