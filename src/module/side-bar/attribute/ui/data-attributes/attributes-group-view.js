import AccordionItemView from "../../../../../ui/bs-view/accordion/accordion-item-view";
import DropdownRowView from "../../../../../ui/bs-view/form/dropdown-row-view";
import InputGroupRowView from "../../../../../ui/bs-view/form/input-group-row-view";
import checkIcon from "../../theme/icon/check.svg";
import {viewCreator} from "../../../../../ui/utils";
import BsButtonView from "../../../../../ui/bs-view/form/bs-button-view";
import {_isStrNotEmpty} from "../../../../../general";
import EditDataAttributeCommand from "../../command/edit-data-attribute-command";
function getNormalizeAttrName(attrName){
    return `_normalized_${attrName}`;
}
import {debounce} from 'lodash-es';

const ERROR_TEXT_TIMEOUT = 200;
const validDebounced = debounce((viewField)=>{
    viewField.buttonView.class = '';
}, ERROR_TEXT_TIMEOUT);
function _addListToDropdown( attributeGroupView, dropdownView, values ) {
    const dropdownColumns = dropdownView.columns;
    const _attributeName = dropdownView.attributeName;
    const normalizedAttrName = getNormalizeAttrName(_attributeName);
    if(values.length){
        const buttonView = new BsButtonView( dropdownView.locale );
        buttonView.set({
            label : dropdownView.t('Remove'),
            value : '',
            _attributeName
        })
        buttonView.extendTemplate({
            attributes : {
                class : ['m-2', 'btn-s-sm', 'fs-xsmall'],
                style : {
                    gridColumnEnd : `span ${dropdownColumns}`,
                    whiteSpace : 'break-spaces'
                }
            }
        });
        buttonView.delegate( 'execute' ).to( dropdownView );
        dropdownView._addDropdownItem(buttonView);

        const dropdownSeparator = viewCreator(dropdownView.locale, {
            tag : 'hr',
            attributes : {
                class : ['dropdown-divider'],
                style : {
                    gridColumnEnd : `span ${dropdownColumns}`
                }
            }
        });
        dropdownView._addDropdownItem(dropdownSeparator);


        values.forEach( attrValueGroup =>{
            if(attrValueGroup.type === 'separator'){
                const dropdownSeparator = viewCreator(dropdownView.locale, {
                    tag : 'hr',
                    attributes : {
                        class : ['dropdown-divider'],
                        style : {
                            gridColumnEnd : `span ${dropdownColumns}`
                        }
                    }
                });
                dropdownView._addDropdownItem(dropdownSeparator);
            }else if(attrValueGroup.title && attrValueGroup.value){
                const buttonView = new BsButtonView( dropdownView.locale );
                buttonView.set({
                    label : attrValueGroup.title,
                    value : attrValueGroup.value,
                    _attributeName
                })
                buttonView.extendTemplate({
                    attributes : {
                        class : ['m-2', 'btn-s-sm', 'fs-xsmall'],
                        style : {
                            whiteSpace : 'break-spaces'
                        }
                    }
                });

                buttonView.bind( 'isOn' ).to( attributeGroupView, normalizedAttrName, value => value === buttonView.value);
                buttonView.delegate( 'execute' ).to( dropdownView );
                dropdownView._addDropdownItem(buttonView);

            }
        });
    }
}

export default class AttributesGroupView extends AccordionItemView{

