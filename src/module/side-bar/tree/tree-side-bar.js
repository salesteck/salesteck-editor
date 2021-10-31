import {Plugin} from 'ckeditor5/src/core';
import Offcanvas from "bootstrap/js/src/offcanvas";
import TreeSideBarView from "./ui/tree-side-bar-view";
import {scrollViewportToShowTarget} from "@ckeditor/ckeditor5-utils/src/dom/scroll";
import SideBar, {_appendSideBar} from "../side-bar";

export default class TreeSideBar extends Plugin {
    static get pluginName() {
        return 'TreeSideBar';
    }

    constructor(editor) {
        super(editor);
        this.set('container', null);
        this.view = null;
        this._offCanvas = null;
    }

    _createSidebarView() {

        const config = this.editor.config.get('sideBar.tree') || {};
        // console.log({config, test : Boolean({})});

        return new TreeSideBarView(this.editor.locale, this.editor, config);
    }

    init() {
        this.container = _appendSideBar('ct-side-bar-tree');

    }


    afterInit() {

        const _this = this;
        _this.view = _this._createSidebarView();
        _this.view.render();
        _this.view.delegate('elementSelected').to(_this);
        _this.container.appendChild(_this.view.element);
        _this._offCanvas = new Offcanvas(_this.view.element, {
            keyboard: true,
            toggle: false,
            backdrop: true,
            scroll: true
        });
        _this.view.element.addEventListener('hidden.bs.offcanvas', () => {
            _this.view.hide();
            _this._clearDisableWidgetToolBar();
        });
        _this.view.element.addEventListener('shown.bs.offcanvas', () => {
            _this.view.show();
            // _this._clearDisableWidgetToolBar();
        });

        _this.listenTo(_this.view, 'cancel', () => {
            // console.log("ClassAttributesSideBar.listenTo(ClassAttributesSideBar:cancel)", {arguments});
            _this.hide();
        });

        _this.listenTo(_this.view, 'save', () => {
            _this.hide();
        });

        this.on('elementSelected', (evt, data)=>{
            // console.log(`TreeSideBar:${evt.name}`, ({evt, data}));
            const nodeElement = data.nodeElement;
            if(nodeElement){

                const editor = _this.editor;
                editor.model.enqueueChange('transparent', writer => {
                    _this.hide();
                    if(editor.model.schema.checkAttribute(nodeElement, 'show')){
                        writer.setAttribute('show', !Boolean(nodeElement.getAttribute('show')), nodeElement);
                    }
                    const nodeView = editor.editing.mapper.toViewElement(nodeElement);
                    if(nodeView.is('editableElement')){
                        // console.log(`TreeSideBar:nodeView.is('editableElement'):true`, {nodeElement});
                        editor.focus();
                        writer.setSelection(nodeElement, 'on');

                    }else {
                        editor.focus();

                        const isSelectable = editor.model.schema.isSelectable( nodeElement.name ); // -> true
                        if(isSelectable){
                            writer.setSelection(nodeElement, 'on');
                        }else {

                            writer.setSelection(nodeElement, 'in');
                        }

                        // console.log(`TreeSideBar:nodeView.is('editableElement'):false`,{isSelectable, nodeElement});
                    }

                    const domConverter = editor.editing.view.domConverter;
                    const viewRange = editor.editing.mapper.toViewRange( editor.model.createRangeOn(nodeElement) );
                    scrollViewportToShowTarget( {
                        target: domConverter.viewRangeToDom( viewRange ),
                        viewportOffset: 100
                    } );
                });
            }
        });

        // this.on('removeChild', (evt, data) =>{
        //     console.log(`${evt.name}`, {data});
        // });

    }


    show() {
        this._forceDisableWidgetToolBar();
        this._offCanvas.show();
    }

    hide() {
        if(this._offCanvas && this.view && this.view.isVisible){
            this._forceDisableWidgetToolBar();
            this._offCanvas.hide();
        }
    }

    toggleVisibility() {
        if (this._offCanvas) {
            if (this.view.isVisible) {
                this.hide();
            } else {
                this.show();
            }
        }

    }


    destroy() {
        super.destroy();
        this.view.destroy();
    }

    _forceDisableWidgetToolBar(){
        SideBar._forceDisableWidgetToolBar(this.editor, TreeSideBar.pluginName);
    }
    _clearDisableWidgetToolBar(){
        SideBar._clearDisableWidgetToolBar(this.editor, TreeSideBar.pluginName);
        this.editor.focus();
    }

}
