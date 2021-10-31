
import {debounce} from 'lodash-es';
import AccordionItemView from "../../../../../ui/bs-view/accordion/accordion-item-view";
import InputGroupRowView from "../../../../../ui/bs-view/form/input-group-row-view";
import checkIcon from '../../theme/icon/check.svg';
import EditIdCommand from "../../command/edit-id-command";
import {_isStr} from "../../../../../general";


const ERROR_TEXT_TIMEOUT = 200;

const lengthErrorTextDebounced = debounce((viewField, errorText) => {
    viewField.errorText = errorText;
}, ERROR_TEXT_TIMEOUT);
const validDebounced = debounce((viewField)=>{
    viewField.inputView.class = '';
}, ERROR_TEXT_TIMEOUT);

function idExist(id, t){
    const elementExist = !!document.getElementById(id);
    if (elementExist) {
        return t('This id already exist!');
    }
    return true;
}
function hasWhiteSpace(id) {
    return /\s/g.test(id);
}

function _idValidators(id, t){
    if(hasWhiteSpace(id)){
        return t("Id can't contain spaces!");
    }
    return idExist(id, t);

}
export default class EditIdView extends AccordionItemView{


    constructor(local, editor,  options = {}) {
        super(local, editor, options);
        const t = this.t;
        this.options = options;
        this.set('_elementId');
        this.set('_undoStepBatch', null);
        this.set('title', 'Element Id');
        this.set("_isValid" , false);
        const _this = this;
        const idInputView = new InputGroupRowView(this.locale);
        idInputView.set({
            labelSizeClass : 'col-12',
            inputGroupSizeClass : 'col-12',
            icon : checkIcon,
            // label: ('Element Id'),
            class :'b rounded'
        });
        idInputView.inputView.bind('value').to(this, '_elementId');

        idInputView.on('input', ()=>{
            idInputView.errorText = "";
            idInputView.inputView.class = '';
        })
        idInputView.on('execute', ()=>{
            lengthErrorTextDebounced.cancel();
            const value = idInputView.getValue().trim();
            const validator = _idValidators(value, t);
            if (validator === true || value === _this._elementId) {

                EditIdCommand._execute(_this.editor, value, _this._undoStepBatch);
                idInputView.errorText = null;
                idInputView.inputView.class = 'is-valid';
                validDebounced(idInputView);
            } else if(_isStr(validator)) {
                lengthErrorTextDebounced(idInputView, validator);
            }
        })
        this.idInputView = idInputView;

    }
    _getBody(options = {}) {
        return [this.idInputView];
    }
}
