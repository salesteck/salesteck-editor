import { Plugin } from 'ckeditor5/src/core';


import Offcanvas from 'bootstrap/js/src/offcanvas';


import {_addCommand, _getCommand} from "../../../engine/utils/commands";
import AttributesSideBarView from "./ui/attributes-side-bar-view";
import SelectClassCommand from "../class/command/select-class-command";
import EditClassCommand from "./command/edit-class-command";
import EditIdCommand from "./command/edit-id-command";
import EditDataAttributeCommand from "./command/edit-data-attribute-command";
import SideBar, {_appendSideBar} from "../side-bar";

export default class AttributesSideBar extends Plugin {

    static get pluginName() {
        return 'SalesteckAttributesSideBar';
    }

    /**
     *
     * @param editor
     */
    constructor(editor) {
        super(editor);
        this.set('container', null);
        this.view = null;
        this._offCanvas = null;
        this.elementSelectClass = editor.config.get('elementSelectClass');
        this.generalDataAttribute = editor.config.get('generalDataAttribute');
        this.privateAttribute = editor.config.get('privateAttribute');

    }

    _createSidebarView() {
        return new AttributesSideBarView(this.editor.locale, this.editor, {
            elementSelectClass : this.elementSelectClass,
            generalDataAttribute : this.generalDataAttribute,
            privateAttribute : this.privateAttribute,
        });
    }

    init() {
        const _this = this;

        _this.container = _appendSideBar(`ct-side-bar-attributes`);

        const editClassCmd = _getCommand(_this.editor, EditClassCommand.commandName);
        const editIdCmd = _getCommand(_this.editor, EditIdCommand.commandName);
        const selectClassCmd = _getCommand(_this.editor, SelectClassCommand.commandName);
        const editDataAttributeCommand = _getCommand(_this.editor, EditDataAttributeCommand.commandName);

        /**
         *
         * @type {Commands[]}
         */
        this.sideBarCommands = [editIdCmd, editClassCmd, selectClassCmd, editDataAttributeCommand];
    }
    afterInit(){

        const _this = this;
        new Promise(resolve => {
            this.on('loaded', resolve);
            _this.view = _this._createSidebarView();

        });

    }
    show(modelName){
        const _this = this;


        if(_this.view.isRendered === false){
            _this.view.render();
            _this.container.appendChild(_this.view.element);
            _this._offCanvas = new Offcanvas(_this.view.element, {keyboard : true, toggle : false, backdrop : true, scroll : true});
            _this.view.element.addEventListener('hidden.bs.offcanvas', () => {
                _this.view.hide();
                _this.sideBarCommands.forEach(command =>{
                    command.set('modelName', null);
                });
                _this._clearDisableWidgetToolBar();
            });
            _this.view.element.addEventListener('shown.bs.offcanvas',  () =>{
                _this.view.show();
                // _this._clearDisableWidgetToolBar();
            });
            _this.view.bind('extraTitle').to(_this.sideBarCommands[0], 'elementName', elementName => ` : ${elementName}`);

            _this.listenTo(_this.view, 'cancel', () =>{
                // console.log("ClassAttributesSideBar.listenTo(ClassAttributesSideBar:cancel)", {arguments});
                _this.hide();
            });

            _this.listenTo(_this.view, 'save', () =>{
                _this.hide();
            });
        }
        // console.log({
        //     sideBarCommands : this.sideBarCommands
        // })
        _this.sideBarCommands.forEach(command =>{
            command.set('modelName', modelName);
        });
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
        SideBar._forceDisableWidgetToolBar(this.editor, AttributesSideBar.pluginName);
    }
    _clearDisableWidgetToolBar(){
        SideBar._clearDisableWidgetToolBar(this.editor, AttributesSideBar.pluginName);
        this.editor.focus();
    }
}
