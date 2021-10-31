/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ui/colorgrid/colorgrid
 */

import { View, FocusCycler } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';

/**
 * A grid of {@link @ckEditor5/ui/colorgrid/colortile~ColorTileView color tiles}.
 *
 * @extends @ckEditor5/ui/_view~View
 */
export default class DropDownGridView extends View {
    /**
     * Creates an instance of a color grid containing {@link @ckEditor5/ui/colorgrid/colortile~ColorTileView tiles}.
     *
     * @param {@ckEditor5/utils/locale~Locale} [locale] The localization services instance.
     * @param {Object} options Component configuration
     * @param {Array.<@ckEditor5/ui/colorgrid/colorgrid~ColorDefinition>} [options.colorDefinitions] Array with definitions
     * required to create the {@link @ckEditor5/ui/colorgrid/colortile~ColorTileView tiles}.
     * @param {Number} options.columns A number of columns to display the tiles.
     */
    constructor( locale, options ) {

        super(  );
        // console.log("_addListToDropdown", {locale})
        const viewStyleAttribute = {};

        let defaultColumn = 4;
        if ( options && options.columns ) {
            defaultColumn = options.columns;
        }

        viewStyleAttribute.gridTemplateColumns = `repeat( ${ defaultColumn }, 1fr)`;

        /**
         * Collection of the child tile views.
         *
         * @readonly
         * @member {@ckEditor5/ui/viewcollection~ViewCollection}
         */
        this.items = this.createCollection();

        /**
         * Tracks information about DOM focus in the grid.
         *
         * @readonly
         * @member {@ckEditor5/utils/focustracker~FocusTracker}
         */
        this.focusTracker = new FocusTracker();

        /**
         * Instance of the {@link @ckEditor5/utils/keystrokehandler~KeystrokeHandler}.
         *
         * @readonly
         * @member {@ckEditor5/utils/keystrokehandler~KeystrokeHandler}
         */
        this.keystrokes = new KeystrokeHandler();

        /**
         * Helps cycling over focusable {@link #items} in the grid.
         *
         * @readonly
         * @protected
         * @member {@ckEditor5/ui/focuscycler~FocusCycler}
         */
        this._focusCycler = new FocusCycler( {
            focusables: this.items,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate grid items backwards using the arrowup key.
                focusPrevious: 'arrowleft',

                // Navigate grid items forwards using the arrowdown key.
                focusNext: 'arrowright'
            }
        } );

        this.setTemplate( {
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-color-grid',
                    'ck-grid'
                ],
                style: viewStyleAttribute
            },
            children: this.items
        } );
    }

    /**
     * Focuses the first focusable in {@link #items}.
     */
    focus() {
        this._focusCycler.focusFirst();
    }

    /**
     * Focuses the last focusable in {@link #items}.
     */
    focusLast() {
        this._focusCycler.focusLast();
    }

    /**
     * @inheritDoc
     */
    render() {
        super.render();

        // Items added before rendering should be known to the #focusTracker.
        for ( const item of this.items ) {
            this.focusTracker.add( item.element );
        }

        this.items.on( 'add', ( evt, item ) => {
            this.focusTracker.add( item.element );
        } );

        this.items.on( 'remove', ( evt, item ) => {
            this.focusTracker.remove( item.element );
        } );

        // Start listening for the keystrokes coming from #element.
        this.keystrokes.listenTo( this.element );
    }

    /**
     * Fired when the `ColumnAttributeSelectTileView` for the picked item is executed.
     *
     * @event execute
     * @param {Object} data Additional information about the event.
     * @param {String} data.selectedAttrValue The value of the selected color
     * ({@link @ckEditor5/ui/colorgrid/colorgrid~ColorDefinition#color `color.color`}).
     * @param {Boolean} data.hasBorder The `hasBorder` property of the selected color
     * ({@link @ckEditor5/ui/colorgrid/colorgrid~ColorDefinition#options `color.options.hasBorder`}).
     * @param {String} data.Label The label of the selected color
     * ({@link @ckEditor5/ui/colorgrid/colorgrid~ColorDefinition#label `color.label`})
     */
}

/**
 * A color definition used to create a {@link @ckEditor5/ui/colorgrid/colortile~ColumnAttributeSelectTileView}.
 *
 *		{
 *			color: 'hsl(0, 0%, 75%)',
 *			label: 'Light Grey',
 *			options: {
 *				hasBorder: true
 *			}
 *		}
 *
 * @typedef {Object} @ckEditor5/ui/colorgrid/colorgrid~ColorDefinition
 * @type Object
 *
 * @property {String} attrValue String representing a color.
 * It is used as value of background-color style in {@link @ckEditor5/ui/colorgrid/colortile~ColorTileView}.
 * @property {String} label String used as label for {@link @ckEditor5/ui/colorgrid/colortile~ColorTileView}.
 * @property {Object} options Additional options passed to create a {@link @ckEditor5/ui/colorgrid/colortile~ColorTileView}.
 * @property {Boolean} options.hasBorder A flag that indicates if special a CSS class should be added
 * to {@link @ckEditor5/ui/colorgrid/colortile~ColorTileView}, which renders a border around it.
 */