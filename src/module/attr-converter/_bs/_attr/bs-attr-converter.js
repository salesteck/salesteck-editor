import {Plugin} from 'ckeditor5/src/core';

/**
 * @const {Object} BS_ATTR
 * @type {{keyboard: string, parent: string, backdrop: string, scroll: string, focus: string, dismiss: string, toggle: string, target: string}}
 */
export const BS_ATTR = {
    backdrop: 'data-bs-backdrop',
    keyboard: 'data-bs-keyboard',
    focus: 'data-bs-focus',
    scroll: 'data-bs-scroll',
    target: 'data-bs-target',
    toggle: 'data-bs-toggle',
    dismiss: 'data-bs-dismiss',
    parent: 'data-bs-parent',
};
/**
 * @const {Array} SWITCHABLE_ATTR
 */
const SWITCHABLE_ATTR = [
    BS_ATTR.backdrop, BS_ATTR.keyboard, BS_ATTR.focus, BS_ATTR.scroll
]

/**
 * Class attributeConverter~BsAttrConverter
 */
export default class BsAttrConverter extends Plugin {
    /**
     * @inheritDoc
     * @returns {string}
     */
    static get pluginName() {
        return 'BsAttrConverter';
    }

    /**
     * Initialize BsAttrConverter
     * @param {MultiRootEditor} editor
     */
    constructor(editor) {
        super(editor);
        // this._upcastProp();
        // this._editingDowncastProp();
        // this._dataDowncastProp();
        // this._downCastProp();
        this.setUpBsAttr();

    }

    /**
     * Set bootstrap attributes converter
     *
     * @return void
     */
    setUpBsAttr() {
        const editor = this.editor;
        const conversion = editor.conversion;

        SWITCHABLE_ATTR.forEach(attr => {
            conversion.for('upcast').attributeToAttribute({
                view: {key: attr},
                model: {key: attr, value: viewElement => viewElement.getAttribute(attr) === 'true'}
            });
            conversion.for('dataDowncast').add(dispatcher => {
                dispatcher.on('attribute:' + attr, (evt, data, {writer: viewWriter, mapper}) => {
                    let blockView = mapper.toViewElement(data.item);
                    viewWriter.setAttribute(attr, data.attributeNewValue, blockView);
                    // console.log(`BsAttrConverter:dataDowncast:${evt.name}`, {data, modalElement: data.item, blockView});
                    evt.stop();
                });

            });
            conversion.for('editingDowncast').add(dispatcher => {
                dispatcher.on('attribute:' + attr, (evt, data, {writer: viewWriter, mapper}) => {
                    let blockView = mapper.toViewElement(data.item);
                    viewWriter.setAttribute(attr, data.attributeNewValue, blockView);
                    // console.log(`BsAttrConverter:editingDowncast:${evt.name}`, {data, modalElement: data.item, blockView});
                    evt.stop();
                });
            });
        });
    }

    /**
     *
     * @private
     */
    _upcastProp() {
        this.editor.conversion.for('upcast').attributeToAttribute({
            view: {name: 'div', key: 'class', value: 'fade'},
            model: {key: 'fade', value: viewElement => viewElement.hasClass('fade') ? 'fade' : ''}
        });
        this.editor.conversion.for('upcast').attributeToAttribute({
            view: {name: 'div', key: 'class', value: 'cross-fade'},
            model: {key: 'fade', value: viewElement => viewElement.hasClass('cross-fade') ? 'cross-fade' : ''}
        });
        this.editor.conversion.for('upcast').attributeToAttribute({
            view: {name: 'div', key: 'class', value: 'active'},
            model: {key: 'active', value: viewElement => viewElement.hasClass('active') ? 'active' : ''}
        });
    }

    /**
     *
     * @private
     */
    _dataDowncastProp() {
        this.editor.conversion.for('downcast').attributeToAttribute({
            model: 'fade',
            view: fade => ({key: 'class', value: fade})
            // , converterPriority: 'highest'
        });
        this.editor.conversion.for('downcast').attributeToAttribute({
            model: 'active',
            view: active => ({key: 'active', value: active})
            // , converterPriority: 'highest'
        });
    }

    /**
     *
     * @private
     */
    _editingDowncastProp() {


    }

    /**
     *
     * @private
     */
    _downCastProp() {

    }

}
