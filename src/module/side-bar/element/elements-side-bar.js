import { Plugin } from 'ckeditor5/src/core';
import ElementsSideBarView from "./ui/elements-side-bar-view";
import Offcanvas from "bootstrap/js/src/offcanvas";
import SalesteckDragdrop from "../../drag-drop/src/salesteck-dragdrop";
import SideBar, {_appendSideBar} from "../side-bar";
import SalesteckClipboard from "../../drag-drop/src/salesteck-clipboard";

export default class ElementsSideBar extends Plugin {
    static get pluginName() {
        return 'SalesteckElementsSideBar';
    }
    static get requires(){
        return [SalesteckClipboard];
    }

    constructor(editor) {
        super(editor);
        this.set('container', null);
        this.widgetToolbar = null;
        this._offCanvas = null;
    }

    init() {
        const _this = this;
        const editor = this.editor;

        if (this.editor.plugins.has('WidgetToolbarRepository')) {
            this.widgetToolbar = this.editor.plugins.get('WidgetToolbarRepository');

        }
        _this.view = new ElementsSideBarView(editor.locale, editor);
        _this.view.render();
        _this.DragDrop = editor.plugins.get(SalesteckDragdrop);

        _this.container = _appendSideBar(`ct-side-bar-elements`);

        _this.container.appendChild(_this.view.element);

        _this._offCanvas = new Offcanvas(_this.view.element, {keyboard : true, toggle : false, backdrop : _this.view._backdrop, scroll : true});


        _this.view.element.addEventListener('hide.bs.offcanvas', () => {
            document.body.classList.remove("ct-elements-active");
        });

        _this.view.element.addEventListener('show.bs.offcanvas',  () =>{
            document.body.classList.add("ct-elements-active");
        });

        _this.view.element.addEventListener('hidden.bs.offcanvas', () => {
            _this.view.hide();
            _this._clearDisableWidgetToolBar();
            // console.log(`SalesteckElementsSideBar:hidden.bs.offcanvas`)
        });
        _this.view.element.addEventListener('shown.bs.offcanvas',  () =>{
            _this.view.show();
            _this._clearDisableWidgetToolBar();
        });
        _this.listenTo(_this.view, 'dragstart', (evt, data)=>{
            // data.preventDefault();
            const elementModelName = data.dataTransfer.getData('modelName');
            _this._forceDisableWidgetToolBar();
            // console.log(`${evt.name}`, {evt, data, elementModelName})
            data.dataTransfer.modelElementName = elementModelName;
            _this.DragDrop._draggableElement = elementModelName;
            // evt.stop();
        }, { priority : 'highest'});


        _this.listenTo(_this.view, 'dragend', ()=>{
            _this._clearDisableWidgetToolBar();
        })
    }

    afterInit(){
        const _this = this;
        new Promise(resolve => {
            this.on('loaded', resolve);
            _this.view._fillFromConfig(_this.editor.config.get( 'elementsToolbar' ));
        });
    }
    _forceDisableWidgetToolBar(){

        SideBar._forceDisableWidgetToolBar(this.editor, ElementsSideBar.pluginName);
    }
    _clearDisableWidgetToolBar(){

        SideBar._clearDisableWidgetToolBar(this.editor, ElementsSideBar.pluginName);
    }

    show(){
        this._forceDisableWidgetToolBar();
        this._offCanvas.show();
    }

    hide(){
        if(this._offCanvas && this.view && this.view.isVisible){
            this._forceDisableWidgetToolBar();
            this._offCanvas.hide();
        }
    }


    toggle(){
        if(this.view && this.view.isVisible){
            this.hide();
        }else {
            this.show();
        }
    }

    destroy() {
        this.view.destroy();
    }
}
