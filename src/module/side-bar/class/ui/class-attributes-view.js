
import AccordionView from "../../../../ui/bs-view/accordion/accordion-view";
import { uid } from 'ckeditor5/src/utils';
// import ClassGroupViews from "./class-group-views";
import ClassGroupViews from "./class-group-views";
import SelectClassCommand from "../command/select-class-command";
import {_getCommand} from "../../../../engine/utils/commands";
import EditClassView from "../../attribute/ui/class/edit-class-view";
import EditClassCommand from "../../attribute/command/edit-class-command";

export default class ClassAttributesView extends AccordionView{
    constructor(locale, editor, {generalSelectClass = []}) {
        super(locale);
        this.editor = editor;


        const bind = this.bindTemplate;
        const _this = this;

        this.set('_undoStepBatch', null);

        this.classGroupViews = [];
        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'id', uid() );

        this.generalSelectClass = generalSelectClass;

        this.extendTemplate({
            attributes : {
                class : [
                    bind.to('class')
                ],
                id : bind.to('id')
            }
        });

        _this.on( 'change:show', (evt, propertyName, newValue) =>{
            // console.log( `ClassAttributesView:${ propertyName } has changed from ${ oldValue } to ${ newValue }`);
            if(newValue === true){
                _this.set('isVisible', true);
                _this._undoStepBatch = _this.editor.model.createBatch();

                const selectClassCommand = _getCommand(this.editor, SelectClassCommand.commandName);

                const editClassCommand = _getCommand(this.editor, EditClassCommand.commandName);
                _this.editClassView.bind('_classes').to(editClassCommand, 'value');
                _this.editClassView.bind('_undoStepBatch').to(_this, '_undoStepBatch');



                _this.classGroupViews.forEach( (view)=>{
                    view.bind('_classes').to(selectClassCommand, 'value');
                    view.bind('_undoStepBatch').to(_this, '_undoStepBatch');

                } );
            }else {
                _this.set('isVisible', false);
                _this.editClassView.unbind('_classes');
                _this.editClassView.unbind('_undoStepBatch');
                _this.classGroupViews.forEach( ( view ) => {
                    _this._undoStepBatch = null;
                    _this._classes = [];
                    view.unbind('_classes');
                    view.unbind('_undoStepBatch');
                } );
            }
        });
    }

    render() {
        super.render();

        const _this = this;
        return new Promise( resolve => {
            this.on( 'loaded', resolve );


            const editClassView = new EditClassView(_this.locale, _this.editor);
            _this.addAccordionItem(editClassView);
            _this.editClassView = editClassView;
            _this.generalSelectClass.forEach( selectClass =>{
                const selectClassGroupView = new ClassGroupViews(_this.locale, _this.editor, {selectClass});
                _this.addAccordionItem(selectClassGroupView);
                _this.classGroupViews.push(selectClassGroupView);
            });
        } );
    }
}
