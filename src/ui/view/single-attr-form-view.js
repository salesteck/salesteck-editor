/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media-embed/ui/mediaformview
 */

import {
    ButtonView,
    FocusCycler,
    LabeledFieldView,
    View,
    ViewCollection,
    createLabeledInputText,
    injectCssTransitionDisabler,
    submitHandler
} from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';

// See: #8833.
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
// import '../theme/mediaform.css';

/**
 * The media form _view controller class.
 *
 * See {@link @ckEditor5/media-embed/ui/mediaformview~MediaFormView}.
 *
 * @extends @ckEditor5/ui/_view~View
 */
export default class SingleAttrFormView extends View {
    /**
     * @param {Array.<Function>} validators Form validators used by {@link #isValid}.
     * @param {@ckEditor5/utils/locale~Locale} [locale] The localization services instance.
     */
    constructor( validators,  locale ) {
        super( locale );

        const t = locale.t;

        /**
         * Tracks information about the DOM focus in the form.
         *
         * @readonly
         * @member {@ckEditor5/utils/focustracker~FocusTracker}
         */
        this.focusTracker = new FocusTracker();

        /**
         * An instance of the {@link @ckEditor5/utils/keystrokehandler~KeystrokeHandler}.
         *
         * @readonly
         * @member {@ckEditor5/utils/keystrokehandler~KeystrokeHandler}
         */
        this.keystrokes = new KeystrokeHandler();

        /**
         * The value of the URL input.
         *
         * @member {String} #inputValue
         * @observable
         */
        this.set( 'inputValue', '' );
        this.set( 'originalValue', '' );

        /**
         * The URL input _view.
         *
         * @member {@ckEditor5/ui/labeledfield/labeledfieldview~LabeledFieldView}
         */
        this.inputView = this._createInputView();

        /**
         * The Save button _view.
         *
         * @member {@ckEditor5/ui/button/buttonview~BsButtonView}
         */
        this.saveButtonView = this._createButton( t( 'Save' ), icons.check, 'ck-button-save' );
        this.saveButtonView.type = 'submit';
        this.saveButtonView.isEnabled = true;
        // this.saveButtonView.bind( 'isEnabled' ).to( this, 'inputValue', value => !!value );
        /**
         * The Cancel button _view.
         *
         * @member {@ckEditor5/ui/button/buttonview~BsButtonView}
         */
        this.cancelButtonView = this._createButton( t( 'Cancel' ), icons.cancel, 'ck-button-cancel', 'cancel' );

        /**
         * A collection of views that can be focused in the form.
         *
         * @readonly
         * @protected
         * @member {@ckEditor5/ui/viewcollection~ViewCollection}
         */
        this._focusables = new ViewCollection();

        /**
         * Helps cycling over {@link #_focusables} in the form.
         *
         * @readonly
         * @protected
         * @member {@ckEditor5/ui/focuscycler~FocusCycler}
         */
        this._focusCycler = new FocusCycler( {
            focusables: this._focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate form fields backwards using the <kbd>Shift</kbd> + <kbd>Tab</kbd> keystroke.
                focusPrevious: 'shift + tab',

                // Navigate form fields forwards using the <kbd>Tab</kbd> key.
                focusNext: 'tab'
            }
        } );


        /**
         * An array of form validators used by {@link #isValid}.
         *
         * @readonly
         * @protected
         * @member {Array.<Function>}
         */
        this._validators = validators;

        this.setTemplate( {
            tag: 'form',

            attributes: {
                class: [
                    'ck',
                    'ck-media-form',
                    'ck-responsive-form'
                ],

                tabindex: '-1'
            },

            children: [
                this.inputView,
                this.saveButtonView,
                this.cancelButtonView
            ]
        } );

        injectCssTransitionDisabler( this );

        /**
         * The default info text for the {@link #inputView}.
         *
         * @private-attribute
         * @member {String} #_inputViewInfoDefault
         */

