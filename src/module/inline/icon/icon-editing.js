import {Plugin} from 'ckeditor5/src/core';
import {Widget, toWidget} from 'ckeditor5/src/widget';

import './theme/icon.css';

export default class IconEditing extends Plugin {

    static get pluginName() {
        return "IconEditing";
    }
    static get modelName() {
        return "icon";
    }
    static get attrName(){
        return "classIcon";
    }

    static get requires() {
        return [Widget];
    }

    constructor(editor) {
        super(editor);

        editor.config.define('iconConfig', {
            columns : 6
        });
        // console.log('IconEditing#init() got called', {arguments});
        this._defineSchema();
        this._defineConverters();

        // editor.editing.mapper.on(
        //     'viewToModelPosition',
        //     viewToModelPositionOutsideModelElement(editor.model, viewElement => _getBlockName(viewElement) === IconEditing.modelName)
        // );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register(IconEditing.modelName, {
            // Allow wherever text is allowed:
            allowWhere: ['$text'],

            // The placeholder will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
            isObject: true,
            // The inline widget can have the same attributes as text (for example linkHref, bold).
            allowAttributesOf: '$text',

            // The placeholder can have many types, like date, name, surname, etc:
            allowAttributes: ['name', 'class', IconEditing.attrName]
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        const view = {
            name: 'i'
        };

        conversion.for('upcast').elementToElement({
            view: view,
            model: (viewElement, {writer: modelWriter}) => {
                return modelWriter.createElement(IconEditing.modelName, {classIcon : viewElement.getAttribute('class')});
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: IconEditing.modelName,
            view: (modelItem, {writer: viewWriter}) => {
                const iconView = this._createIconView(modelItem, viewWriter);
                return toWidget(iconView, viewWriter);

            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: IconEditing.modelName,
            view: (modelItem, {writer: viewWriter}) => this._createIconView(modelItem, viewWriter)
        });

    }

    _createIconView(modelItem, viewWriter) {
        const classIcon = modelItem.getAttribute(IconEditing.attrName);

        const iconView = viewWriter.createContainerElement('i', {
            class: classIcon
        }, {
            isAllowedInsideAttributeElement: true
        });
        // _setBlockName(viewWriter, iconView, IconEditing.modelName);
        // console.log('IconEditing#_createIconView',{
        //     modelItem, viewWriter, iconView, classIcon, name : modelItem.getAttribute('name')
        // })

        // Insert the placeholder name (as a text).
        // const innerText = viewWriter.createText('{' + name + '}');
        // viewWriter.insert(viewWriter.createPositionAt(placeholderView, 0), innerText);
        // viewWriter.createPositionAt(iconView, 0)

        return iconView;
    }
}
