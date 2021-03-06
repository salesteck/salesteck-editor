/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ui/inputtext/inputtextview~InputGroupView
 */
import { View } from 'ckeditor5/src/ui';
import {  FocusTracker } from 'ckeditor5/src/utils';

/**
 * The text input _view class.
 *
 * @extends @ckEditor5ui/_view~View
 */
export default class InputGroupView extends View {
    /**
     * @constructs
     * @inheritDoc
     */
    constructor( locale ) {
        super( locale );

        /**
         * The value of the input.
         *
         * @observable
         * @member {String} #value
         */
        this.set( 'value' );

        /**
         * The `id` attribute of the input (i.e. to pair with a `<label>` element).
         *
         * @observable
         * @member {String} #id
         */
        this.set( 'id' );

        /**
         * The `placeholder` attribute of the input.
         *
         * @observable
         * @member {String} #placeholder
         */
        this.set( 'placeholder' );

        /**
         * Controls whether the input _view is in read-only mode.
         *
         * @observable
         * @member {Boolean} #isReadOnly
         */
        this.set( 'isReadOnly' );

        /**
         * Set to `true` when the field has some error. Usually controlled via
         * {@link @ckEditor5ui/labeledinput/labeledinputview~LabeledInputView#errorText}.
         *
         * @observable
         * @member {Boolean} #hasError
         */
        this.set( 'hasError', false );

        /**
         * The `id` of the element describing this field, e.g. when it has
         * some error, it helps screen readers read the error text.
         *
         * @observable
         * @member {Boolean} #ariaDescribedById
         */
        this.set( 'ariaDescribedById' );

        /**
         * Stores information about the editor UI focus and propagates it so various plugins and components
         * are unified as a focus group.
         *
         * @readonly
         * @member {@ckEditor5utils/focustracker~FocusTracker} #focusTracker
         */
        this.focusTracker = new FocusTracker();

        /**
         * An observable flag set to `true` when the input is currently focused by the user.
         * Set to `false` otherwise.
         *
         * @readonly
         * @observable
         * @member {Boolean} #isFocused
         * @default false
         */
        this.bind( 'isFocused' ).to( this.focusTracker );

        /**
         * An observable flag set to `true` when the input contains no text, i.e.
         * when {@link #value} is `''`, `null`, or `false`.
         *
         * @readonly
         * @observable
         * @member {Boolean} #isEmpty
         * @default true
         */
        this.set( 'isEmpty', true );

        const bind = this.bindTemplate;

        this.setTemplate( {
            tag: 'input',
            attributes: {
                type: 'text',
                class: [
                    'form-control',
                    'ck-input-text',
                    bind.if( 'isFocused', 'ck-input_focused' ),
                    bind.if( 'isEmpty', 'ck-input-text_empty' ),
                    bind.if( 'hasError', 'is-invalid' )
                ],
                id: bind.to( 'id' ),
                placeholder: bind.to( 'placeholder' ),
                readonly: bind.to( 'isReadOnly' ),
                'aria-invalid': bind.if( 'hasError', true ),
                'aria-describedby': bind.to( 'ariaDescribedById' )
            },
            on: {
                input: bind.to( 'input' ),
                change: bind.to( this._updateIsEmpty.bind( this ) )
            }
        } );

        /**
         * Fired when the user types in the input. Corresponds to the native
         * DOM `input` event.
         *
         * @event input
         */
    }

    /**
     * @inheritDoc
     */
    render() {
        super.render();

        this.focusTracker.add( this.element );

        this._setDomElementValue( this.value );
        this._updateIsEmpty();

        // Bind `this.value` to the DOM element's value.
        // We cannot use `value` DOM attribute because removing it on Edge does not clear the DOM element's value property.
        this.on( 'change:value', ( evt, name, value ) => {
            this._setDomElementValue( value );
            this._updateIsEmpty();
        } );
    }

    /**
     * Moves the focus to the input and selects the value.
     */
    select() {
        this.element.select();
    }

    /**
     * Focuses the input.
     */
    focus() {
        this.element.focus();
    }

    /**
     * Updates the {@link #isEmpty} property value on demand.
     *
     * @private
     */
    _updateIsEmpty() {
        this.isEmpty = isInputElementEmpty( this.element );
    }

    /**
     * Sets the `value` property of the {@link #element DOM element} on demand.
     *
     * @public
     */
    _setDomElementValue( value ) {
        this.element.value = ( !value && value !== 0 ) ? '' : value;
    }

    /**
     * Sets the `value` property of the {@link #element DOM element} on demand.
     *
     * @public
     */
    _getDomElementValue() {
        return this.element.value ;
    }
}

function isInputElementEmpty( domElement ) {
    return !domElement.value;
}
