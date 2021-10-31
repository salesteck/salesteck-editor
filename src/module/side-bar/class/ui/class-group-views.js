
// import { Collection } from 'ckeditor5/src/utils';
import {  Model } from 'ckeditor5/src/ui';
import AccordionItemView from "../../../../ui/bs-view/accordion/accordion-item-view";
import DropdownRowView from "../../../../ui/bs-view/form/dropdown-row-view";
// import ListSeparatorView from "@ckeditor/ckeditor5-ui/src/list/listseparatorview";
import BsButtonView from "../../../../ui/bs-view/form/bs-button-view";
import {_isArray} from "../../../../general";
import SelectClassCommand from "../command/select-class-command";
import {viewCreator} from "../../../../ui/utils";
// import EditClassView from "../../attribute/ui/class/edit-class-view";

/*

function _getClassDefinitions( view, suffix, values, variant, columns, required = false, multiple = false ) {
    const itemDefinitions = new Collection();
    let prefix = variant.prefix;
    let regex = new RegExp(`^${prefix}${suffix}$`);
    if(required === false && multiple === false){
        const removeDefinition =  {
            type: 'button',
            _title : view.t('Remove'),
            _value: '',
            model: new Model( {
                _prefix : prefix,
                _regex : regex,
                _value: '',
                _title : view.t('Remove'),
                label: view.t('Remove'),
                withText: true,
            } ),
            _template :{
                attributes : {
                    class : ['m-2', 'btn-s-sm', 'fs-xs'],
                    style : {
                        gridColumnEnd : `span ${columns}`,
                        style : {
                            whiteSpace : 'break-spaces'
                        }
                    }
                }
            }
        };
        itemDefinitions.add( removeDefinition );
    }
    values.forEach( (item) =>{
        const _value = prefix+item.value;
        const definition = {
            type: 'button',
            _title :item.title,
            _value :_value,
            model: new Model( {
                _prefix : prefix,
                _regex : regex,
                _value: _value,
                _title :item.title,
                label: item.title,
                withText: true
            } ),
            _template: {
                attributes : {
                    class : ['m-2', 'btn-s-sm', 'fs-xs'],
                    style : {
                        whiteSpace : 'break-spaces'
                    }
                }

            }
        };

        definition.model.bind( 'isOn' ).to( view, '_classes', _classes => {
            if(_isArray(_classes)){
                return _classes.includes(_value);
                // return _classes.find(_class => _class === _value);
            }
            return false;
        });

        itemDefinitions.add( definition );
    } );
    return itemDefinitions;
}
function _addListToDropdown( dropdownView, items ) {
    const locale = dropdownView.locale;

    dropdownView._dropddownItems.bindTo( items ).using( ( { type, model, _template } ) => {
        if ( type === 'separator' ) {
            // return new ListSeparatorView( locale );
        } else if ( type === 'button' || type === 'switchbutton' ) {
            let buttonView;

            if ( type === 'button' ) {
                buttonView = new BsButtonView( locale );
            } else {
                // buttonView = new SwitchButtonView( locale );
            }
            buttonView.extendTemplate(_template);

            // Bind all model properties to the button _view.
            buttonView.bind( ...Object.keys( model ) ).to( model );
            buttonView.delegate( 'execute' ).to( dropdownView );


            return buttonView;
        }
    } );

}*/
function _populateDropdown(view, dropdownView, {suffix, values, variant, columns, required = false, multiple = false}){
    const locale = dropdownView.locale;
    let prefix = variant.prefix;
    let regex = new RegExp(`^${prefix}${suffix}$`);
    if(required === false && multiple === false){

        const removeButtonView = new BsButtonView( locale );
        //TODO check if this is necessary
        // removeButtonView.set({
        //     _title : view.t('Remove'),
        //     _value: ''
        // })
        removeButtonView.extendTemplate({
            attributes : {
                class : ['m-2', 'btn-s-sm', 'fs-xsmall'],
                style : {
                    gridColumnEnd : `span ${columns}`,
                    style : {
                        whiteSpace : 'break-spaces'
                    }
                }
            }
        });
        const model = new Model( {
            _prefix : prefix,
            _regex : regex,
            _value: '',
            _title : view.t('Remove'),
            label: view.t('Remove'),
            withText: true,
        } );
        removeButtonView.bind( ...Object.keys( model ) ).to( model );
        removeButtonView.delegate( 'execute' ).to( dropdownView );
        dropdownView._addDropdownItem(removeButtonView);
    }
    values.forEach( (classGroupValue) =>{
        if(classGroupValue.type === 'separator'){
            const dropdownSeparator = viewCreator(dropdownView.locale, {
                tag : 'hr',
                attributes : {
                    class : ['dropdown-divider'],
                    style : {
                        gridColumnEnd : `span ${columns}`
                    }
                }
            });
            dropdownView._addDropdownItem(dropdownSeparator);
        }else {
            const _value = prefix+classGroupValue.value;
            const itemButtonView = new BsButtonView( locale );
            itemButtonView.extendTemplate({
                attributes : {
                    class : ['m-2', 'btn-s-sm', 'fs-xsmall'],
                    style : {
                        whiteSpace : 'break-spaces'
                    }
                }
            });
            const itemModel = new Model( {
                _prefix : prefix,
                _regex : regex,
                _value: _value,
                _title :classGroupValue.title,
                label: classGroupValue.title,
                withText: true
            } );
            itemButtonView.bind( ...Object.keys( itemModel ) ).to( itemModel );

            itemButtonView.bind( 'isOn' ).to( view, '_classes', _classes => {
                if(_isArray(_classes)){
                    return _classes.includes(_value);
                    // return _classes.find(_class => _class === _value);
                }
                return false;
            });
            itemButtonView.delegate( 'execute' ).to( dropdownView );
            dropdownView._addDropdownItem(itemButtonView);

        }

    } );
    dropdownView.bind('value').to(view, '_classes', _classes =>{
        if(_isArray(_classes)){
            let founded = _classes.filter( _class => regex.test(_class));
            // console.log({founded})
            if(founded.length === 1){
                for(let dropdownItem of dropdownView._dropddownItems){
                    if(dropdownItem._value === founded[0]){
                        return dropdownItem._title;
                    }
                }
            }
            if(founded.length > 1){
                return 'Multiple';
            }
        }
        return '';
    });
}

