import {View} from 'ckeditor5/src/ui';
import {viewCreator} from "../../../../ui/utils";
import {_arrayContainsArray, _isArray} from "../../../../general";
import uid from "@ckeditor/ckeditor5-utils/src/uid";
import {scrollViewportToShowTarget} from "@ckeditor/ckeditor5-utils/src/dom/scroll";
import {DATA_BLOCK_NAME} from "../../../../const";
import StyleSrc from "../../../style-source/style-src";
import Modal from 'bootstrap/js/src/modal';
const HIDDEN_NODES = [StyleSrc.modelName];
export default class TreeNodeView extends View {
    constructor(locale, {nodeElement, editor, config = {}}) {
        super(locale);
        const bind = this.bindTemplate;
        this.config = config;
        this.editor = editor;
        this.set('isVisible', false);
        this.set('nodeName', nodeElement.name);
        this.set('isExpand', false);
        this.set('isSelected', false);
        this.set('nodeElement', nodeElement);
        this.set('nodePath', nodeElement.getPath());
        this.set('childCount', 0);
        this.nodePath = nodeElement.getPath();
        this._isToggleable = editor.model.schema.checkAttribute(nodeElement, 'show');
        this.isRemovable = !editor.model.schema.checkAttribute(nodeElement, 'unRemovable');
        // if (!this.isRemovable) {
        //     console.log(`${nodeElement.name}:isRemovable:${this.isRemovable}`, {config});
        // }
        const expandBtn = {
            tag: 'button', on: {click: bind.to('toggleExpand')},
            attributes: {
                class: ['btn', 'btn-c-transparent', 'p-0', 'list-group-btn', 'toggle']
            },
            children: [{
                tag: 'i',
                attributes: {
                    class: ["fa fa-chevron-right"],
                    style: {display: bind.to('childCount', (childCount) => childCount > 0 ? "" : 'none')}
                }
            }]
        };
        const dragBtn = {
            tag: 'button', /*on: { click: bind.to('drag') },*/
            attributes: {
                class: ['btn', 'btn-c-transparent', 'p-0', 'list-group-btn', 'drag'],
                style: {display: "none"}
            },
            children: [{
                tag: 'i', attributes: {class: ["fa fa-arrows-alt"]}
            }]
        };
        const elementDesc = {
            tag: 'span', on: {dblclick: bind.to('dblclick')},
            attributes: {
                class: ['d-inline-block'],
                "data-ct-block-name" : nodeElement.getAttribute(DATA_BLOCK_NAME) || ''
            },
            children: [nodeElement.name]
        };
        const deleteBtn = {
            tag: 'button', on: {click: bind.to('deleteElement')},
            attributes: {
                class: ['float-end', 'btn', 'btn-c-transparent', 'p-0', 'list-group-btn', "remove"],
                disabled: bind.to('isRemovable', isRemovable => !isRemovable)
            },
            children: [{
                tag: 'i',
                attributes: {
                    class: ["fa fa-trash"],
                    style: {visibility: bind.to('isRemovable', isRemovable => isRemovable ? 'visible' : 'hidden')}
                }
            }]

        };
        const selectElement = {
            tag: 'button', on: {click: bind.to('selectElement')},
            attributes: {
                class: ['float-end', 'btn', 'btn-c-transparent', 'p-0', 'list-group-btn', 'scroll']
            },
            children: [{
                tag: 'i', attributes: {class: [bind.to('_isToggleable', (isToggleable) =>isToggleable ?  'fas fa-low-vision' : 'fas fa-eye') ]}
            }]
        };
        this.listContent = viewCreator(locale, {

            tag: 'div',
            attributes: {
                class: [
                    bind.to('class'), 'list-group-item',
                    bind.to('isExpand', isExpand => isExpand ? "expanded" : "collapsed"),
                    bind.to('isSelected', isSelected => isSelected ? 'selected' : '')
                ],
                index: bind.to('nodePath', (nodePath) => nodePath.length),
                'data-child-count': bind.to('childCount'),
                style: {
                    paddingLeft: bind.to('nodePath', (nodePath) => {
                        return nodePath && nodePath.length > 1 ? ((nodePath.length - 1) * 20) + 4 + 'px' : '';
                    })
                }
            },

            children: [
                expandBtn,
                dragBtn,
                elementDesc,
                deleteBtn,
                selectElement
            ]
        });
        this.children = this.createCollection();
        this.children.add(this.listContent);
        this.subList = new SubListView(locale, {nodeElement, editor, config});
        this.subList.bind('isVisible').to(this, 'isVisible');
        this.subList.bind('isExpand').to(this, 'isExpand');
        this.children.add(this.subList);
        this.subList.delegate('show').to(this);
        this.subList.delegate('hide').to(this);
        this.subList.delegate('elementSelected').to(this);
        this.isDisplay = !HIDDEN_NODES.includes(nodeElement.name);
        this.setTemplate({
            tag: 'li',
            attributes: {
                style : {
                    display : bind.to('isDisplay', (isDisplay)=> isDisplay ? '' : "none")
                }
            },
            children: this.children
        });
        const _this = this;
        this.on('toggleExpand', () => {
            _this._toggleExpand();
        });
        this.on('deleteElement', () => {
            if (_this.nodeElement && _this.isRemovable) {
                _this.editor.model.enqueueChange('default', writer => {
                    const rangeOn = writer.createRangeOn(_this.nodeElement);
                    const filler = _fillParentWithBreakOrNbsp(_this.editor, _this.nodeElement);
                    if(filler){
                        let newPosition = writer.createPositionAfter(_this.nodeElement);
                        const textBlock = writer.createElement( 'text-container', { "data-block-type": 'text-container' } );
                        // console.log(`deleteElement:${_this.nodeName}`, {textBlock, nodeElement : _this.nodeElement, rangeOn, parentNode : _this.nodeElement.parent, filler, newPosition});
                        if(newPosition){
                            _this.editor.model.insertContent(textBlock, newPosition);
                        }
                    }
                    _this.editor.model.deleteContent(_this.editor.model.createSelection(rangeOn), {doNotAutoparagraph: true});
                    // console.log(`deleteElement:${_this.nodeName}`, {nodeElement : _this.nodeElement, rangeOn, parentNode : _this.nodeElement.parent, filler});
                });
                _this.fire('removeChild', {nodeId: _this.nodeId});
                _this.destroy();
            }
        });
        this.listenTo(this.subList, 'removeChild', (evt, {nodeId}) => {
            const nodeChild = _this.subList.listItems.get(nodeId);
            // console.log(`${evt.name}:${_this.nodeName}`, {evt, nodeId, nodeChild});
            if (nodeChild) {
                _this.subList.listItems.remove(nodeChild)
                this.childCount = this.subList.listItems.length;
                // console.log(`${evt.name}:${_this.nodeName}`, {evt, subList : this.subList, childCount: this.childCount});
            }
        });
        this.on('selectElement', () => {
            if (_this.nodeElement) {
                _this.fire('elementSelected', {nodeElement : _this.nodeElement, nodePath : _this.nodePath});

            }
        });
        this.on('dblclick', () => {
            if (_this.nodeElement) {
                _this._scrollToSelection();
            }
        });

        this.on('change:isVisible', (evt, propertyName, newValue/*, oldValue*/) => {
            this.childCount = this.subList.listItems.length;
            if (!newValue) {
                this.isSelected = false;
            }
            // console.log(`      TreeNodeView:${_this.nodeName}:${propertyName}:${newValue}`, {
            //     oldValue, childCount: this.childCount, isSelected : this.isSelected
            // });
        })
        // this.on('change:isSelected', (evt, propertyName, newValue, oldValue)=>{
        //     console.log(`      TreeNodeView:${_this.nodeName}:${propertyName}:${newValue}`, {oldValue});
        // })
    }

