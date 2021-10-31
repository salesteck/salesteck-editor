/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/imageresize/imageresizeediting
 */

// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// import MediaResizeCommand from './mediaresizecommand';

import {Plugin} from 'ckeditor5/src/core';
import MediaResizeCommand from './mediaresizecommand';

/**
 * The image resize editing feature.
 *
 * It adds the ability to resize each image using handles or manually by
 * {@link @ckEditor5/media/mediaresize/mediaresizebuttons~MediaResizeButtons} buttons.
 *
 * @extends @ckEditor5/@ckeditor/ckeditor5/core/plugin~Plugin
 */
export default class MediaResizeEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckMediaResizeEditing';
    }

    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);

        editor.config.define('media', {
            resizeUnit: '%',
            resizeOptions: [
                {
                    name: 'mediaResize:original',
                    value: null,
                    icon: 'original'
                },
                {
                    name: 'mediaResize:25',
                    value: '25',
                    icon: 'small'
                },
                {
                    name: 'mediaResize:50',
                    value: '50',
                    icon: 'medium'
                },
                {
                    name: 'mediaResize:75',
                    value: '75',
                    icon: 'large'
                },
                {
                    name: 'mediaResize:100',
                    value: '100',
                    icon: 'large'
                }
            ]
        });
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const command = new MediaResizeCommand(editor);

        this._registerSchema();
        this._registerConverters();

        editor.commands.add('mediaResize', command);
    }

    /**
     * @private-attribute
     */
    _registerSchema() {
        this.editor.model.schema.extend('media', {allowAttributes: 'width'});
        this.editor.model.schema.setAttributeProperties('width', {
            isFormatting: true
        });
    }

    /**
     * Registers image resize converters.
     *
     * @private-attribute
     */
    _registerConverters() {
        const editor = this.editor;

        // Dedicated ckeditor5-converter to propagate media's attribute to the img tag.
        editor.conversion.for('downcast').add(dispatcher =>
            dispatcher.on('attribute:width:media', (evt, data, conversionApi) => {
                if (!conversionApi.consumable.consume(data.item, evt.name)) {
                    return;
                }

                const viewWriter = conversionApi.writer;
                const figure = conversionApi.mapper.toViewElement(data.item);

                if (data.attributeNewValue !== null) {
                    viewWriter.setStyle('width', data.attributeNewValue, figure);
                    viewWriter.addClass('media_resized', figure);
                } else {
                    viewWriter.removeStyle('width', figure);
                    viewWriter.removeClass('media_resized', figure);
                }
            })
        );

        editor.conversion.for('upcast')
            .attributeToAttribute({
                view: {
                    name: 'figure',
                    styles: {
                        width: /.+/
                    }
                },
                model: {
                    key: 'width',
                    value: viewElement => viewElement.getStyle('width')
                }
            });
    }
}
