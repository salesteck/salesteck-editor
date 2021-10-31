/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/imageresize/imageresizeediting
 */

import {Plugin} from 'ckeditor5/src/core';
import MediaRatioCommand from './media-ratio-command';

/**
 * The image resize editing feature.
 *
 * It adds the ability to resize each image using handles or manually by
 * {@link @ckEditor5/media/mediaresize/mediaresizebuttons~MediaResizeButtons} buttons.
 *
 * @extends @ckEditor5/@ckeditor/ckeditor5/core/plugin~Plugin
 */
export default class MediaRatioEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckMediaRatioEditing';
    }

    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);

    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const defaultClass = editor.config.get( 'mediaEmbed.ratio.defaultClass' ) || '';
        const command = new MediaRatioCommand(editor, defaultClass);

        this._registerSchema();
        this._registerConverters();

        editor.commands.add('mediaRatio', command);
    }

    /**
     * @private-attribute
     */
    _registerSchema() {
        this.editor.model.schema.extend('media', {allowAttributes: 'ratio'});
        this.editor.model.schema.setAttributeProperties('ratio', {
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
            dispatcher.on('attribute:ratio:media', (evt, data, conversionApi) => {
                if (!conversionApi.consumable.consume(data.item, evt.name)) {
                    return;
                }

                const viewWriter = conversionApi.writer;
                const figure = conversionApi.mapper.toViewElement(data.item);
                // if(_isStrNotEmpty(data.attributeNewValue)){
                //     viewWriter.setAttribute(data.attributeKey, data.attributeNewValue, figure);
                // }else {
                //     viewWriter.removeAttribute(data.attributeKey, figure);
                // }
                viewWriter.removeAttribute(data.attributeKey, figure);
                evt.stop();
            }, {priority : 'lowest'})
        );

        editor.conversion.for('upcast')
            .attributeToAttribute({
                view: {
                    name: 'figure',
                    key : 'class',
                    value : /ratio-[\S]+/
                },
                model: {
                    key: 'ratio',
                    value: viewElement => {
                        const regexp = /ratio-[\S]+/;
                        const match = viewElement.getAttribute( 'class' ).match( regexp );
                        return match[ 0 ];
                    }
                }
            });
    }
}
