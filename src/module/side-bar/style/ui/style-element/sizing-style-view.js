
import {debounce} from 'lodash-es';
const ERROR_TEXT_TIMEOUT = 500;
import InputRowView from "../../../../../ui/bs-view/form/input-row-view";
import StyleCommand from "../../command/style-command";
import {
    getLocalizedLengthErrorText,
    lengthFieldValidatorPercent
} from "../../../../../_block/block/_utils/ui/column-properties";
import AccordionItemView from "../../../../../ui/bs-view/accordion/accordion-item-view";
import {_isStrNotEmpty} from "../../../../../general";
const POSITION = ['top', 'right', 'bottom', 'left'];
const MIN_MAX = ['min', 'max'];


const lengthErrorTextDebounced = debounce((viewField, errorText) => {
    viewField.errorText = errorText;
}, ERROR_TEXT_TIMEOUT);

export default class SizingStyleView extends AccordionItemView{

    constructor(local, editor) {
        super(local, editor);
        const t = this.t;
        this.set('_styles');
        this.set('_undoStepBatch', null);
        this.set('title', t('Dimensions'));

    }
    _getBody() {
        const locale = this.locale;
        const _this = this;
        const lengthErrorText = getLocalizedLengthErrorText(_this.t);

        // -- Width ---------------------------------------------------

        const widthInput = _this._getSizingInput('width');

        // -- Height ---------------------------------------------------

        const heightInput = _this._getSizingInput('height');

        // -- Padding ---------------------------------------------------

        const paddingInput = _this._getSpacingInput('padding');

        // -- Margin ---------------------------------------------------

        const marginInput = _this._getSpacingInput('margin');

        // -- Padding & Margin positions ---------------------------------------------------

        POSITION.forEach( (position) =>{

            const paddingStyleProperty = 'padding-'+position;
            const paddingPositionInput = new InputRowView(locale);
            paddingPositionInput.bind('show').to(_this, 'show');
            paddingPositionInput.set({
                label: 'Padding '+position
            });
            paddingPositionInput.inputView.bind('value').to(_this, '_styles', _styles =>{
                return  _styles ? _styles.getNormalized(paddingStyleProperty) : '';
            });
            paddingPositionInput.on('input', () =>{
                lengthErrorTextDebounced.cancel();
                const paddingPositionValue = paddingPositionInput.inputView.element.value;
                if (lengthFieldValidatorPercent(paddingPositionValue)) {
                    if(_isStrNotEmpty(paddingPositionValue)){
                        _this._styles.set(paddingStyleProperty, paddingPositionValue);
                    }else {
                        _this._styles.remove(paddingStyleProperty);
                    }
                    StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                    paddingPositionInput.errorText = null;
                } else {
                    lengthErrorTextDebounced(paddingPositionInput, lengthErrorText);
                }
            });
            paddingInput._addSubItem(paddingPositionInput);

            const marginStyleProperty = 'margin-'+position;
            const marginPositionInput = new InputRowView(locale);
            marginPositionInput.bind('show').to(_this, 'show');
            marginPositionInput.set({
                label: 'margin '+position
            });
            marginPositionInput.inputView.bind('value').to(_this, '_styles', _styles =>{
                return  _styles ? _styles.getNormalized(marginStyleProperty) : '';
            });
            marginPositionInput.on('input', () =>{
                lengthErrorTextDebounced.cancel();
                const marginPositionValue = marginPositionInput.inputView.element.value;
                if (lengthFieldValidatorPercent(marginPositionValue)) {
                    if(_isStrNotEmpty(marginPositionValue)){
                        _this._styles.set(marginStyleProperty, marginPositionValue);
                    }else {
                        _this._styles.remove(marginStyleProperty);
                    }
                    StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                    marginPositionInput.errorText = null;
                } else {
                    lengthErrorTextDebounced(marginPositionInput, lengthErrorText);
                }
            });


            marginInput._addSubItem(marginPositionInput);

        } );

        return[
            widthInput,
            heightInput,
            paddingInput,
            marginInput
        ]

    }

    _getSizingInput(sizingProperty){
        const _this = this;
        const lengthErrorText = getLocalizedLengthErrorText(_this.t);
        const sizingInput = new InputRowView(_this.locale);
        sizingInput.bind('show').to(_this, 'show');
        sizingInput.set({
            hasBorder : true,
            rounded : true,
            label: (sizingProperty),
            class :'p-10'
        });
        sizingInput.inputView.bind('value').to(this, '_styles', _styles =>{
            return  _styles ? _styles.getAsString(sizingProperty) : '';
        }  );
        sizingInput.on('input', (  ) =>{
            lengthErrorTextDebounced.cancel();

            const spacingValue = sizingInput.inputView.element.value;
            if (lengthFieldValidatorPercent(spacingValue)) {
                if(_isStrNotEmpty(spacingValue)){
                    _this._styles.set(sizingProperty, spacingValue);
                }else {
                    _this._styles.remove(sizingProperty);
                }
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                sizingInput.errorText = null;
            } else {
                lengthErrorTextDebounced(sizingInput, lengthErrorText);
            }
        });
        MIN_MAX.forEach( elem =>{
            const property = elem+'-'+sizingProperty;
            const input = new InputRowView(_this.locale);
            input.bind('show').to(_this, 'show');
            input.set({
                label: (elem+' '+sizingProperty)
            });
            input.inputView.bind('value').to(this, '_styles', _styles =>{
                return  _styles ? _styles.getAsString(property) : '';
            });
            input.on('input', () =>{
                lengthErrorTextDebounced.cancel();

                const spacingValue = input.inputView.element.value;
                if (lengthFieldValidatorPercent(spacingValue)) {
                    if(_isStrNotEmpty(spacingValue)){
                        _this._styles.set(property, spacingValue);
                    }else {
                        _this._styles.remove(property);
                    }
                    StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                    input.errorText = null;
                } else {
                    lengthErrorTextDebounced(input, lengthErrorText);
                }
            });
            sizingInput._addSubItem(input);
        })
        return sizingInput;
    }

    _getSpacingInput(spacingProperty){

        const locale = this.locale;
        const _this = this;
        const lengthErrorText = getLocalizedLengthErrorText(_this.t);

        const spacingInput = new InputRowView(locale);
        spacingInput.bind('show').to(_this, 'show');
        spacingInput.set({
            hasBorder : true,
            rounded : true,
            label: (spacingProperty),
            class :'p-10 b rounded'
        });
        spacingInput.inputView.bind('value').to(this, '_styles', _styles =>{
            return _styles ? _styles.getAsString(spacingProperty) : '';
        } );

        spacingInput.on('input', () =>{

            lengthErrorTextDebounced.cancel();

            const paddingValue = spacingInput.inputView.element.value;
            if (lengthFieldValidatorPercent(paddingValue)) {
                if(_isStrNotEmpty(paddingValue)){
                    _this._styles.set(spacingProperty, paddingValue);
                }else {
                    _this._styles.remove(spacingProperty);
                }
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                spacingInput.errorText = null;
            } else {
                lengthErrorTextDebounced(spacingInput, lengthErrorText);
            }
        });
        return spacingInput;
    }

}
