
import { Plugin } from 'ckeditor5/src/core';
import {_modelViewInsertion, _viewModelConverter} from "./converters";
import {VIEW_CLASS} from "../../const";
export const PARENT_CLASS = 'parentClass';
export default class CustomList extends Plugin{

    afterInit(){
        const editor = this.editor;
        if(editor.plugins.has('List') && editor.plugins.has('ListEditing')){
            // console.log("editor.plugins.has('List') && editor.plugins.has('ListEditing')")

            // Schema.
            // Note: in case `$block` will ever be allowed in `listItem`, keep in mind that this feature
            // uses `Selection#getSelectedBlocks()` without any additional processing to obtain all selected list items.
            // If there are blocks allowed inside list item, algorithms using `getSelectedBlocks()` will have to be modified.
            editor.model.schema.extend( 'listItem', {
                allowAttributes: [ PARENT_CLASS, VIEW_CLASS ]
            } );


            editor.conversion.for( 'upcast' )
                .add( dispatcher => {
                    dispatcher.on( 'element:li', _viewModelConverter, {priority : 'low'} );
                } );

            editor.conversion.for( 'editingDowncast' )
                .add( dispatcher => {
                    dispatcher.on( 'insert:listItem', _modelViewInsertion( editor.model ), {priority: 'highest'} );
                } );

            editor.conversion.for( 'dataDowncast' )
                .add( dispatcher => {
                    dispatcher.on( 'insert:listItem', _modelViewInsertion( editor.model ), {priority: 'highest'} );
                } );
        }


        if(editor.plugins.has('ListStyle') && editor.plugins.has('ListStyleEditing')){

        }
    }
}
