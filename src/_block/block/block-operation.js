/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/tablecellproperties
 */

import { Plugin } from 'ckeditor5/src/core';
import BlockOperationUi from "./block-operation/block-operation-ui";
/**
 * The table cell properties feature. Enables support for setting properties of table cells (size, border, background, etc.).
 *
 * Read more in the {@glink features/table#table-and-cell-styling-tools Table and cell styling tools} section.
 * See also the {@link @ckEditor5/table/tableproperties~TableProperties} plugin.
 *
 * This is a "glue" plugin that loads the
 * {@link @ckEditor5/table/tablecellproperties/tablecellpropertiesediting~TableCellPropertiesEditing table cell properties editing feature} and
 * the {@link @ckEditor5/table/tablecellproperties/tablecellpropertiesui~TableCellPropertiesUI table cell properties UI feature}.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
export default class BlockOperation extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckBlockOperation';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [ BlockOperationUi ];
    }
}

/**
 * The configuration of the table cell properties user interface (balloon). It allows to define:
 *
 * * The color palette for the cell border color style field (`tableCellProperties.borderColors`),
 * * The color palette for the cell background style field (`tableCellProperties.backgroundColors`).
 *
 *		const tableConfig = {
 *			tableCellProperties: {
 *				borderColors: [
 *					{
 *						color: 'hsl(0, 0%, 90%)',
 *						label: 'Light grey'
 *					},
 *					// ...
 *				],
 *				backgroundColors: [
 *					{
 *						color: 'hsl(120, 75%, 60%)',
 *						label: 'Green'
 *					},
 *					// ...
 *				]
 *			}
 *		};
 *
 * **Note**: The configurations do not impact the data loaded into the editor,
 * i.e. they do not limit or filter the colors in the data. They are used only in the user interface
 * allowing users to pick colors in a more convenient way.
 *
 * The default color palettes for the cell background and the cell border are the same
 * ({@link @ckEditor5/table/utils/ui/table-properties~defaultColors check out their content}).
 *
 * Both color palette configurations must follow the
 * {@link @ckEditor5/table/table~TableColorConfig table color configuration format}.
 *
 * Read more about configuring the table feature in {@link @ckEditor5/table/table~TableConfig}.
 *
 * @member {Object} @ckEditor5/table/table~TableConfig#tableCellProperties
 */
