/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/image/utils
 */

import { findOptimalInsertionRange } from 'ckeditor5/src/widget';

export function checkSelectionOnObject(selection, schema){

	const selectedElement = selection.getSelectedElement();

	return !!selectedElement && schema.isObject( selectedElement );
}

