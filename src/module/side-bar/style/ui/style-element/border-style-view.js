
import {debounce} from 'lodash-es';
import { Collection } from 'ckeditor5/src/utils';
import {  Model } from 'ckeditor5/src/ui';
// import ListSeparatorView from "@ckeditor/ckeditor5-ui/src/list/listseparatorview";

import InputRowView from "../../../../../ui/bs-view/form/input-row-view";
import DropdownRowView from "../../../../../ui/bs-view/form/dropdown-row-view";
import BsButtonView from "../../../../../ui/bs-view/form/bs-button-view";
import AccordionItemView from "../../../../../ui/bs-view/accordion/accordion-item-view";
import StyleCommand from "../../command/style-command";
const POSITION = ['top', 'right', 'bottom', 'left'];
const RADIUS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
import { getLocalizedLengthErrorText, lengthFieldValidatorPercent } from "../../../../../_block/block/_utils/ui/column-properties";
import ColorDropdownView from "./color-dropdown-view";

function _getBorderStyleLabels( t ) {
    return {
        none: t( 'None' ),
        solid: t( 'Solid' ),
        dotted: t( 'Dotted' ),
        dashed: t( 'Dashed' ),
        double: t( 'Double' ),
        groove: t( 'Groove' ),
        ridge: t( 'Ridge' ),
        inset: t( 'Inset' ),
        outset: t( 'Outset' )
    };
}
function _getBorderStyleDefinitions( view, styleLabels ) {
    const itemDefinitions = new Collection();

    Object.entries(styleLabels).map( ([key, val])=>{
        const definition = {
            type: 'button',
            model: new Model( {
                class : 'm-2 btn-s-sm fs-xsmall',
                _value: key === 'none' ? '' : key,
                label: val,
                withText: true
            } )
        };

        if ( key === 'none' ) {
            definition.model.bind( 'isOn' ).to( view, '_styles', _styles =>{
                return  _styles ? _styles.getNormalized('border-style') === '' : false;
            });
        } else {
            definition.model.bind( 'isOn' ).to( view, '_styles', _styles =>{
                return  _styles ? _styles.getAsString('border-style') === key : false;
            });
        }

        itemDefinitions.add( definition );
    } )

    return itemDefinitions;
}

function _addListToDropdown( dropdownView, items ) {
    const locale = dropdownView.locale;

    dropdownView._dropddownItems.bindTo( items ).using( ( { type, model } ) => {
        if ( type === 'separator' ) {
            // return new ListSeparatorView( locale );
        } else if ( type === 'button' || type === 'switchbutton' ) {
            let buttonView;

            if ( type === 'button' ) {
                buttonView = new BsButtonView( locale );
            } else {
                // buttonView = new SwitchButtonView( locale );
            }
            buttonView.extendTemplate({
                attributes : {
                    class : ['m-2']
                }
            })

            // Bind all model properties to the button _view.
            buttonView.bind( ...Object.keys( model ) ).to( model );
            buttonView.delegate( 'execute' ).to( dropdownView );


            return buttonView;
        }
    } );
}
const ERROR_TEXT_TIMEOUT = 500;

const lengthErrorTextDebounced = debounce((viewField, errorText) => {
    viewField.errorText = errorText;
}, ERROR_TEXT_TIMEOUT);
export default class BorderStyleView extends AccordionItemView{
    constructor(local, editor, {defaultColors}) {
        super(local, editor);
        const t = this.t;
        this.defaultColors = defaultColors;
        this.set('_styles');
        this.set('_undoStepBatch', null);
        this.set('title', t('Borders'));

    }
    _getBody() {
        const t = this.t;
        const children = [];
        const lengthErrorText = getLocalizedLengthErrorText(t);
        // -- Style ---------------------------------------------------

        const borderStyleLabel = _getBorderStyleLabels(t);

        const styleDropdown = this._getStyleDropdown(borderStyleLabel);
        children.push(styleDropdown);

        // -- Width ---------------------------------------------------

        const widthInput = this._getWidthInput(lengthErrorText);
        children.push(widthInput);

        // -- Color ---------------------------------------------------

        const colorInput = this._getColorInput();
        children.push(colorInput);

        // -- Radius ---------------------------------------------------

        const radiusInput = this._getRadiusInput(lengthErrorText);
        children.push(radiusInput);

        return children;

    }


