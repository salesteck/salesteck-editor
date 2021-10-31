import AccordionItemView from "../../../../ui/bs-view/accordion/accordion-item-view";
import {viewCreator} from "../../../../ui/utils";
import TreeNodeView from "./tree-node-view";
import {_isArray, _isNumber} from "../../../../general";
import uid from "@ckeditor/ckeditor5-utils/src/uid";

export default class RootView extends AccordionItemView {
    constructor(locale, {rootName, editor, config = {}}) {
        super(locale);
        this.rootName = rootName;
        this.editor = editor;
        this.config =config;
        this.set('class');
        this.set('title', rootName);
        this.set('elementClass');
        this.set('_undoStepBatch', null);
        this.set('isVisible', false);
        this.set('_isDrown', false);
        this.set('isSelected', false);
        this.nodeElementViews = this.createCollection({ idProperty: 'nodeId' });
        const rootListView = viewCreator(locale, {
            tag: 'ul',
            attributes: {
                class: ['col-12', 'p-0', 'tt-capitalize', 'list-group', 'list-group-root', 'list-unstyled'],
                style: {
                    borderTop: "0"
                }
            },
            children: this.nodeElementViews
        });
        this.accordionBody.children.add(rootListView);


        this.on('removeChild', (evt, {nodeId})=>{
            const nodeChild = this.nodeElementViews.get(nodeId);
            // console.log(`RootView:${evt.name}`, {evt, nodeId, nodeChild});
            if(nodeChild){
                this.nodeElementViews.remove(nodeChild)
                // console.log(`${evt.name}`, {evt});
            }
        });
        // this.on('change:isVisible',  (evt, propertyName, newValue, oldValue)=>{
        //     console.log(`    RootView:${this.rootName}:${propertyName}:${newValue}`, {oldValue});
        // })
        // this.on('change:isCollapsed',  (evt, propertyName, newValue, oldValue)=>{
        //     console.log(`    RootView::${this.rootName}:${propertyName}:${newValue}`, {oldValue});
        // })
    }


    destroy() {
        super.destroy();
    }

    render() {
        super.render();
    }
    _reDraw(path, modelElement){
        // console.log(`_reDraw`, { path : path.slice(), modelElement });
        if(modelElement.name === "$root"){
            this._reDrawRootNode(path, modelElement)
        }else {
            if(_isArray(path)){
                path.pop();
                const originalPath = path.slice();

                const treeNodeView = this._getNodeElementFromPathRecursively(path, originalPath);
                if(treeNodeView){
                    treeNodeView._reDrawTreeElement(modelElement);
                }
                // console.log({path : path.slice(), treeNodeView})
            }
        }

    }
    _expandSelected(nodePath){
        // console.log(`RootView:_expandSelected`, {nodePath : nodePath.slice(), isSelected : this.isSelected});

        if(_isArray(nodePath)){
            const originalPath = nodePath.slice();

            let treeNodeView;

            if (_isArray(nodePath) && nodePath.length > 0) {
                const firstPath = nodePath.shift();
                if(_isNumber(firstPath) && this.nodeElementViews.length > firstPath){
                    treeNodeView = this.nodeElementViews.get(firstPath);

                }
                // console.log(`RootView:_expandSelected`, {nodePath, firstPath, collectionLength : this.nodeElementViews.length});
            }
            if(treeNodeView){
                if(!treeNodeView.isSelected){
                    treeNodeView.isSelected = true;
                }
                treeNodeView._expandSelected(nodePath, originalPath);
            }
            // console.log(`RootView:_expandSelected`, {nodePath, treeNodeView})
        }

    }

