import {Plugin} from 'ckeditor5/src/core';
import {Widget, toWidget, viewToModelPositionOutsideModelElement} from 'ckeditor5/src/widget';

import PlaceholderCommand from './placeholdercommand';                // ADDED
import './theme/placeholder.css';
import PlaceholderItem from "./placeholderitem";

export default class PlaceholderEditing extends Plugin {


    static get requires() {
        return [Widget];
    }

    init() {
        // console.log('PlaceholderEditing#init() got called');

        this._placeHolderClass = 'data-placeholder';

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('placeholder', new PlaceholderCommand(this.editor));

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement(this.editor.model, viewElement => viewElement.hasClass(this._placeHolderClass))
        );

        this.editor.config.define('placeholderConfig', {
            types: ['date', 'first name', 'surname'],
            items : [
                PlaceholderItem._inst('date', 'date'),
                PlaceholderItem._inst('first name', 'firstName'),
                PlaceholderItem._inst('surname', 'surname')
            ]
        });
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('placeholder', {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // The placeholder will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
            isObject: true,

            // The inline widget can have the same attributes as text (for example linkHref, bold).
            allowAttributesOf: '$text',

            // The placeholder can have many types, like date, name, surname, etc:
            allowAttributes: ['name']
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for('upcast').elementToElement({
            view: {
                name: 'span',
                classes: [this._placeHolderClass]
            },
            model: (viewElement, {writer: modelWriter}) => {
                // Extract the "name" from "{name}".
                const name = viewElement.getChild(0).data.slice(1, -1);

                return modelWriter.createElement('placeholder', {name});
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: 'placeholder',
            view: (modelItem, {writer: viewWriter}) => {
                const widgetElement = this._createPlaceholderView(modelItem, viewWriter);

                // Enable widget handling on a placeholder element inside the editing _view.
                return toWidget(widgetElement, viewWriter);
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: 'placeholder',
            view: (modelItem, {writer: viewWriter}) => this._createPlaceholderView(modelItem, viewWriter)
        });

    }

    _createPlaceholderView(modelItem, viewWriter) {
        const name = modelItem.getAttribute('name');

        const placeholderView = viewWriter.createContainerElement('span', {
            class: this._placeHolderClass
        }, {
            isAllowedInsideAttributeElement: true
        });

        // Insert the placeholder name (as a text).
        const innerText = viewWriter.createText('{' + name + '}');
        viewWriter.insert(viewWriter.createPositionAt(placeholderView, 0), innerText);

        return placeholderView;
    }
}