    _getStyleDropdown(borderStyleLabel){

        const locale = this.locale;
        const _this = this;

        const styleDropdown = new DropdownRowView(locale, {columns : 2});
        styleDropdown.set({
            hasBorder : true,
            rounded : true,
            label : 'Style',
            class :'p-10 b rounded'
        });

        _addListToDropdown(styleDropdown, _getBorderStyleDefinitions(this, borderStyleLabel));

        styleDropdown.bind('value').to(this, '_styles', _styles =>{
            const borderStyle = _styles ? _styles.getAsString('border-style') : '';
            return  borderStyleLabel[borderStyle] || '';
        });


        styleDropdown.on('execute', evt => {
            const borderStyleValue = evt.source._value;
            if(borderStyleValue === ""){
                _this._styles.remove('border-style');
                _this._styles.remove('border-width', '');
                _this._styles.remove('border-color', '');
            }else {
                _this._styles.set('border-style', borderStyleValue);
            }
            StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
        });
        return styleDropdown;

    }

    _getWidthInput(lengthErrorText){

        const locale = this.locale;
        const _this = this;

        const widthInput = new InputRowView(locale);
        widthInput.set({
            hasBorder : true,
            rounded : true,
            label: ('Width'),
            class :'p-10'
        });

        widthInput.inputView.bind('value').to(this, '_styles', _styles =>_styles ? _styles.getAsString('border-width') : '');
        widthInput.bind('show').to(_this, 'show');
        widthInput.bind('isReadOnly').to(_this, '_styles', _styles =>{
            return  _styles ? !_styles.getAsString('border-style') : false;
        });


        widthInput.on('input', () =>{
            lengthErrorTextDebounced.cancel();
            const widthValue = widthInput.inputView.element.value;
            if (lengthFieldValidatorPercent(widthValue)) {
                _this._styles.set('border-width', widthValue);
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                widthInput.errorText = null;
            } else {
                lengthErrorTextDebounced(widthInput, lengthErrorText);
            }
        });
        POSITION.forEach( (position) =>{
            const widthPositionProperty = 'border-'+position+"-width";
            const widthPositionInput = new InputRowView(locale);
            widthPositionInput.set({
                label: position
            });
            widthPositionInput.inputView.bind('value').to(_this, '_styles', _styles =>{
                return  _styles ? _styles.getNormalized(widthPositionProperty) : '';
            });
            widthPositionInput.bind('isReadOnly').to(_this, '_styles', _styles =>{
                return  _styles ? !_styles.getAsString('border-style') : false;
            });


            widthPositionInput.on('input', () =>{
                lengthErrorTextDebounced.cancel();
                const widthValue = widthPositionInput.inputView.element.value;
                if (lengthFieldValidatorPercent(widthValue)) {
                    _this._styles.set(widthPositionProperty, widthValue);
                    StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                    widthPositionInput.errorText = null;
                } else {
                    lengthErrorTextDebounced(widthPositionInput, lengthErrorText);
                }
            });
            widthInput._addSubItem(widthPositionInput);
        } );
        return widthInput;
    }

