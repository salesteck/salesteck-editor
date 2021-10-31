import { Plugin } from 'ckeditor5/src/core';

import StyleSideBarView from "./ui/style-side-bar-view";

import Offcanvas from 'bootstrap/js/src/offcanvas';

import StyleCommand from "./command/style-command";

import {_getCommand} from "../../../engine/utils/commands";
import SideBar, {_appendSideBar} from "../side-bar";

export default class StyleSideBar extends Plugin {

    static get pluginName() {
        return 'SalesteckStyleSideBar';
    }

    constructor(editor) {
        super(editor);
        this.set('container', null);
        this._offCanvas = null;
        this._undoStepBatch = null;
    }

    _createSidebarView() {
        const styleSideBarView = new StyleSideBarView(this.editor.locale, this.editor, {defaultColors : this.defaultColors});
        styleSideBarView.render();
        return styleSideBarView;
    }

    init() {
        const _this = this;
        this.defaultColors = _this.editor.config.get('defaultColors');
        // this.styleCommand = _getCommand(editor, StyleCommand.commandName);
        this.view = this._createSidebarView();
        this.styleCommand = _getCommand(this.editor, StyleCommand.commandName);

        _this.container = _appendSideBar(`ct-side-bar-style`);

        _this.container.appendChild(_this.view.element);

        _this._offCanvas = new Offcanvas(_this.view.element, {keyboard : true, toggle : false, backdrop : true, scroll : false});

        _this.view.element.addEventListener('hidden.bs.offcanvas', () => {
            _this.view.hide();
            _this._clearDisableWidgetToolBar();
            _this.styleCommand.set('modelName', null);
        });
        _this.view.element.addEventListener('shown.bs.offcanvas',  () =>{
            _this.view.show();
            // _this._clearDisableWidgetToolBar();
        })
        // console.log("StyleSideBar", {styleCommand : _this.styleCommand});

        _this.view.bind('extraTitle').to(_this.styleCommand, 'modelName', modelName => ` : ${modelName}`);


        _this.listenTo(_this.view, 'cancel', () =>{
            _this.hide();
        });

        _this.listenTo(_this.view, 'save', () =>{
            _this._undoStepBatch = null;
            _this.hide();
        });
    }
    show(modelName){
        const _this = this;
        _this.styleCommand.set('modelName', modelName);
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
        SideBar._forceDisableWidgetToolBar(this.editor, StyleSideBar.pluginName);
    }
    _clearDisableWidgetToolBar(){
        SideBar._clearDisableWidgetToolBar(this.editor, StyleSideBar.pluginName);
        this.editor.focus();
    }
}