    constructor(local, editor,  options = {}) {
        super(local, editor, options);
        const t = this.t;
        const _this = this;

        /**
         * @property {Object} _modelName
         */
        this.set('_modelName', options.modelName);

        /**
         * @property {Object} _viewName
         */

        this.set('_viewName', options.attrGroup.viewName || null);

        /**
         * @property {Object} _attributes
         */
        this.set('_attributes', null);

        /**
         * @property {Number} columns
         */
        this.set('columns', "3");

        /**
         * @property {Object|null} _undoStepBatch
         */
        this.set('_undoStepBatch', null);

        /**
         * @property {Boolean} _collapse
         */
        this.set('_collapse', true);

        /**
         * @property {String} title
         */
        this.set('title', t(options.attrGroup.label) || '');

        /**
         * @property {Object} _normalizedAttributeIndexes
         */
        this._normalizedAttributeIndexes = {};
        options.attrGroup.groups.forEach(groupElement =>{
            const normalizedName = getNormalizeAttrName(groupElement.attributeName);
            _this.set(normalizedName, '');
            _this._normalizedAttributeIndexes[groupElement.attributeName] = normalizedName;
        });
        /**
         * @property {String|null} _normalizedActivator
         */
        this.set('_normalizedActivator', null);
        /**
         * @property {Array} attributesViews
         */
        this.attributesViews = [];

    }
    render() {
        super.render();
        const _this = this;
        this.on('show', () =>{
            _this._draw();
            _this.attributesViews.forEach(view => {
                view.on('execute', (evtInfo)=>{
                    const attributeName = evtInfo.source._attributeName;
                    if(_isStrNotEmpty(attributeName)){
                        //TODO validator
                        const validator = evtInfo.source._validator;
                        const value = evtInfo.source.value;
                        const normalizedAttrName = getNormalizeAttrName(attributeName);
                        if(value === "" && _this._normalizedActivator === normalizedAttrName){
                            _this._clearValues();
                        }else {
                            _this.set(normalizedAttrName, value);
                            _this._executeValues();
                        }
                        // console.log('AttributesGroupView:execute', {evtInfo, value, normalizedAttrName, attributeName, validator, _this});
                    }
                })
            });
        });
        this.on('hidden', () =>{
            _this.set('_normalizedActivator', null);
            _this.accordionBody.children.clear();
        });
        this.on('change:_attributes', (evt, propertyName, newValue, oldValue)=>{
            if(typeof newValue !== typeof  {}){
                newValue = {};
            }
            // console.log(
            //     `AttributesGroupView:${ propertyName } has changed from ${ JSON.stringify(oldValue) } to ${ JSON.stringify(newValue) }`,
            //     {_this}
            // );
            Object.entries(_this._normalizedAttributeIndexes).map( ([attributeName, normalizedName]) =>{
                _this.set(normalizedName, newValue[attributeName] || '');
            } )
        })
    }
    _draw(){
        const _this = this;
        const locale = this.locale;
        _this.options.attrGroup.groups.forEach( ({label, values, attributeName = '', type = '', activator = false, validator = null}) =>{
            const normalizedAttrName = getNormalizeAttrName(attributeName);
            if(_this._normalizedActivator === null && activator === true){
                _this.set('_normalizedActivator', normalizedAttrName);
            }
            if(typeof type === typeof []){
                if(typeof values === typeof [] && values.length ){
                    let columns ='3';
                    if(values.length < columns){
                        columns = values.length
                    }
                    const attributeDropdownView =  new DropdownRowView(locale, {columns});
                    attributeDropdownView.set({
                        label, attributeName, columns, validator, _values : values
                    });
                    attributeDropdownView.bind('value').to(_this, normalizedAttrName, normalizedValue =>{
                        if(_isStrNotEmpty(normalizedValue)){
                            let founded = attributeDropdownView._values.find(elem =>{
                                return elem.value === normalizedValue;
                            });
                            if(founded){
                                return founded.title;
                            }
                        }
                        return '';
                    });
                    if(activator === false && _isStrNotEmpty(_this._normalizedActivator)){
                        attributeDropdownView.bind('isReadOnly')
                            .to(_this, _this._normalizedActivator, _value =>_value === "")
                        ;
                    }
                    _addListToDropdown(_this, attributeDropdownView, values);
                    _this.accordionBody.children.add(attributeDropdownView);
                    _this.attributesViews.push(attributeDropdownView);
                }
            }else if(typeof type === typeof ''){
                const attributeInputView = new InputGroupRowView(locale);
                attributeInputView.set({
                    label, _attributeName : attributeName, _validator : validator, type,
                    icon : checkIcon,
                });
                attributeInputView.inputView.bind('value').to(_this, normalizedAttrName);
                if(activator === false && _isStrNotEmpty(_this._normalizedActivator)){
                    attributeInputView.bind('isReadOnly')
                        .to(_this, _this._normalizedActivator, _value =>_value === "")
                    ;
                }
                _this.listenTo(attributeInputView, 'execute', ()=>{
                    attributeInputView.buttonView.class = 'hvr-2d-pop hover'
                    validDebounced(attributeInputView);
                })
                _this.accordionBody.children.add(attributeInputView);
                _this.attributesViews.push(attributeInputView);
            }
        } );

    }
    _clearValues(){
        const _this = this;
        Object.values(_this._normalizedAttributeIndexes).map( (normalizedName)=>{
            _this.set(normalizedName, '');
        } );
        // console.log('AttributesGroupView:_clearValues', {_this});
        _this._executeValues();

    }
    _executeValues(){
        const _this = this;
        const attributeValues = {};
        Object.entries(_this._normalizedAttributeIndexes).map( ([attributeName, normalizedName])=>{
            attributeValues[attributeName] = _this[normalizedName];
        } )
        // console.log('AttributesGroupView:_executeValues', {_this, attributeValues});
        EditDataAttributeCommand._execute(_this.editor, attributeValues, _this._undoStepBatch)
    }
}