    _scrollToSelection() {
        const editor = this.editor;
        // editor.editing.view.scrollToTheSelection();
        const domConverter = editor.editing.view.domConverter;
        const viewRange = editor.editing.mapper.toViewRange( editor.model.createRangeOn(this.nodeElement) );
        scrollViewportToShowTarget( {
            target: domConverter.viewRangeToDom( viewRange ),
            viewportOffset: 100
        } );
    }

    render() {
        super.render();
    }

    destroy() {
        super.destroy();
    }
    _getElementFromPath(nodePath, originalPath){
        const _this = this;
        if (_isArray(nodePath) && nodePath.length > 0) {
            const firstPath = nodePath.shift();
            let nodeView;
            if (_this.subList.listItems.length > firstPath) {
                nodeView = _this.subList.listItems.get(firstPath);

            } else {
                nodeView = _this.subList.listItems.find(listItem => {
                    return _arrayContainsArray(originalPath, listItem.nodePath);
                });
            }
            if(nodeView){
                return nodeView ;
            }
        }
        return null;


    }
    _getNodeElementFromPathRecursively(nodePath, originalPath){
        const nodeView = this._getElementFromPath(nodePath, originalPath);

        // console.log('_getNodeElementFromPathRecursively', {nodePath : nodePath.slice(), nodeView, originalPath});
        if(nodeView){
            const nodeChild =  nodeView._getNodeElementFromPathRecursively(nodePath, originalPath);
            if(nodeChild){
                return nodeChild;
            }else {
                return nodeView;
            }
        }
        return null;

    }
    _expandSelected(nodePath, originalPath){
        // console.log(`TreeNodeView:_expandSelected:${this.nodeName}`, {nodePath : nodePath.slice(), isSelected : this.isSelected})
        this.isExpand = true;
        if(this.isSelected){
            let isStopped = false;
            const childTreeNodeView = this._getElementFromPath(nodePath, originalPath);
            if (childTreeNodeView) {
                if(!childTreeNodeView.isSelected){
                    childTreeNodeView.isSelected = true;
                }
                childTreeNodeView._expandSelected(nodePath, originalPath);
            } else {
                isStopped = true;
            }
            if (isStopped) {
                const listContentDom = this.listContent.element;
                const isInViewport = _isInViewport(listContentDom);
                if (!isInViewport) {
                    setTimeout(()=>{

                        listContentDom.scrollIntoView({
                            behavior: 'auto',
                            block: 'center',
                            inline: 'center'
                        })
                    }, 350)
                }
                // console.log({listContentDom, isInViewport});
            }

        }

    }

