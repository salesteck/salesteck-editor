import {Plugin} from 'ckeditor5/src/core';
import './theme/style.min.css';
export default class StyleSrc extends Plugin{
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckStyleSrc';
    }
    static get requires() {
        return [];
    }
    static get modelName(){
        return 'styleSrc'
    }


    constructor(editor) {
        super(editor);

        const schema = this.editor.model.schema;
        const dataResource = 'data-ct-resource';
        schema.register(StyleSrc.modelName, {
            // Behaves like a self-contained object (e.g. an image).
            // allowWhere: '$root',
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: [dataResource, 'styleValue'],
            allowIn: '$root'
        });
        const conversion = editor.conversion;
        const modelName = StyleSrc.modelName;
        const viewDefinition = {
            modelName : modelName,
            name : 'div',
            attributes : {
                'data-ct-resource' : 'style'
            }
        };


        // console.log('_upcastElement', {viewDefinition, modelName});
        conversion.for('upcast').elementToElement({
            view: viewDefinition,
            model: (viewElement, {writer}) => {
                let modelElement = writer.createElement(modelName);
                const textElement = viewElement.getChild(0) || {};
                const textValue = textElement.data || "";
                // console.log('_upcastElement', {viewElement, modelElement, textValue});
                writer.setAttribute('styleValue', textValue, modelElement);
                writer.setAttribute(dataResource, viewElement.getAttribute(dataResource), modelElement);

                return modelElement;
            }, converterPriority :'highest'
        });
        conversion.for('downcast').elementToElement({
            model: modelName,
            view: ( modelElement, { writer } ) => {
                const view = writer.createEmptyElement( viewDefinition.name );
                writer.setAttribute(dataResource, modelElement.getAttribute(dataResource), view);
                writer.setAttribute('styleValue', modelElement.getAttribute('styleValue'), view);
                writer.setAttribute('contenteditable', false, view);
                // writer.insert(writer.createRangeIn(view).start, writer.createText(modelElement.getAttribute('styleValue')));
                // writer.setCustomProperty( 'widget', true, view );
                return view;
                // return toWidget(view);
            }, converterPriority :'highest'
        });


    }
}