        /**
         * The info text with an additional tip for the {@link #urlInputView},
         * displayed when the input has some value.
         *
         * @private-attribute
         * @member {String} #_inputViewInfoTip
         */
    }

    /**
     * @inheritDoc
     */
    render() {
        super.render();

        submitHandler( {
            view: this
        } );

        const childViews = [
            this.inputView,
            this.saveButtonView,
            this.cancelButtonView
        ];

        childViews.forEach( v => {
            // Register the _view as focusable.
            this._focusables.add( v );

            // Register the _view in the focus tracker.
            this.focusTracker.add( v.element );
        } );

        // Start listening for the keystrokes coming from #element.
        this.keystrokes.listenTo( this.element );

        const stopPropagation = data => data.stopPropagation();

        // Since the form is in the dropdown panel which is a child of the toolbar, the toolbar's
        // keystroke handler would take over the key management in the URL input. We need to prevent
        // this ASAP. Otherwise, the basic caret movement using the arrow keys will be impossible.
        this.keystrokes.set( 'arrowright', stopPropagation );
        this.keystrokes.set( 'arrowleft', stopPropagation );
        this.keystrokes.set( 'arrowup', stopPropagation );
        this.keystrokes.set( 'arrowdown', stopPropagation );

        // Intercept the `selectstart` event, which is blocked by default because of the default behavior
        // of the DropdownView#panelView.
        // TODO: blocking `selectstart` in the #panelView should be configurable per–drop–down instance.
        this.listenTo( this.inputView.element, 'selectstart', ( evt, domEvt ) => {
            domEvt.stopPropagation();
        }, { priority: 'high' } );

    }

    /**
     * Focuses the fist {@link #_focusables} in the form.
     */
    focus() {
        this._focusCycler.focusFirst();
    }

    /**
     * The native DOM `value` of the {@link #urlInputView} element.
     *
     * **Note**: Do not confuse it with the {@link @ckEditor5/ui/inputtext/inputtextview~InputTextView#value}
     * which works one way only and may not represent the actual state of the component in the DOM.
     *
     * @type {String}
     */
    get value() {
        return this.inputView.fieldView.element.value.trim();
    }

    set value( value ) {
        this.inputView.fieldView.element.value = value.trim();
    }

    /**
     * Validates the form and returns `false` when some fields are invalid.
     *
     * @returns {Boolean}
     */
    isValid() {
        this.resetFormStatus();
        for ( const validator of this._validators ) {
            const errorText = validator( this );

            // One error per field is enough.
            if ( errorText ) {
                // Apply updated error.
                this.inputView.errorText = errorText;

                return false;
            }
        }

        return true;
    }

    /**
     * Cleans up the supplementary error and information text of the {@link #urlInputView}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */
    resetFormStatus() {
        this.inputView.errorText = null;
    }

    /**
     * Creates a labeled input _view.
     *
     * @private-attribute
     * @returns {@ckEditor5/ui/labeledfield/labeledfieldview~LabeledFieldView} Labeled input _view instance.
     */
    _createInputView() {
        const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );
        const inputField = labeledInput.fieldView;
        inputField.on( 'input', () => {
            // Display the tip text only when there is some value. Otherwise fall back to the default info text.
            this.inputValue = inputField.element.value.trim();
        } );
        inputField.bind('value').to(this, 'inputValue');

        return labeledInput;
    }

    /**
     * Creates a button _view.
     *
     * @private-attribute
     * @param {String} label The button label.
     * @param {String} icon The button icon.
     * @param {String} className The additional button CSS class name.
     * @param {String} [eventName] An event name that the `BsButtonView#execute` event will be delegated to.
     * @returns {@ckEditor5/ui/button/buttonview~BsButtonView} The button _view instance.
     */
    _createButton( label, icon, className, eventName ) {
        const button = new ButtonView( this.locale );

        button.set( {
            label,
            icon,
            tooltip: true
        } );

        button.extendTemplate( {
            attributes: {
                class: className
            }
        } );
        //
        if ( eventName ) {
            button.delegate( 'execute' ).to( this, eventName );
        }

        return button;
    }
}

/**
 * Fired when the form _view is submitted (when one of the children triggered the submit event),
 * e.g. click on {@link #saveButtonView}.
 *
 * @event submit
 */