    _getColorInput(){


        const locale = this.locale;
        const _this = this;
        const styleProperty = 'border-color';
        const columns = 7
        const defaultColors = _this.defaultColors;

        const colorInput = new ColorDropdownView(locale, { columns, styleProperty, defaultColors});
        colorInput.set({
            hasBorder : true,
            rounded : true,
        })
        colorInput.bind('show').to(this, 'show');

        colorInput.colorInputView.bind('value').to(_this, '_styles', _styles =>{
            return  _styles ? _styles.getAsString(styleProperty) : 'none';
        });
        colorInput.inputView.bind('value').to(_this, '_styles', _styles =>{
            return  _styles ? _styles.getAsString(styleProperty) : '';
        });
        colorInput.bind('isReadOnly').to(_this, '_styles', _styles =>{
            return  _styles ? !_styles.getAsString('border-style') : false;
        });

        colorInput.colorInputView.on('input', () =>{

            lengthErrorTextDebounced.cancel();

            const value = colorInput.colorInputView.element.value;

            if (lengthFieldValidatorPercent(value) || true) {
                if(value){
                    _this._styles.set('border-color', value);
                }else {
                    _this._styles.set('border.color', value);
                }
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                colorInput.errorText = null;
            } else {
                lengthErrorTextDebounced(colorInput, '');
            }
        });

        colorInput.on('input', () =>{

            lengthErrorTextDebounced.cancel();

            const value = colorInput.inputView.element.value;

            if (lengthFieldValidatorPercent(value) || true) {
                if(value){
                    _this._styles.set('border-color', value);
                }else {
                    _this._styles.set('border.color', value);
                }
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                colorInput.errorText = null;
            } else {
                lengthErrorTextDebounced(colorInput, '');
            }
        });

        colorInput.on('execute', evt => {

            lengthErrorTextDebounced.cancel();
            const value = evt.source._value;
            if (lengthFieldValidatorPercent(value) || true) {
                if(value){
                    _this._styles.set('border-color', value);
                }else {
                    _this._styles.set('border.color', value);
                }
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                colorInput.errorText = null;
            } else {
                lengthErrorTextDebounced(colorInput, '');
            }
        });
        return colorInput;
    }

    _getRadiusInput(lengthErrorText){

        const locale = this.locale;
        const _this = this;
        const property = 'border-radius';

        const radiusInput = new InputRowView(locale);
        radiusInput.set({
            label: _this.t('Radius'),
            hasBorder : true,
            rounded : true,
            class :'p-10'
        });

        radiusInput.inputView.bind('value').to(this, '_styles', _styles =>_styles ? _styles.getAsString(property) : '');

        radiusInput.bind('show').to(_this, 'show');

        radiusInput.on('input', () =>{
            lengthErrorTextDebounced.cancel();
            const widthValue = radiusInput.inputView.element.value;
            if (lengthFieldValidatorPercent(widthValue)) {
                _this._styles.set(property, widthValue);
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                radiusInput.errorText = null;
            } else {
                lengthErrorTextDebounced(radiusInput, lengthErrorText);
            }
        });


        RADIUS.forEach( (radiusPosition) =>{
            const widthPositionProperty = 'border-'+radiusPosition+"-radius";
            const widthPositionObjProperty = 'border-radius.'+radiusPosition;

            const radiusPositionInput = new InputRowView(locale);
            radiusPositionInput.set({
                label: radiusPosition
            });
            radiusPositionInput.inputView.bind('value').to(_this, '_styles', _styles =>_styles ? _styles.getNormalized(widthPositionProperty) : '');

            radiusPositionInput.on('input', () =>{
                lengthErrorTextDebounced.cancel();
                const widthValue = radiusPositionInput.getValue();
                // console.log({
                //     _styles : _this._styles
                // });
                if (lengthFieldValidatorPercent(widthValue)) {

                    if(widthValue){
                        _this._styles.set(widthPositionProperty, widthValue);
                    }else {
                        _this._styles.set(widthPositionObjProperty, widthValue);
                    }
                    StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                    radiusPositionInput.errorText = null;
                } else {
                    lengthErrorTextDebounced(radiusPositionInput, lengthErrorText);
                }
            });
            radiusInput._addSubItem(radiusPositionInput);
        } );
        return radiusInput;
    }

}

