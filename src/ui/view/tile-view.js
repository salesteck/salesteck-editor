/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ui/colorgrid/colortile
 */
import {View} from "ckeditor5/src/ui";

/**
 * This class represents a single color tile in the {@link @ckEditor5/ui/colorgrid/colorgrid~ColorGridView}.
 *
 * @extends @ckeditor/ckeditor5-ui/src/buttonview~BsButtonView
 */
export default class TileView extends View {
    constructor( locale ) {
        super( locale );

        /**
         * Collection of the child views inside of the list item {@link #element}.
         *
         * @readonly
         * @member {@ckEditor5/ui/viewcollection~ViewCollection}
         */
        this.children = this.createCollection();

        // this.icon = null;

        this.setTemplate( {
            tag : 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-grid__tile',
                    'ck-table__tile_bordered',
                    // 'ck-color-grid__tile',
                    // 'ck-color-table__color-tile_bordered'
                ]
            },

            children: this.children
        } );
    }
    /**
     * Focuses the list item.
     */
    focus() {
        this.children.first.focus();
    }

}
