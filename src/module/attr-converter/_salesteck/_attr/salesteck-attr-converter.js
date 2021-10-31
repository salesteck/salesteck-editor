import {Plugin} from 'ckeditor5/src/core';
import {
    DATA_BLOCK_TYPE,
    DATA_CHILD_COUNT,
    DATA_CLASS_SELECTOR,
    VIEW_ATTR,
    VIEW_CLASS,
    VIEW_STYLE,
    DATA_ORIGINAL_STYLE
} from "../../../../const";
import {_downcastViewAttr, _downcastViewClass, _downcastViewStyle} from "../../../../engine/utils/converter/downcast";
import {_isStrNotEmpty} from "../../../../general";


export default class SalesteckAttrConverter extends Plugin{
    static get pluginName(){
        return 'SalesteckAttrConverter';
    }

    constructor(editor) {
        super(editor);
        this._upcastProp();
        this._editingDowncastProp();
        this._dataDowncastProp();
        this._downCastProp();
    }

    _upcastProp(){
        this.editor.conversion.for( 'upcast' ).attributeToAttribute( {
            view: DATA_BLOCK_TYPE,
            model: DATA_BLOCK_TYPE
        } );
        this.editor.conversion.for( 'upcast' ).attributeToAttribute( {
            view: 'data-auto-toggle',
            model: 'auto-toggle'
        } );

    }
    _dataDowncastProp(){
        this.editor.conversion.for('dataDowncast').add( dispatcher =>{
            dispatcher.on('attribute:' + VIEW_STYLE , (evt, data, {writer : viewWriter, mapper}) => {
                let blockView = mapper.toViewElement(data.item);
                blockView = _downcastViewStyle(viewWriter, blockView, data);
                viewWriter.removeAttribute(VIEW_STYLE, blockView);
                // console.log(`${evt.name}`, { blockView, data});
                evt.stop();
            });
            dispatcher.on('attribute:' + VIEW_CLASS , (evt, data, {writer : viewWriter, mapper}) => {
                let blockView = mapper.toViewElement(data.item);
                blockView = _downcastViewClass(viewWriter, blockView, data);
                viewWriter.removeAttribute(VIEW_CLASS, blockView);
                // if(data.item.name === 'table'){
                //     console.log(`dataDowncast:${evt.name}`, { model : data.item, data, blockView})
                // }
                evt.stop();
            });
            dispatcher.on(`attribute:${VIEW_ATTR}`, (evt, data, {writer : viewWriter, mapper}) => {
                let viewElement = mapper.toViewElement(data.item);
                _downcastViewAttr(viewWriter, viewElement, data, true);
                evt.stop();
            });
        });
    }
    _editingDowncastProp(){
        const editor = this.editor;
        this.editor.conversion.for( 'editingDowncast' ).attributeToAttribute( {
            model: DATA_CHILD_COUNT,
            view: DATA_CHILD_COUNT
        } );

        this.editor.conversion.for('editingDowncast').add( dispatcher =>{
            dispatcher.on('attribute:' + VIEW_STYLE , (evt, data, {writer, mapper, consumable, options, schema}) => {
                let blockView = mapper.toViewElement(data.item);
                // console.log({writer, mapper, consumable, options, schema, data});
                blockView = _downcastViewStyle(writer, blockView, data);
                writer.removeAttribute(VIEW_STYLE, blockView);

                evt.stop();
            });
            dispatcher.on('attribute:' + VIEW_CLASS , (evt, data, {writer : viewWriter, mapper}) => {
                let blockView = mapper.toViewElement(data.item);
                blockView = _downcastViewClass(viewWriter, blockView, data);
                viewWriter.removeAttribute(VIEW_CLASS, blockView);
                // if(data.item.name === 'imageInline'){
                //     console.log(`editingDowncast:${evt.name}`, { model : data.item, data, blockView})
                // }
                evt.stop();
            });
            dispatcher.on(`attribute:${VIEW_ATTR}`, (evt, data, {writer : viewWriter, mapper}) => {
                let viewElement = mapper.toViewElement(data.item);
                _downcastViewAttr(viewWriter, viewElement, data);
                evt.stop();
            });
        });

    }
    _downCastProp(){
        this.editor.conversion.for( 'downcast' ).attributeToAttribute( {
            model: DATA_BLOCK_TYPE,
            view: DATA_BLOCK_TYPE
        } );
        this.editor.conversion.for( 'downcast' ).attributeToAttribute( {
            model: 'auto-toggle',
            view: 'data-auto-toggle'
        } );
        this.editor.conversion.for( 'downcast' ).add( dispatcher =>{
            dispatcher.on(`attribute:${DATA_CLASS_SELECTOR}`, (evt, data, {writer : viewWriter, mapper}) => {
                let viewElement = mapper.toViewElement(data.item);
                if(_isStrNotEmpty(data.attributeNewValue)){
                    viewWriter.addClass( data.attributeNewValue, viewElement );
                }else {
                    if(_isStrNotEmpty(data.attributeOldValue)){
                        viewWriter.removeClass( data.attributeOldValue, viewElement );
                    }
                }
                evt.stop();
            });
        } )

    }

}