    _toggleExpand(){
        if (!this.isExpand) {
            this._expand();
        } else {
            this._collapse();
        }
    }
    _expand(){
        this.subList.show();
        this.isExpand = true;
    }
    _collapse(){
        this.subList.hide();
        this.isExpand = false;
    }
    _setSelected(nodePath, originalPath){
        this.isSelected = true;
        if(_isArray(nodePath) && _isArray(originalPath)){
            const childTreeNodeView = this._getElementFromPath(nodePath, originalPath);
            if(childTreeNodeView){
                childTreeNodeView._setSelected(nodePath, originalPath);
            }
        }
    }
    _clearSelected(){
        this._clearSelectionRecursively();
        this.isSelected = false;
    }
    _clearSelectionRecursively(){
        if(this.isSelected){
            // console.log(`TreeNodeView:_clearSelectionRecursively:${this.nodeName}`, {nodeElement : this.nodeElement});
            const selectedChildNode = this.subList.listItems.find( childNode =>{
                return childNode.isSelected;
            } );
            if(selectedChildNode){
                selectedChildNode._clearSelected();
            }
        }
    }

    _reDrawTreeElement(modelElement) {
        if(modelElement){
            this.nodeElement = modelElement
            if (this.subList) {
                this.subList._draw(modelElement);
                this.childCount = this.subList.listItems.length;
            }
        }
    }
}


class SubListView extends View {
    constructor(locale, {nodeElement, editor, config = {}}) {
        super(locale);
        const bind = this.bindTemplate;
        this.nodeElement = nodeElement;
        this.config = config;
        this.listItems = this.createCollection({idProperty: 'nodeId'});
        this.set('isVisible', false);
        this.set('isExpand', false);
        this.editor = editor;
        this.setTemplate({
            tag: 'ul',
            attributes: {
                class: ['list-group', bind.to('isExpand', isExpand => isExpand ? 'active' : 'nested'), 'list-unstyled']
            },
            children: this.listItems
        });


    }

    _draw(nodeElement) {
        const _this = this;
        _this.listItems.clear()
        if (nodeElement) {
            for (const child of nodeElement.getChildren()) {
                if (child && !child.is('text')) {
                    const childNodeView = new TreeNodeView(_this.locale, {
                        nodeElement: child,
                        editor: _this.editor,
                        config: _this.config
                    });
                    childNodeView.nodeId = uid();
                    childNodeView.delegate('removeChild').to(_this);
                    childNodeView.delegate('elementSelected').to(_this);
                    childNodeView.bind('isVisible').to(_this, 'isVisible', _this, 'isExpand', (isVisible, isExpand) => isVisible && isExpand);
                    _this.listItems.add(childNodeView);
                }
            }
        }
    }

    render() {
        super.render();
        const _this = this;
        _this._draw(_this.nodeElement);
    }

    show() {
        this.isVisible = true;
        this.isExpand = false;

    }

    hide() {
        this.isVisible = false;
        this.isExpand = true;
    }

}


function _isInViewport(dom) {
    const rect = dom.getBoundingClientRect();
    return (
        rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}

function _fillParentWithBreakOrNbsp(editor, nodeElement) {
    if (nodeElement) {
        const nodeParent = nodeElement.parent;
        // console.log('_fillParentWithBreakOrNbsp', {nodeElement, nodeParent});
        if (nodeParent && nodeParent.name !== '$root' && nodeParent.childCount === 1) {
            const parentNodeView = editor.editing.mapper.toViewElement(nodeParent);
            // console.log('_fillParentWithBreakOrNbsp', {nodeElement, nodeParent, parentNodeView});
            return parentNodeView && parentNodeView.is('editableElement')
        }

    }
    return false;
}
