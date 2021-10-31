
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

import {addBorderRules, addPaddingRules, addMarginRules} from 'ckeditor5/src/engine';
import {
    getShorthandValues,
    isAttachment,
    isColor,
    isPosition,
    isRepeat, isURL
} from "@ckeditor/ckeditor5-engine/src/view/styles/utils";
import {_isStrNotEmpty} from "../../../general";
import StyleIcon from "./theme/icon/style-icon.svg";
import StyleSideBar from "./style-side-bar";
import {_getCommand} from "../../../engine/utils/commands";
import GeneralButtonCommand from "../_commands/general-button-command";

export const BLOCK_STYLES = 'Styles';


function _normalizeBackground( value ) {
    const background = {};
    // console.log("normalizeBackground", {value} );

    const parts = getShorthandValues( value );

    for ( const part of parts ) {
        if ( isRepeat( part ) ) {
            // console.log("normalizeBackground.isRepeat" );
            background.repeat = background.repeat || [];
            background.repeat.push( part );
        } else if ( isPosition( part ) ) {
            // console.log("normalizeBackground.isPosition" );
            background.position = background.position || [];
            background.position.push( part );
        } else if ( isAttachment( part ) ) {
            // console.log("normalizeBackground.isAttachment" );
            background.attachment = part;
        } else if ( isColor( part ) ) {
            // console.log("normalizeBackground.isColor" );
            background.color = part;
        } else if ( isURL( part ) ) {
            // console.log("normalizeBackground.isURL" );
            background.image = part;
        }
    }
    // console.log("_normalizeBackground", {value, parts, background} );

    return {
        path: 'background',
        value: background
    };
}

function _addBackgroundRules(stylesProcessor){
    stylesProcessor.setNormalizer( 'background', _normalizeBackground );
    stylesProcessor.setNormalizer( 'background-color', value => ( { path: 'background.color', value } ) );
    stylesProcessor.setNormalizer( 'background-image', value => ( { path: 'background.image', value } ) );
    stylesProcessor.setNormalizer( 'background-repeat', value => ( { path: 'background.repeat', value } ) );
    stylesProcessor.setNormalizer( 'background-size', value => ( { path: 'background.size', value } ) );
    stylesProcessor.setNormalizer( 'background-position', value => ( { path: 'background.position', value } ) );
    stylesProcessor.setNormalizer( 'background-attachment', value => ( { path: 'background.attachment', value } ) );
    stylesProcessor.setReducer( 'background', value => {
        const ret = [];
        if(_isStrNotEmpty(value)){
            ret.push( [ 'background', value ] );

        }else if(typeof  value === typeof {}){
            Object.keys(value).forEach( (key) => {
                ret.push( [ 'background-'+key, value[key] ] );

            } )
        }

        return ret;
    } );

}




