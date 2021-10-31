
import AccordionView from "../../../../ui/bs-view/accordion/accordion-view";
import RootView from "./root-view";
import {_isArray, _isStrNotEmpty} from "../../../../general";

export default class RootContainerView extends AccordionView{

    constructor(locale, editor, config = {}) {
        super(locale);
        const bind = this.bindTemplate;
        this.editor = editor;
        this.config =config;
        this.set('class');
        this.set('title');
        this.set( 'elementClass' );
        this.children = this.createCollection({ idProperty: 'rootName' });

        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [ 'accordion', bind.to('class'), bind.to('elementClass')],
                id : bind.to('id')
            },
            children: this.children
        });
        // this.on('change:isVisible', (evt, propertyName, newValue, oldValue)=> {
        //     console.log(`  RootContainerView:${propertyName}:${newValue}`, {evt, propertyName, newValue, oldValue});
        // });
        this.on('change:show', (evt, propertyName, newValue/*, oldValue*/)=>{
            // console.log(`  RootContainerView::${propertyName}:${newValue}`, {evt, propertyName, newValue, oldValue});
            for(const rootView of this.children){
                if(rootView && !rootView._isDrown){
                    rootView._draw();
                }
            }
            if(newValue){
                const selection = editor.model.document.selection;
                let selectedElement = selection.getSelectedElement();
                if(!selectedElement) {
                    const firstRange = selection.getFirstRange();
                    selectedElement = firstRange.start.parent;
                }
                if(selectedElement){
                    this._expandSelected(selectedElement);
                }
                // console.log(`RootContainerView:${evt.name}`, {evt, selectedElement});
            }
        });
    }
    render() {
        super.render();
        const _this = this;
        const editor = _this.editor;
        const rootNames = editor.model.document.getRootNames();
        // console.log({rootNames});
        rootNames.forEach(rootName => {
            const rootView = new RootView(_this.locale, {editor, rootName, config : this.config});
            rootView.rootName = rootName;
            // rootView.bind('isVisible').to(_this, 'isVisible');
            rootView.bind('isVisible').to(_this, 'show');
            rootView.delegate('elementSelected').to(_this);
            rootView.delegate('removeChild').to(_this);
            _this.children.add(rootView);
        })
        this.listenTo(editor.model.document, 'change', (evt, batch)=>{
            // console.log(`  RootContainerView:change`, {evt, batch});
            if(batch && _isArray(batch.operations)){
                if(batch.operations.length === 0){
                    /**
                     * this is when the modelChangeSelection
                     */

                    const selection = editor.model.document.selection;
                    let selectedElement = selection.getSelectedElement();
                    if(!selectedElement) {
                        const firstRange = selection.getFirstRange();
                        selectedElement = firstRange.start.parent;
                    }
                    if(selectedElement){
                        _this._clearSelectionRecursively();
                        _this._setSelectionRecursively(selectedElement);

                    }
                    // console.log(`  RootContainerView:change`, {evt, batch, operationsLength : 0, selectedElement});

                }
            }
        });

        this.listenTo(editor.model.document, 'change:data', (evt, batch) => {
            if (!_this.firstLoading || !batch || !batch.operations || !batch.operations.length) {
                _this.firstLoading = true;
                return;
            }
            const differ = evt.source.differ;
            let changes = differ.getChanges();
            changes.forEach( change =>{
                if(change.type === 'insert' || change.type === 'remove'){
                    if(change && change.position){
                        this._redrawNodeFromPath({
                            rootName : change.position.root.rootName,
                            path : change.position.path,
                            modelElement : change.position.parent
                        });
                    }
                }
            });

        }, { priority: 'highest' });

    }


    _redrawNodeFromPath({rootName, path, modelElement}){
        let clonedPath;
        if(_isArray(path)){
            const rootView = this._getRootView(rootName);
            clonedPath = path.slice();
            // console.log(`_redrawNodeFromPath`, {rootName, path, rootView, clonedPath : clonedPath});
            if(rootView){
                rootView._reDraw(clonedPath, modelElement);
            }
        }
        // console.log(`_redrawNodeFromPath`, {rootName, path});

    }
    _expandSelected(modelElement){
        // console.log(`RootContainerView:_expandSelected:${modelElement.name}`, {modelElement});
        if(modelElement) {
            const rootName = modelElement.root.rootName;
            if(_isStrNotEmpty(rootName)){
                const rootView = this._getRootView(rootName);
                if(rootView){
                    const nodePath = modelElement.getPath().slice();
                    rootView._showAccordion();
                    rootView._expandSelected(nodePath);
                    // console.log(`RootContainerView:_expandSelected:${modelElement.name}`, {modelElement, nodePath, rootName});
                }
            }
        }

    }


    _clearSelectionRecursively(){
        const selectedRootView = this.children.find( rootView =>{
            return rootView.isSelected;
        });
        if(selectedRootView){
            // console.log(`RootContainerView:_clearSelectionRecursively:${selectedRootView.rootName}`, { selectedRootView});
            selectedRootView._clearSelectionRecursively();
        }
    }
    _setSelectionRecursively(modelElement){
        if(modelElement){
            const rootName = modelElement.root.rootName;
            if(_isStrNotEmpty(rootName)){
                const rootView = this._getRootView(rootName);
                if(rootView){
                    const path = modelElement.getPath().slice();
                    rootView._setSelectionRecursively(path);
                    // console.log(`_setSelectionRecursively`, {modelElement, path, rootName});
                }
            }
        }
    }

    _getRootView(rootName){
        if(_isStrNotEmpty(rootName)){
            return this.children.get(rootName);
        }
        return  null;
    }
}
