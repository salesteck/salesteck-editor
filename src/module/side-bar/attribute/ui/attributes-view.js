
import AccordionView from "../../../../ui/bs-view/accordion/accordion-view";
import { uid } from 'ckeditor5/src/utils';
import {_getCommand} from "../../../../engine/utils/commands";
import EditIdView from "./id/edit-id-view";
import EditClassView from "./class/edit-class-view";
import EditClassCommand from "../command/edit-class-command";
import EditIdCommand from "../command/edit-id-command";
import ClassGroupViews from "../../class/ui/class-group-views";
import SelectClassCommand from "../../class/command/select-class-command";
import AttributesGroupView from "./data-attributes/attributes-group-view";
import EditDataAttributeCommand from "../command/edit-data-attribute-command";
export default class AttributesView extends AccordionView{

    constructor(locale, editor, options = {}) {
        super(locale);
        this.editor = editor;

        const bind = this.bindTemplate;
        const _this = this;

        this.set('_undoStepBatch', null);

        this.editIdView = null;
        this.editClassView = null;
        this.elementSelectClass = options.elementSelectClass || {};
        this.generalDataAttribute = options.generalDataAttribute || [];
        this.privateAttribute = options.privateAttribute || [];
        this.privateClassGroupViews = {};
        this.generalAttrGroupViews = [];
        this.privateAttrGroupViews = [];
        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'id', uid() );


        this.extendTemplate({
            attributes : {
                class : [
                    bind.to('class')
                ],
                id : bind.to('id')
            }
        });

        _this.on( 'change:show', (evt, propertyName, newValue, oldValue) =>{
            // console.log( `ClassAttributesView:${ propertyName } has changed from ${ oldValue } to ${ newValue }`);
            if(newValue === true){
                _this._undoStepBatch = _this.editor.model.createBatch();

                const editClassCommand = _getCommand(this.editor, EditClassCommand.commandName);
                _this.editClassView.bind('_classes').to(editClassCommand, 'value');
                _this.editClassView.bind('_undoStepBatch').to(_this, '_undoStepBatch');



                const editIdCommand = _getCommand(this.editor, EditIdCommand.commandName);
                _this.editIdView.bind('_elementId').to(editIdCommand, 'value');
                _this.editIdView.bind('_undoStepBatch').to(_this, '_undoStepBatch');


                const selectClassCommand = _getCommand(this.editor, SelectClassCommand.commandName);
                Object.entries(_this.privateClassGroupViews).map( ([key, view])=>{
                    view.bind('display').to(selectClassCommand, 'elementName', elementName => elementName === key);
                    view.bind('_isEnabled').to(selectClassCommand, 'elementName', elementName => elementName === key);
                    view.bind('_classes').to(selectClassCommand, 'value');
                    view.bind('_undoStepBatch').to(_this, '_undoStepBatch');
                } );

                const editDataAttributeCommand = _getCommand(this.editor, EditDataAttributeCommand.commandName);
                _this.generalAttrGroupViews.forEach( attrView =>{
                    attrView.bind('_attributes').to(editDataAttributeCommand, 'value');
                    attrView.bind('_undoStepBatch').to(_this, '_undoStepBatch');
                })
                _this.privateAttrGroupViews.forEach( attrView =>{
                    attrView.bind('display')
                        .to(editDataAttributeCommand, 'viewName', editDataAttributeCommand, 'elementName', (viewName, elementName) => {
                        // console.log( {viewName, elementName, attrView} );
                            return viewName === attrView._viewName && elementName === attrView._modelName;
                        }
                    );
                    attrView.bind('_attributes').to(editDataAttributeCommand, 'value');
                    attrView.bind('_undoStepBatch').to(_this, '_undoStepBatch');
                })


            }else {

                _this._undoStepBatch = null;

                _this.editClassView.unbind('_classes');
                _this.editClassView.unbind('_undoStepBatch');

                _this.editIdView.unbind('_elementId');
                _this.editIdView.unbind('_undoStepBatch');


                Object.entries(_this.privateClassGroupViews).map( ([key, view])=>{
                    view.display = false;
                    view.unbind('_classes');
                    view.unbind('_undoStepBatch');
                    view.unbind('display');
                    view.unbind('_isEnabled');
                } );

                _this.generalAttrGroupViews.forEach( attrView =>{
                    attrView.unbind('_attributes');
                    attrView.unbind('_undoStepBatch');
                });
                _this.privateAttrGroupViews.forEach( attrView =>{
                    attrView.unbind('display');
                    attrView.unbind('_attributes');
                    attrView.unbind('_undoStepBatch');
                });
            }
        });
    }

    render() {
        const _this = this;
        return new Promise( resolve => {
            this.on( 'loaded', resolve );

            super.render();

            const editIdView = new EditIdView(_this.locale, _this.editor);
            _this.addAccordionItem(editIdView);
            _this.editIdView = editIdView;

            const editClassView = new EditClassView(_this.locale, _this.editor);
            _this.addAccordionItem(editClassView);
            _this.editClassView = editClassView;

            Object.entries( _this.elementSelectClass ).map( ([key, selectClass]) =>{
                if(Object.keys(selectClass).length){
                    // console.log({key, selectClass});
                    const selectClassGroupView = new ClassGroupViews(_this.locale, _this.editor, {selectClass});
                    selectClassGroupView.set({
                        display : false,
                        _collapse : true,
                        columns : 3
                    });
                    _this.addAccordionItem(selectClassGroupView);
                    _this.privateClassGroupViews[key] = selectClassGroupView;
                }
            } );
            _this.generalDataAttribute.forEach(attrGroup =>{
                const attrGroupView = new AttributesGroupView(_this.locale, _this.editor, {attrGroup});
                attrGroupView.set({
                    _collapse : false,
                    columns : 3
                });
                _this.addAccordionItem(attrGroupView);
                _this.generalAttrGroupViews.push(attrGroupView);
            });

            Object.entries(_this.privateAttribute).map( ([modelName, modelAttributes]) =>{

                modelAttributes.forEach(attrGroup =>{
                    const attrGroupView = new AttributesGroupView(_this.locale, _this.editor, {modelName, attrGroup});
                    attrGroupView.set({
                        display : false,
                        _collapse : false,
                        columns : 3
                    });
                    _this.addAccordionItem(attrGroupView);
                    _this.privateAttrGroupViews.push(attrGroupView);
                });
            } )


        } );
    }
}