    _setSelectionRecursively(path){
        // console.log(`    RootView:${this.rootName}:_setSelectionRecursively`, {path});
        if(_isArray(path)){
            const originalPath = path.slice();

            let treeNodeView;

            if (_isArray(path) && path.length > 0) {
                const firstPath = path.shift();
                if(_isNumber(firstPath) && this.nodeElementViews.length > firstPath){
                    treeNodeView = this.nodeElementViews.get(firstPath);

                }
                // console.log({path, firstPath, collectionLength : this.nodeElementViews.length});
            }
            if(treeNodeView){
                treeNodeView._setSelected(path, originalPath);
            }
            // console.log('_setSelectionRecursively', {path, treeNodeView})
            this.isSelected = true;
        }
    }
    _clearSelectionRecursively(){
        // console.log(`    RootView:${this.rootName}:_clearSelectionRecursively`);
        const selectedTreeNodeView = this.nodeElementViews.find( treeNodeView =>{
            return treeNodeView.isSelected;
        } );
        if(selectedTreeNodeView){
            selectedTreeNodeView._clearSelected();
        }
        this.isSelected = false;
    }


    _reDrawRootNode(){
        this.nodeElementViews.clear();
        const _this = this;
        const editor = this.editor;
        const rootName = this.rootName;
        const rootView = editor.model.document.getRoot(rootName);
        for (const nodeElement of rootView.getChildren()) {
            if(nodeElement && !nodeElement.is('text')){
                const treeNodeView = new TreeNodeView(_this.locale, {nodeElement, editor, config : _this.config});
                treeNodeView.nodeId = uid();
                _this._addNodeElementView(treeNodeView);
                treeNodeView.delegate('removeChild').to(_this);
                treeNodeView.delegate('elementSelected').to(_this);
                treeNodeView.bind('isVisible').to(_this, 'isCollapsed', _this, 'isVisible', (isCollapsed, isVisible) => !isCollapsed && isVisible);
            }
        }
        _this._isDrown = true;

    }

    _addNodeElementView(treeNodeView) {
        if (treeNodeView) {
            this.nodeElementViews.add(treeNodeView);
        }
    }

    _draw() {
        const _this = this;
        if (!_this._isDrown) {
            // const accordionBody = this.accordionBody;
            const editor = this.editor;
            const rootName = this.rootName;
            const rootView = editor.model.document.getRoot(rootName);
            // console.log('_draw', {accordionBody, editor, rootName, rootView, children: rootView.getChildren()});
            for (const nodeElement of rootView.getChildren()) {
                if(nodeElement && !nodeElement.is('text')){
                    const treeNodeView = new TreeNodeView(_this.locale, {nodeElement, editor, config: _this.config});
                    treeNodeView.nodeId = uid();
                    _this._addNodeElementView(treeNodeView);
                    treeNodeView.delegate('removeChild').to(_this);
                    treeNodeView.delegate('elementSelected').to(_this);
                    treeNodeView.bind('isVisible').to(_this, 'isCollapsed', _this, 'isVisible', (isCollapsed, isVisible) => !isCollapsed && isVisible);
                }
                // console.log(`${nodeElement.name}`, {
                //     nodeElement,
                //     isNode: nodeElement.is('node'),
                //     isText: nodeElement.is('text'),
                //     isElement: nodeElement.is('element'),
                //     isModel: nodeElement.is('model:element'),
                // })
            }
            _this._isDrown = true;
        }

    }


    _getNodeElementFromPathRecursively(nodePath, originalPath) {
        // console.log(`_getNodeElementFromPathRecursively`, {nodePath : nodePath.slice(), originalPath});
        if (_isArray(nodePath) && nodePath.length > 0) {
            const firstPath = nodePath.shift();
            if(_isNumber(firstPath) && this.nodeElementViews.length > firstPath){
                const treeNodeView = this.nodeElementViews.get(firstPath);
                if(treeNodeView){
                    if(nodePath.length){
                        // console.log({nodePath : nodePath.slice(), firstPath, collectionLength : this.nodeElementViews.length, treeNodeView, originalPath});
                        return treeNodeView._getNodeElementFromPathRecursively(nodePath, originalPath);
                    }else {
                        return treeNodeView;
                    }
                }

            }
            // console.log(`_getNodeElementFromPathRecursively`, {nodePath : nodePath.slice(), firstPath, collectionLength : this.nodeElementViews.length});
        }
        return null;
    }
}