export default class ClassGroupViews extends AccordionItemView{

    constructor(local, editor,  options = {}) {
        super(local, editor, options);
        const t = this.t;
        this.options = options;
        this.set('_classes');
        this.set('isVisible', false);
        this.set('columns', options.selectClass.columns || "3");
        this.set('_undoStepBatch', null);
        this.set('_collapse', true);
        this.set('_isDrown', false);
        this.set('title', t(options.selectClass.label) || '');

    }
    _getDropdownProperty({label, suffix, values, variants, required = false, multiple = false}){
        const locale = this.locale;
        const _this = this;
        const editor = this.editor;
        if(_isArray(variants) && variants.length > 0){
            let firstVariant = variants[0];
            let columns = _this.columns;
            if(values.length < columns){
                columns = values.length
            }

            const firstDropdown = new DropdownRowView(locale, {columns});
            _populateDropdown(_this, firstDropdown, {
                suffix, values, variant : firstVariant, columns, required, multiple
            });
            firstDropdown.set({
                // classDefinitions : firstClassDefinitions,
                title : label,
                singleChoice : !multiple,
                // labelSizeClass : labelSizeClass,
                // dropdownSizeClass : dropdownSizeClass,
                label : firstVariant.label,
                class :'p-10 b-all',
                isPopulated : false,
                hasSubElement : variants.length>1
            });
            firstDropdown.bind('_collapse').to(_this, '_collapse');
            if(multiple){
                firstDropdown.on('execute', evt => {
                    SelectClassCommand._toggle(editor, {value : evt.source._value, regex : evt.source._regex, batch : _this._undoStepBatch})
                });
            }else {
                firstDropdown.on('execute', evt => {
                    SelectClassCommand._execute(editor, {value : evt.source._value, regex : evt.source._regex, batch : _this._undoStepBatch})
                });
            }
            firstDropdown.on('expand', () =>{
                // console.log(`expand`);
                if(!firstDropdown.isPopulated){

                    variants.forEach((variant, index)=>{
                        if(index > 0){

                            let subDropdown = new DropdownRowView(locale, {columns});
                            _populateDropdown(_this, subDropdown, {
                                suffix, values, variant : variant, columns, required, multiple
                            });
                            subDropdown.set({
                                // classDefinitions : classDefinitions,
                                // labelSizeClass : labelSizeClass,
                                // dropdownSizeClass : dropdownSizeClass,
                                label : variant.label,
                                class :'px-0'
                            });
                            if(multiple){
                                subDropdown.on('execute', evt => {
                                    SelectClassCommand._toggle(editor, {value : evt.source._value, regex : evt.source._regex, batch : _this._undoStepBatch})
                                });
                            }else {
                                subDropdown.on('execute', evt => {
                                    SelectClassCommand._execute(editor, {value : evt.source._value, regex : evt.source._regex, batch : _this._undoStepBatch})
                                });
                            }
                            firstDropdown._addSubItem(subDropdown);
                        }
                    });
                    firstDropdown.isPopulated = true;
                }
            })
            return firstDropdown;
        }
        return null;
    }
    _draw(){
        const _this = this;
        // _this.accordionBody.children.clear();
        if(!_this._isDrown){
            // let start = Date.now();
            const prom = new Promise( ( resolve, reject )=>{

                _this.options.selectClass.groups.forEach( group =>{
                    const dropdownPropertyView = this._getDropdownProperty(group);
                    if(dropdownPropertyView){
                        _this.accordionBody.children.add(dropdownPropertyView);
                    }
                } );
                _this._isDrown = true;
                resolve();
            } )
            prom.then( ()=>{

                // console.log({time: (Date.now() - start)});
            } )
        }

    }


    render() {
        super.render();
        const _this = this;
        // this.on('change:isVisible', (evtInfo, name, value, oldValue) =>{
        //     console.log(`${evtInfo.name}`, {name, value, oldValue})
        //     // _this._draw();
        // });
        this.on('show', () =>{
            // console.log(`show`, {name, value, oldValue})
            _this._draw();
        });
        // this.on('show', () =>{
        //     _this._draw();
        // });
        // this.on('hidden', () =>{
        //     _this.accordionBody.children.clear();
        // });
        // return new Promise( resolve => {
        //     this.on( 'loaded', resolve );
        //     _this._draw();
        // } );
    }

}

