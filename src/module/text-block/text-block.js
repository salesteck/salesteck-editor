import {Plugin} from 'ckeditor5/src/core';
import {VIEW_CLASS} from "../../const";
import {ALLOWED_ATTR} from "../../_block/block/blocks-editing";

export default class TextBlock extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckTextBlock';
    }



    constructor(editor) {
        super(editor)
    }

    afterInit(){
        let editor = this.editor;
        const options = editor.config.get( 'heading.options' );
        options.forEach( modelOption => {
            if(editor.model.schema.isRegistered(modelOption.model)){
                editor.model.schema.extend(modelOption.model, {
                    // isSelectable : true,
                    allowAttributes: ALLOWED_ATTR
                });
                _convertTextBlock(editor, modelOption.view, modelOption.model);
            }
            // _convertTextBlock(editor, modelOption.view, modelOption.model);
        });
    }
}
function  _convertTextBlock(editor, viewDefinition, modelName){

    editor.conversion.for('upcast').elementToElement({
        view: viewDefinition,
        model: (viewElement, {writer}) => {
            const modelElement = writer.createElement(modelName, viewElement.getAttributes());
            writer.setAttribute(VIEW_CLASS, viewElement.getAttribute('class'), modelElement);
            return modelElement;
        },
        converterPriority: 'highest'
    });
}
