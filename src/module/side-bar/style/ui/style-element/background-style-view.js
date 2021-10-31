
import {debounce} from 'lodash-es';
import { Collection, CKEditorError } from 'ckeditor5/src/utils';
import {  Model } from 'ckeditor5/src/ui';
// import ListSeparatorView from "@ckeditor/ckeditor5-ui/src/list/listseparatorview";

import browseFilesIcon from '../../../../../theme/icon/browse-files.svg';
import DropdownRowView from "../../../../../ui/bs-view/form/dropdown-row-view";
import BsButtonView from "../../../../../ui/bs-view/form/bs-button-view";
import AccordionItemView from "../../../../../ui/bs-view/accordion/accordion-item-view";
import StyleCommand from "../../command/style-command";
import InputGroupRowView from "../../../../../ui/bs-view/form/input-group-row-view";
import {_isStrNotEmpty} from "../../../../../general";
import {lengthFieldValidatorPercent} from "../../../../../_block/block/_utils/ui/column-properties";
import ColorDropdownView from "./color-dropdown-view";

function getBackgroundSizeLabels( t ) {
    return {
        none: t( 'None' ),
        auto: t( 'Auto' ),
        cover: t( 'Cover' ),
        contain: t( 'Contain' )
    };
}
function getBackgroundRepeatLabels( t ) {
    return {
        none : t( 'None' ),
        'no-repeat': t( 'No Repeat' ),
        repeat: t( 'Repeat' ),
        'repeat-x': t( 'Repeat horizontal' ),
        'repeat-y': t( 'Repeat vertical' ),
        space: t( 'Space' )
    };
}
function getBackgroundPositionLabels( t ) {
    return {
        none: t( 'None' ),
        'left top': t( 'Left Top' ),
        'left center': t( 'Left Center' ),
        'left bottom': t( 'Left Bottom' ),
        'center top': t( 'Center Top' ),
        'center center': t( 'Center Center' ),
        'center bottom': t( 'Center Bottom' ),
        'right top': t( 'Right Top' ),
        'right center': t( 'Right Center' ),
        'right bottom': t( 'Right Bottom' )
    };
}
function getBackgroundAttachmentLabels( t ) {
    return {
        none: t( 'None' ),
        fixed: t( 'Fixed' )
    };
}

