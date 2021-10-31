/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module clipboard/clipboard
 */

import { Plugin } from 'ckeditor5/src/core';

import SalesteckClipboardPipeline from './salesteck-clipboardpipeline';
// import SalesteckDragdrop from './salesteck-dragdrop';
import SalesteckDragdrop from './salesteck-dragdrop';

/**
 * The clipboard-modified feature.
 *
 * Read more about the clipboard-modified integration in the {@glink framework/guides/deep-dive/clipboard-modified clipboard-modified deep dive guide}.
 *
 * This is a "glue" plugin which loads the following plugins:
 * * {@link module:clipboard/clipboardpipeline~ClipboardPipeline}
 * * {@link module:clipboard/dragdrop~DragDrop}
 * * {@link module:clipboard/pasteplaintext~PastePlainText}
 *
 * @extends module:core/plugin~Plugin
 */
export default class SalesteckClipboard extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckClipboard';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [ SalesteckClipboardPipeline, SalesteckDragdrop ];
    }
}
