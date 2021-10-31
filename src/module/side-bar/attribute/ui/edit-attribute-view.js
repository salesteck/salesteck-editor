
import {debounce} from 'lodash-es';
import AccordionItemView from "../../../../ui/bs-view/accordion/accordion-item-view";
import InputGroupRowView from "../../../../ui/bs-view/form/input-group-row-view";
import plusIcon from '../theme/icon/plus.svg';
import removeIcon from '../theme/icon/remove.svg';
import EditClassCommand from "../command/edit-class-command";
import InputRowView from "../../../../ui/bs-view/form/input-row-view";
import EditIdCommand from "../command/edit-id-command";
import {_isStr} from "../../../../general";
const ERROR_TEXT_TIMEOUT = 200;

const lengthErrorTextDebounced = debounce((viewField, errorText) => {
    viewField.errorText = errorText;
}, ERROR_TEXT_TIMEOUT);

export default class EditAttributeView extends AccordionItemView{

    constructor(local, editor,  options = {}) {
        super(local, editor, options);
        const t = this.t;
        this.options = options;
        this.set('_classes');
        this.set('_undoStepBatch', null);
        this.set('title', 'Classes');
        // console.log("EditAttributeView.constructor", {arguments});
        const addClassInputView = new InputGroupRowView(this.locale);
        addClassInputView.set({
            labelSizeClass : 'col-12',
            inputGroupSizeClass : 'col-12',
            icon : plusIcon,
            label: ('Add a class'),
            class :'p-10 b rounded'
        });
        this.fixedClass = this.editor.config.get('fixedClass');

    }
    _getBody(options = {}) {
        return [];
    }
    render() {
        super.render();
        const _this = this;
        this.on('show', (evt) =>{
            // console.log( `EditClassView:show`/*, {collapse: collapse}*/ );
            _this._draw();
        });
        this.on('hidden', (evt) =>{
            // console.log( `EditClassView:hide`/*, {collapse: collapse}*/ );
            _this.accordionBody.children.clear();
        });
        this.on('change:_classes', () =>{
            _this._draw();
        })
    }

    _draw(){
        const _this = this;
        _this.accordionBody.children.clear();
        const addClassInputView = new InputGroupRowView(this.locale);
        addClassInputView.set({
            labelSizeClass : 'col-12 p-0',
            inputGroupSizeClass : 'col-12',
            icon : plusIcon,
            class :'p-10 b rounded'
        });
        addClassInputView.on('input', ()=>{
            addClassInputView.errorText = "";
        })
        addClassInputView.on('execute', ()=>{

            lengthErrorTextDebounced.cancel();
            const value = addClassInputView.getValue().trim();
            const classes = value.split(' ');
            const inFixedClass = classes.filter( elem =>{
                return _this.fixedClass.includes(elem);
            });
            const duplicatedClass = classes.filter( elem =>{
                return _this._classes.includes(elem);
            });
            if(duplicatedClass.length){
                lengthErrorTextDebounced(addClassInputView, duplicatedClass.join(', ')+' : '+_this.t('class(s) already exist'));
            }else if(inFixedClass.length){
                lengthErrorTextDebounced(addClassInputView, inFixedClass.join(', ')+' : '+_this.t('class(s) is reserved'));
            }else {
                EditClassCommand._add(_this.editor, value, _this._undoStepBatch);
            }


        });
        _this._classes.forEach( classValue =>{
            const isFixedClass = _this.fixedClass.includes(classValue);
            let classInputView;
            if(isFixedClass){
                classInputView = new InputRowView(this.locale);
            }else {
                classInputView = new InputGroupRowView(this.locale);
            }

            classInputView.set({
                disableButton : isFixedClass,
                value : classValue,
                labelSizeClass : 'col-12 p-0',
                inputGroupSizeClass : 'col-12',
                icon : removeIcon,
            });

            if(!isFixedClass){
                classInputView.on('execute', ()=>{
                    EditClassCommand._remove(_this.editor, classValue, _this._undoStepBatch);
                });

            }
            classInputView.inputView.element.disabled = true;
            classInputView.setValue(classValue);
            addClassInputView._addSubItem(classInputView);
        })

        _this.accordionBody.children.add(addClassInputView);

    }

}
