/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media/mediastyle/utils
 */

// import fullWidthIcon from '@ckeditor/ckeditor5-core/theme/icons/object-full-width.svg';
// import leftIcon from '@ckeditor/ckeditor5-core/theme/icons/object-left.svg';
// import centerIcon from '@ckeditor/ckeditor5-core/theme/icons/object-center.svg';
// import rightIcon from '@ckeditor/ckeditor5-core/theme/icons/object-right.svg';
// import { logWarning } from '@ckeditor/ckeditor5-utils/src/ckeditorerror';



import { logWarning } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';
import arrowNormal from "../../../../theme/icon/normal.svg";

/**
 * Default image styles provided by the plugin that can be referred in the
 * {@link @ckEditor5/media-embed/mediaembed~ImageConfig#styles} configuration.
 *
 * Among them, 2 default semantic content styles are available:
 *
 * * `full` is a full–width image without any CSS class,
 * * `side` is a side image styled with the `image-style-side` CSS class.
 *
 * There are also 3 styles focused on formatting:
 *
 * * `alignLeft` aligns the image to the left using the `image-style-align-left` class,
 * * `alignCenter` centers the image using the `image-style-align-center` class,
 * * `alignRight` aligns the image to the right using the `image-style-align-right` class,
 *
 * @member {Object.<String,Object>}
 */
const defaultStyles = {
	// This option is equal to the situation when no style is applied.
	full: {
		name: 'full',
		title: 'Original size',
		// icon: icons.objectFullWidth,
		icon: arrowNormal,
		isDefault: true
	},

	// This represents a side image.
	side: {
		name: 'side',
		title: 'Side media',
		icon: icons.objectRight,
		className: 'image-style-side'
	},

	// This style represents an image aligned to the left.
	alignLeft: {
		name: 'alignLeft',
		title: 'Left aligned media',
		icon: icons.objectLeft,
		className: 'float-start'
	},

	// This style represents a centered image.
	alignCenter: {
		name: 'alignCenter',
		title: 'Centered media',
		icon: icons.objectCenter,
		className: 'mx-auto'
	},

	// This style represents an image aligned to the right.
	alignRight: {
		name: 'alignRight',
		title: 'Right aligned media',
		icon: icons.objectRight,
		className: 'float-end'
	}
};

/**
 * Default image style icons provided by the plugin that can be referred in the
 * {@link @ckEditor5/media/mediaresize~ImageConfig#styles} configuration.
 *
 * There are 4 icons available: `'full'`, `'left'`, `'center'` and `'right'`.
 *
 * @member {Object.<String, String>}
 */
const defaultIcons = {
	full: arrowNormal,
	left: icons.objectLeft,
	right: icons.objectRight,
	center: icons.objectCenter
};

/**
 * Returns a {@link @ckEditor5/image/image~ImageConfig#styles} array with items normalized in the
 * {@link @ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat} format and a complete `icon` markup for each style.
 *
 * @returns {Array.<@ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat>}
 */
export function normalizeMediaStyles(configuredStyles = [] ) {
	return configuredStyles.map( _normalizeStyle );
}

// Normalizes an image style provided in the {@link @ckEditor5/image/image~ImageConfig#styles}
// and returns it in a {@link @ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat}.
//
// @param {Object} style
// @returns {@link @ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat}
function _normalizeStyle( style ) {
	// Just the name of the style has been passed.
	if ( typeof style == 'string' ) {
		const styleName = style;

		// If it's one of the defaults, just use it.
		if ( defaultStyles[ styleName ] ) {
			// Clone the style to avoid overriding defaults.
			style = Object.assign( {}, defaultStyles[ styleName ] );
		}
		// If it's just a name but none of the defaults, warn because probably it's a mistake.
		else {
			/**
			 * There is no such image style of given name.
			 *
			 * @error image-style-not-found
			 * @param {String} name Name of a missing style name.
			 */
			logWarning( 'image-style-not-found', { name: styleName } );

			// Normalize the style anyway to prevent errors.
			style = {
				name: styleName
			};
		}
	}
	// If an object style has been passed and if the name matches one of the defaults,
	// extend it with defaults – the user wants to customize a default style.
	// Note: Don't override the user–defined style object, clone it instead.
	else if ( defaultStyles[ style.name ] ) {
		const defaultStyle = defaultStyles[ style.name ];
		const extendedStyle = Object.assign( {}, style );

		for ( const prop in defaultStyle ) {
			if ( !Object.prototype.hasOwnProperty.call( style, prop ) ) {
				extendedStyle[ prop ] = defaultStyle[ prop ];
			}
		}

		style = extendedStyle;
	}

	// If an icon is defined as a string and correspond with a name
	// in default icons, use the default icon provided by the plugin.
	if ( typeof style.icon == 'string' && defaultIcons[ style.icon ] ) {
		style.icon = defaultIcons[ style.icon ];
	}

	return style;
}