function _getStyleDefinitions( view, styleLabels, styleProperty ) {
    const itemDefinitions = new Collection();

    Object.entries(styleLabels).map( ([key, val])=>{
        const definition = {
            type: 'button',
            model: new Model( {
                _value: key === 'none' ? '' : key,
                label: val,
                withText: true
            } )
        };

        if ( key === 'none' ) {
            definition.model.bind( 'isOn' ).to( view, '_styles', _styles =>{
                return  _styles ? _styles.getAsString(styleProperty) === '' : false;
            });
        } else {
            definition.model.bind( 'isOn' ).to( view, '_styles', _styles =>{
                return  _styles ? _styles.getAsString(styleProperty) === key : false;
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

function cleanImageUrlForInput( value ) {
    return _isStrNotEmpty(value) ?  value.replace(/url\(/g, '').replace(/\)/g, '').replace(/'/g, '').replace(/"/g, '') : '';
}
function addUrlWrapper( inputValue ) {
    return _isStrNotEmpty(inputValue) ?  "url("+inputValue+")" : '';
}


const ERROR_TEXT_TIMEOUT = 500;


const lengthErrorTextDebounced = debounce((viewField, errorText) => {
    viewField.errorText = errorText;
}, ERROR_TEXT_TIMEOUT);

export default class BackgroundStyleView extends AccordionItemView{
    constructor(local, editor, {defaultColors}) {
        super(local, editor);
        const t = this.t;
        this.defaultColors = defaultColors;
        this.set('_styles');
        this.set('_undoStepBatch', null);
        this.set('title', t('Background'));

    }
    _getBody() {
        const t = this.t;
        const children = [];

        // -- Color ---------------------------------------------------

        const colorInput = this._getColorInput();
        children.push(colorInput);

        // -- Image ---------------------------------------------------

        const imageInput = this._getBackgroundImageInput();
        children.push(imageInput);

        // -- Size -----------------------------------------------

        const sizeLabels = getBackgroundSizeLabels(t);
        const backgroundSizeDropdown = this._getDropdownProperty('Size', 'background-size', sizeLabels);
        children.push(backgroundSizeDropdown);

        // -- Repeat -----------------------------------------------

        const repeatLabels = getBackgroundRepeatLabels(t);
        const backgroundRepeatDropdown = this._getDropdownProperty('Repeat', 'background-repeat', repeatLabels);
        children.push(backgroundRepeatDropdown);

        // -- Position -----------------------------------------------

        const positionLabels = getBackgroundPositionLabels(t);
        const backgroundPositionDropdown = this._getDropdownProperty('Position', 'background-position', positionLabels);
        children.push(backgroundPositionDropdown);

        // -- Attachment -----------------------------------------------

        const attachmentLabels = getBackgroundAttachmentLabels(t);
        const backgroundAttachmentDropdown = this._getDropdownProperty('Attachment', 'background-attachment', attachmentLabels);
        children.push(backgroundAttachmentDropdown);



        return children;

    }



    _getColorInput(){


        const locale = this.locale;
        const _this = this;
        const styleProperty = 'background-color';
        const columns = 7
        const defaultColors = _this.editor.config.get('defaultColors');

        const colorInput = new ColorDropdownView(locale, { columns, styleProperty, defaultColors});
        colorInput.set({
            hasBorder : true,
            rounded : true,
        })
        colorInput.colorInputView.bind('value').to(_this, '_styles', _styles =>{
            return  _styles ? _styles.getAsString(styleProperty) : 'none';
        });
        colorInput.inputView.bind('value').to(_this, '_styles', _styles =>{
            return  _styles ? _styles.getAsString(styleProperty) : '';
        });

        colorInput.colorInputView.on('input', () =>{

            lengthErrorTextDebounced.cancel();

            const value = colorInput.colorInputView.element.value;

            if (lengthFieldValidatorPercent(value) || true) {
                if(value){
                    _this._styles.set('background-color', value);
                    _this._styles.remove('background-image');
                    _this._styles.remove('background-size');
                    _this._styles.remove('background-repeat');
                    _this._styles.remove('background-position');
                    _this._styles.remove('background-attachment');
                }else {
                    _this._styles.remove('background-color');
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
                    _this._styles.set('background-color', value);
                    _this._styles.remove('background-image');
                    _this._styles.remove('background-size');
                    _this._styles.remove('background-repeat');
                    _this._styles.remove('background-position');
                    _this._styles.remove('background-attachment');
                }else {
                    _this._styles.remove('background-color');
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
                    _this._styles.set('background-color', value);
                    _this._styles.remove('background-image', '');
                    _this._styles.remove('background-size', '');
                    _this._styles.remove('background-repeat', '');
                    _this._styles.remove('background-position', '');
                    _this._styles.remove('background-attachment', '');
                }else {
                    _this._styles.set('background.color', value);
                }
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                colorInput.errorText = null;
            } else {
                lengthErrorTextDebounced(colorInput, '');
            }
        });
        return colorInput;
    }




    _getBackgroundImageInput(){

        const locale = this.locale;
        const _this = this;
        const styleProperty = 'background-image';

        const imageInput = new InputGroupRowView(locale);


        imageInput.set({
            labelSizeClass : 'col-12',
            inputGroupSizeClass : 'col-12',
            hasBorder : true,
            rounded : true,
            icon : browseFilesIcon,
            label: ('Image'),
            class :'p-10'
        });
        imageInput.inputView.bind('value').to(_this, '_styles', _styles =>{
            return  _styles ? cleanImageUrlForInput(_styles.getAsString(styleProperty)) : '';
        });
        imageInput.on('execute', () => {
            // console.log('BlockStyleView#ckFinderButton#execute', {editor:_this.editor});
            const openerMethod = _this.editor.config.get('ckfinder.openerMethod') || 'modal';

            if (openerMethod !== 'popup' && openerMethod !== 'modal') {
                /**
                 * The `ckfinder.openerMethod` must be one of: "popup" or "modal".
                 *
                 * @error ckfinder-unknown-openermethod
                 */
                throw new CKEditorError('ckfinder-unknown-openermethod', editor);
            }

            const options = _this.editor.config.get('ckfinder.options') || {};
            options.chooseFiles = true;
            // Cache the user-defined onInit method
            const originalOnInit = options.onInit;

            // Pass the lang code to the CKFinder if not defined by user.
            if (!options.language) {
                options.language = _this.editor.locale.uiLanguage;
            }

            // The onInit method allows to extend CKFinder's behavior. It is used to attach event listeners to file choosing related events.
            options.onInit = finder => {
                // Call original options.onInit if it was defined by user.
                if (originalOnInit) {
                    originalOnInit(finder);
                }

                finder.on('files:choose', evt => {
                    const files = evt.data.files.toArray();

                    // Insert links
                    const links = files.filter(file => !file.isImage());
                    const images = files.filter(file => file.isImage());

                    for (const linkFile of links) {
                        _this.editor.execute('link', linkFile.getUrl());
                    }

                    const imagesUrls = [];

                    for (const image of images) {
                        const url = image.getUrl();

                        imagesUrls.push(url ? url : finder.request('file:getProxyUrl', {file: image}));
                    }

                    if (imagesUrls.length) {
                        _this._styles.remove('background-color');
                        _this._styles.set(styleProperty, addUrlWrapper(imagesUrls[0]));
                        StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                        // console.log({imagesUrls});
                    }
                });

                finder.on('file:choose:resizedImage', evt => {
                    const resizedUrl = evt.data.resizedUrl;

                    if (!resizedUrl) {
                        const notification = _this.editor.plugins.get('Notification');
                        const t = _this.editor.locale.t;

                        notification.showWarning(t('Could not obtain resized image URL.'), {
                            title: t('Selecting resized image failed'),
                            namespace: 'ckfinder'
                        });

                        return;
                    }
                    _this._styles.set(styleProperty, resizedUrl);
                    StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);

                });
            };

            window.CKFinder[openerMethod](options);
        });
        imageInput.on('input', () =>{

            lengthErrorTextDebounced.cancel();

            const value = imageInput.inputView.element.value;

            if (lengthFieldValidatorPercent(value) || true) {
                if(_isStrNotEmpty(value)){
                    _this._styles.set(styleProperty, addUrlWrapper(value));
                    _this._styles.remove('background-color');
                }else {
                    _this._styles.remove(styleProperty);
                    _this._styles.remove('background-size');
                    _this._styles.remove('background-repeat');
                    _this._styles.remove('background-position');
                    _this._styles.remove('background-attachment');

                }
                // console.log({
                //     _styles : _this._styles,
                //     toString: _this._styles.toString()
                // });
                StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
                imageInput.errorText = null;
            } else {
                lengthErrorTextDebounced(imageInput, '');
            }
        });
        return imageInput;
    }

    _getDropdownProperty(title, styleProperty, labels){
        const locale = this.locale;
        const _this = this;

        const dropdown = new DropdownRowView(locale, {columns : 2});
        dropdown.set({
            label : title,
            hasBorder : true,
            rounded : true,
            class :'p-10'
        });

        _addListToDropdown(dropdown, _getStyleDefinitions(this, labels, styleProperty));

        dropdown.bind('value').to(this, '_styles', _styles =>{
            const style = _styles ? _styles.getAsString(styleProperty) : '';
            return  labels[style] || '';
        });

        dropdown.bind('isReadOnly').to(_this, '_styles', _styles =>{
            return  _styles ? !_styles.getAsString('background-image') : false;
        });


        dropdown.on('execute', evt => {
            const styleValue = evt.source._value;
            _this._styles.set(styleProperty, styleValue);
            StyleCommand._execute(_this.editor, _this._styles.toString(), _this._undoStepBatch);
        });
        return dropdown;
    }


}
