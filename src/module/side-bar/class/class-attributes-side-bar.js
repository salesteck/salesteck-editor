import { Plugin } from 'ckeditor5/src/core';
import Offcanvas from 'bootstrap/js/src/offcanvas';
import { _getCommand} from "../../../engine/utils/commands";

import ClassAttributesSideBarView from "./ui/class-attributes-side-bar-view";
import SelectClassCommand from "./command/select-class-command";
import EditClassCommand from "../attribute/command/edit-class-command";
import SideBar, {_appendSideBar} from "../side-bar";

export default class ClassAttributesSideBar extends Plugin {

    static get pluginName() {
        return 'SalesteckClassAttributesSideBar';
    }

    constructor(editor) {
        super(editor);
        this.set('modelName', null);
        this.set('container', null);
        this.generalSelectClass = editor.config.get('generalSelectClass');
        this.view = null;
        this._offCanvas = null;
    }

    _createSidebarView() {
        return new ClassAttributesSideBarView(this.editor.locale, this.editor, {generalSelectClass : this.generalSelectClass});
    }

    init() {
        const _this = this;
        _this.container = _appendSideBar(`ct-side-bar-class`);
        // let id = 'ct-side-bar-class';
        //
        // let container = document.querySelector(`#${id}`);
        // if (!container) {
        //     container = document.createElement('div');
        //     container.setAttribute("id", id);
        //     document.body.append(container);
        //
        // }
        // _this.container = container;
        this.selectClassCmd = _getCommand(_this.editor, SelectClassCommand.commandName);
        this.editClassComd = _getCommand(_this.editor, EditClassCommand.commandName);

    }
    afterInit(){
        const _this = this;
        this.listenTo(this.editor, 'ready', ()=>{
            // console.log("editor:ready")
            _this.view = _this._createSidebarView();
            _this.view.render();
            _this.container.appendChild(_this.view.element);
            _this._offCanvas = new Offcanvas(_this.view.element, {keyboard : true, toggle : false, backdrop : true, scroll : true});
            _this.view.element.addEventListener('hidden.bs.offcanvas', () => {
                _this.view.hide();
                _this._clearDisableWidgetToolBar();
                _this.selectClassCmd.set('modelName', null);
                _this.editClassComd.set('modelName', null);
            });
            _this.view.element.addEventListener('hide.bs.offcanvas', () => {
                _this.view.hide();
                _this._clearDisableWidgetToolBar();
                _this.selectClassCmd.set('modelName', null);
                _this.editClassComd.set('modelName', null);
            });
            _this.view.element.addEventListener('shown.bs.offcanvas',  () =>{
                _this.view.show();
                // _this._clearDisableWidgetToolBar();
            });




            _this.listenTo(_this.view, 'cancel', () =>{
                _this.hide();
            });

            _this.listenTo(_this.view, 'save', () =>{
                _this.hide();
            });
            _this.view.bind('extraTitle').to(_this.selectClassCmd, 'elementName', modelName => !!modelName ?` : ${modelName}` :'' );
        })
    }
    show(modelName){
        const _this = this;
        _this.modelName = modelName;

        _this.selectClassCmd.set('modelName', modelName);
        _this.editClassComd.set('modelName', modelName);
        _this._forceDisableWidgetToolBar();
        _this._offCanvas.show();
    }

    hide(){
        if(this._offCanvas){
            this._forceDisableWidgetToolBar();
            this._offCanvas.hide();
        }
    }

    destroy() {
        this.view.destroy();
    }
    _forceDisableWidgetToolBar(){
        SideBar._forceDisableWidgetToolBar(this.editor, ClassAttributesSideBar.pluginName);
    }
    _clearDisableWidgetToolBar(){
        SideBar._clearDisableWidgetToolBar(this.editor, ClassAttributesSideBar.pluginName);
        this.editor.focus();
    }
}