function _getRadiusSidesValues( value = '' ) {
    // console.log("_getRadiusSidesValues", {value});
    if ( value === '' ) {
        return { 'top-left': undefined, 'top-right': undefined, 'bottom-left': undefined, 'bottom-right': undefined };
        // return { topLeft: undefined, topRight: undefined, bottomLeft: undefined, bottomRight: undefined };
    }

    const values = getShorthandValues( value );

    const topLeft = values[ 0 ];
    const topRight = values[ 1 ] || topLeft;
    const bottomRight = values[ 2 ] || topLeft;
    const bottomLeft = values[ 3 ] || topRight;

    // return { topLeft, topRight , bottomLeft, bottomRight };
    return { 'top-left' : topLeft, 'top-right' :topRight , 'bottom-left' : bottomLeft, 'bottom-right' : bottomRight };
}
function _getRadiusSidesShorthandValue( { 'top-left' : topLeft, 'top-right' :topRight , 'bottom-left' : bottomLeft, 'bottom-right' : bottomRight }) {
    const out = [];

    if ( topRight !== bottomLeft ) {
        out.push( topLeft, topRight, bottomRight, bottomLeft );
    } else if ( topLeft !== bottomRight ) {
        out.push( topLeft, topRight, bottomRight );
    } else if ( topRight !== topLeft ) {
        out.push( topLeft, topRight );
    } else {
        out.push( topLeft );
    }

    // console.log("_getRadiusSidesShorthandValue", {out, topLeft, topRight , bottomLeft, bottomRight});
    return out.join( ' ' );
}
function _getRadiusSidesValueReducer(){
    return value => {
        // const { topLeft, topRight, bottomLeft, bottomRight } = value;
        const { 'top-left' : topLeft, 'top-right' :topRight , 'bottom-left' : bottomLeft, 'bottom-right' : bottomRight } = value;

        const reduced = [];

        if ( ![ topLeft, topRight, bottomLeft, bottomRight ].every( value => !!value ) ) {
            if ( topLeft ) {
                reduced.push( [ 'border-top-left-radius', topLeft ] );
            }

            if ( topRight ) {
                reduced.push( [ 'border-top-right-radius', topRight ] );
            }

            if ( bottomRight ) {
                reduced.push( [ 'border-bottom-right-radius', bottomRight ] );
            }

            if ( bottomLeft ) {
                reduced.push( [ 'border-bottom-left-radius', bottomLeft ] );
            }
        } else {
            reduced.push( [ 'border-radius', _getRadiusSidesShorthandValue( value ) ] );
        }
        // console.log("_getRadiusSidesValueReducer", {reduced, value, 'top-left' : topLeft, 'top-right' :topRight , 'bottom-left' : bottomLeft, 'bottom-right' : bottomRight});

        return reduced;
    };
}
function _getBorderPropertyNormalizer( shorthand ) {
    return value => {
        // const ret =  {
        //     path: shorthand,
        //     value: _getRadiusSidesValues( value )
        // };
        // // console.log("_getBorderPropertyNormalizer", {shorthand, value, ret});
        // return ret;
        return  {
            path: shorthand,
            value: _getRadiusSidesValues( value )
        };
    };
}
function _addPositionAbsoluteRules(styleProcessor){
    // styleProcessor.setNormalizer('position', ())
}
function _addBorderRadiusRules(stylesProcessor){
    // console.log("_addBorderRadiusRules");

    stylesProcessor.setNormalizer( 'border-radius', _getBorderPropertyNormalizer( 'border-radius' ) );
    stylesProcessor.setNormalizer( 'border-top-left-radius', value => ( { path: 'border-radius.top-left', value } ) );
    stylesProcessor.setNormalizer( 'border-top-right-radius', value => ( { path: 'border-radius.top-right', value } ) );
    stylesProcessor.setNormalizer( 'border-bottom-right-radius', value => ( { path: 'border-radius.bottom-right', value } ) );
    stylesProcessor.setNormalizer( 'border-bottom-left-radius', value => ( { path: 'border-radius.bottom-left', value } ) );

    stylesProcessor.setExtractor( 'border-top-left-radius', 'border-radius.top-left' );
    stylesProcessor.setExtractor( 'border-top-right-radius', 'border-radius.top-right' );
    stylesProcessor.setExtractor( 'border-bottom-right-radius', 'border-radius.bottom-right' );
    stylesProcessor.setExtractor( 'border-bottom-left-radius', 'border-radius.bottom-left' );

    stylesProcessor.setReducer( 'border-radius', _getRadiusSidesValueReducer( ) );

    stylesProcessor.setStyleRelation( 'border-radius', [ 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius' ] );
}

export default  class StyleEditing extends Plugin{

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckStyleEditing';
    }

    init() {
        const editor = this.editor;


        editor.data.addStyleProcessorRules(addBorderRules);

        editor.data.addStyleProcessorRules(_addBorderRadiusRules);

        editor.data.addStyleProcessorRules(_addBackgroundRules);

        editor.data.addStyleProcessorRules(addPaddingRules);

        editor.data.addStyleProcessorRules(addMarginRules);



        this.sideBar = editor.plugins.get(StyleSideBar);


        const _this = this;
        StyleEditing._unSelectableComponent.forEach( unselectableModelName =>{
            this._addComponentFactory(unselectableModelName);
        });
        const generalBtnCommand = _getCommand(editor, GeneralButtonCommand.commandName);

        editor.ui.componentFactory.add( BLOCK_STYLES, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t('style'),
                icon: StyleIcon,
                tooltip: true
            });

            _this.listenTo(buttonView, 'execute', () => {
                _this.sideBar.show();
            });
            return buttonView;
        });
        _this.listenTo(generalBtnCommand, 'change:isEnabled', (evt, property, newVal) =>{
            if(_this.sideBar){
                if(newVal){
                    _this.sideBar._clearDisableWidgetToolBar()
                }else {
                    _this.sideBar.hide();
                }
            }
        })


    }

    _addComponentFactory(modelName){
        const _this = this;
        const editor = this.editor;

        editor.ui.componentFactory.add(modelName + BLOCK_STYLES, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t(modelName + ' style'),
                icon: StyleIcon,
                tooltip: true
            });

            _this.listenTo(buttonView, 'execute', () => {
                _this.sideBar.show(modelName);
            });
            return buttonView;
        });
    }

}

/**
 * this is used to add component as far as we implement plugin
 * @type {Array}
 *
 * @private
 *
 * @example : StyleEditing._unSelectableComponent = StyleEditing._unSelectableComponent.concat(['modal-header', 'modal-body', 'modal-footer']);
 */
StyleEditing._unSelectableComponent = [
    // BlocksEditing.contentModelName, InlineElementEditing.modelName
];
