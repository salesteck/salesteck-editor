import normalizeToolbarConfig from "@ckeditor/ckeditor5-ui/src/toolbar/normalizetoolbarconfig";
import {logWarning} from "@ckeditor/ckeditor5-utils/src/ckeditorerror";
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import AccordionItemView from "../../../../ui/bs-view/accordion/accordion-item-view";
import {ButtonView, View} from "ckeditor5/src/ui";
import uid from "@ckeditor/ckeditor5-utils/src/uid";
import Popover from 'bootstrap/js/src/popover';
import {viewCreator} from "../../../../ui/utils";
import {_isArray, _isMagnificPopupValid, _isStrNotEmpty} from "../../../../general";
import $ from 'jquery';
import 'magnific-popup';
// import TagIconView from "../../../ui/view/tag-icon-view";

export default class GridContainerView extends AccordionItemView {

    constructor(locale, editor) {
        super(locale);
        this.editor = editor;
        this.set('collapseOnHide', false);
        // this.set('title', '');
        this.set('class', 'grid-elements-container');
        /**
         * A collection of toolbar items (buttons, dropdowns, etc.).
         *
         * @readonly
         * @member {@ckEditor5/ui/viewcollection~ViewCollection}
         */
        this.items = this.createCollection();

        /**
         * Tracks information about the DOM focus in the toolbar.
         *
         * @readonly
         * @member {@ckEditor5/utils/focustracker~FocusTracker}
         */
        this.focusTracker = new FocusTracker();

        /**
         * An instance of the {@link @ckEditor5/utils/keystrokehandler~KeystrokeHandler}
         * to handle keyboard navigation in the toolbar.
         *
         * @readonly
         * @member {@ckEditor5/utils/keystrokehandler~KeystrokeHandler}
         */
        this.keystrokes = new KeystrokeHandler();
    }

    render() {
        super.render();
        const _this = this;
        // Children added before rendering should be known to the #focusTracker.
        for (const item of _this.items) {
            _this.focusTracker.add(item.element);
        }

        _this.items.on('add', (evt, item) => {
            _this.focusTracker.add(item.element);
        });

        _this.items.on('remove', (evt, item) => {
            _this.focusTracker.remove(item.element);
        });
    }

    /**
     * A utility that expands the plain toolbar configuration into
     * {@link @ckEditor5/ui/toolbar/toolbarview~ToolbarView#items} using a given component factory.
     *
     * @param {Array.<String>|Object} itemsOrConfig The toolbar items or the entire toolbar configuration object.
     */
    _fillFromConfig(itemsOrConfig) {
        const _this = this;
        const locale = _this.locale;
        const config = normalizeToolbarConfig(itemsOrConfig);

        const itemsToClean = config.items
            .filter((name, idx, items) => {
                if (name === '|') {
                    return true;
                }

                // Items listed in `config.removeItems` should not be added to the toolbar.
                if (config.removeItems.indexOf(name) !== -1) {
                    return false;
                }

                if (name === '-') {
                    // The toolbar line breaks must not be rendered when toolbar grouping is enabled.
                    // (https://github.com/ckeditor/ckeditor5/issues/8582)
                    if (this.options.shouldGroupWhenFull) {
                        /**
                         * The toolbar multiline breaks (`-` items) only work when the automatic button grouping
                         * is disabled in the toolbar configuration.
                         * To do this, set the `shouldNotGroupWhenFull` option to `true` in the editor configuration:
                         *
                         *        const config = {
                         *			toolbar: {
                         *				items: [ ... ],
                         *				shouldNotGroupWhenFull: true
                         *			}
                         *		}
                         *
                         * Learn more about {@link @ckEditor5/core/editor/editorconfig~EditorConfig#toolbar toolbar configuration}.
                         *
                         * @error toolbarview-line-break-ignored-when-grouping-items
                         */
                        logWarning('toolbarview-line-break-ignored-when-grouping-items', items);

                        return false;
                    }

                    return true;
                }

                // For the items that cannot be instantiated we are sending warning message. We also filter them out.
                // if (!factory.has(name)) {
                //     /**
                //      * There was a problem processing the configuration of the toolbar. The item with the given
                //      * name does not exist so it was omitted when rendering the toolbar.
                //      *
                //      * This warning usually shows up when the {@link @ckEditor5/core/plugin~Plugin} which is supposed
                //      * to provide a toolbar item has not been loaded or there is a typo in the configuration.
                //      *
                //      * Make sure the plugin responsible for this toolbar item is loaded and the toolbar configuration
                //      * is correct, e.g. {@link @ckEditor5/basic-styles/bold~Bold} is loaded for the `'bold'` toolbar item.
                //      *
                //      * You can use the following snippet to retrieve all available toolbar items:
                //      *
                //      *        Array.from( editor.ui.componentFactory.names() );
                //      *
                //      * @error toolbarview-item-unavailable
                //      * @param {String} name The name of the component.
                //      */
                //     logWarning('toolbarview-item-unavailable', {name});
                //
                //     return false;
                // }

                return true;
            });

        const itemsToAdd = this._cleanSeparators(itemsToClean)
            // Instantiate toolbar items.
            .map(element => {
                if (element === '|' || element  === '-') {
                    return new ElementSeparator(locale);
                }
                const buttonGroup =  _createDragButton(element, this.editor, locale);
                buttonGroup.delegate('dragstart').to(_this);
                buttonGroup.delegate('dragend').to(_this);
                return buttonGroup;
            });

        this.items.addMany(itemsToAdd);
        this.accordionBody.children.bindTo(this.items).using(item => {
            // item.class = 'grid-item b-all rounded btn';
            // item.extendTemplate({
            //     on : {
            //         mousedown : item.bindTemplate('mousedown')
            //     }
            // });
            item.delegate('execute').to(this);
            return item;
        })
    }

    /**
     * Remove leading, trailing, and duplicated separators (`-` and `|`).
     *
     * @private
     * @param {Array.<String>} items
     */
    _cleanSeparators(items) {
        const nonSeparatorPredicate = item => (item !== '-' && item !== '|');
        const count = items.length;

        // Find an index of the first item that is not a separator.
        const firstCommandItem = items.findIndex(nonSeparatorPredicate);

        // Search from the end of the list, then convert found index back to the original direction.
        const lastCommandItem = count - items
            .slice()
            .reverse()
            .findIndex(nonSeparatorPredicate);

        return items
            // Return items without the leading and trailing separators.
            .slice(firstCommandItem, lastCommandItem)
            // Remove duplicated separators.
            .filter((name, idx, items) => {
                // Filter only separators.
                if (nonSeparatorPredicate(name)) {
                    return true;
                }
                const isDuplicated = idx > 0 && items[idx - 1] === name;

                return !isDuplicated;
            });
    }
}


class DraggableButtonView extends ButtonView{
    /**
     * @inheritDoc
     */
    constructor( locale, options ) {
        super(locale);
        this.modelName = options.modelName;
        this.icon = options.icon;
        // const domParsed = new DOMParser().parseFromString(options.icon, 'text/html');
        // this.customIcon = new TagIconView();
        // this.customIcon.content = options.icon;
        // console.log({domParsed, customIcon : this.customIcon});
        // this.children.add(this.customIcon)
        this.popover = null;
        this.set({
            withText: false,
            tooltip: false,
            viewDefinition: options.viewDefinition
        });

        const _this = this;
        const bind = this.bindTemplate;
        const ariaLabelUid = uid();
        this.options = options;
        this.setTemplate( {
            tag: 'button',
            attributes: {
                class: [
                    // 'ck',
                    // 'ck-button',
                    'btn', 'b-all', 'ct-element-btn',
                    bind.to( 'class' ),
                    bind.to( 'viewDefinition', viewDefinition => _isStrNotEmpty(viewDefinition) ? 'ct-element-btn-draggable' : 'ct-element-btn-not-draggable' ),
                    // bind.if( 'viewDefinition', 'ct-element-btn-draggable', viewDefinition =>  _isStrNotEmpty(viewDefinition)),
                    bind.if( 'isEnabled', 'ck-disabled', value => !value ),
                    bind.if( 'isVisible', 'ck-hidden', value => !value ),
                    bind.to( 'isOn', value => value ? 'ck-on' : 'ck-off' ),
                    bind.if( 'withText', 'ck-button_with-text' ),
                    bind.if( 'withKeystroke', 'ck-button_with-keystroke' )
                ],
                type: bind.to( 'type', value => value ? value : 'button' ),
                tabindex: bind.to( 'tabindex' ),
                'aria-labelledby': `ck-editor__aria-label_${ ariaLabelUid }`,
                'aria-disabled': bind.if( 'isEnabled', true, value => !value ),
                'aria-pressed': bind.to( 'isOn', value => this.isToggleable ? String( value ) : false ),
                draggable : bind.to('viewDefinition', viewDefinition => _isStrNotEmpty(viewDefinition)),
                'data-drag-model-name' : _this.modelName
            },
            children: this.children,
            on: {
                dragstart : bind.to( 'dragstart'),
                dragend : bind.to( 'dragend'),
            }
        } );

        if(_isStrNotEmpty(this.viewDefinition)){
            _this.on('dragstart', ( event, data) =>{
                if(_this.popover){
                    _this.popover.hide();
                }
                // console.log('dragstart', {event, data, options : this.options});

                data.dataTransfer.setData( 'modelName', _this.modelName );
                // data.dataTransfer.setData( 'modelElementName', _this.modelName );
                data.dataTransfer.setData( 'text/html', _this.viewDefinition );
                data.dataTransfer.setDragImage( _this.iconView.element, 0, 0);
                // console.log('dragstart', { icon :_this.icon, _this, popover : _this.popover});
            });
            // _this.on('dragend', ( event, data) =>{
            //     console.log(`${event.name}`, {event, data, options : this.options});
            // });
        }
    }

    render() {
        super.render();
        const _this = this;
        _this.popover = new Popover(this.element, {
            customClass : 'ct-drag-element-popover',
            trigger : 'hover',
            // trigger : 'click',
            title : _this.options.title,
            content : _this.options.description,
            html : true,
            placement : 'left',
            boundary : 'clippingParents',
            sanitize : false
        });
    }
}


function _createDragButton(element, editor, locale){
    const elementModelName = element.modelName;
    const buttonGroup = new ButtonGroup(locale);
    const buttonView = new DraggableButtonView( locale, element );
    buttonView.delegate('dragstart').to(buttonGroup);
    buttonView.delegate('dragend').to(buttonGroup);
    buttonGroup.addChild(buttonView);
    const componentUrl = editor.config.get('componentUrl');

    if(_isArray(element.template) && element.template.length> 0 && _isStrNotEmpty( componentUrl ) ){
        const dropdownButton = viewCreator(locale, {
            tag : 'button',
            attributes : {
                class : [
                    'btn',
                    'b-0-start ', 'b-all',
                    'dropdown-toggle',
                    'dropdown-toggle-split'
                ],
                'data-bs-toggle' : "popover"
            }
        });
        dropdownButton.popover = null;
        let listItems = ``;
        element.template.forEach( templateItem=>{
            if(_isStrNotEmpty(templateItem.url) && _isStrNotEmpty(templateItem.title)){
                // listItems += `<li class="list-group-item"><a href="javascript:void(0);" data-url="${componentRemoteUrl}${templateItem.url}" class="template-lightbox stretched-link tt-uppercase td-none">${templateItem.title}</a></li>`;
                listItems += `<li class="list-group-item"><a href="javascript:void(0);" data-url="${templateItem.url}" class="template-lightbox stretched-link tt-uppercase td-none">${templateItem.title}</a></li>`;
            }
        } );
        dropdownButton.delegate('dragstart').to(buttonGroup);
        dropdownButton.delegate('dragend').to(buttonGroup);
        dropdownButton.once('render', ()=>{
            dropdownButton.element.addEventListener('inserted.bs.popover', (/*evt*/)=>{
                if (_isMagnificPopupValid()) {
                    const $templateLightBoxes  = $('.template-lightbox', dropdownButton.popover.tip);
                    // console.log("BlockInsertAjaxCommand#execute", {_this, selector});
                    $templateLightBoxes.click( function(clickEvt){
                        clickEvt.preventDefault();
                        /**
                         * exemple '/component/test?q=http://thuysbaert.localhost/test'
                         * @type {*|jQuery}
                         */
                        let dataUrl = $(this).attr('data-url');
                        if( _isStrNotEmpty(dataUrl)){
                            $.magnificPopup.open({
                                iframe: {
                                    markup: '<div class="mfp-iframe-scaler ck-editor-iframe ">' +
                                        '<div class="mfp-close"></div>' +
                                        '<iframe class="mfp-iframe mfp-ck-editor" allowfullscreen></iframe>' +
                                        '</div>'
                                },
                                mainClass: 'ck-editor-lightbox',
                                items: {
                                    src: componentUrl+dataUrl
                                },
                                type: 'iframe',
                                alignTop: true,
                                closeBtnInside: true,
                                closeOnContentClick : false,
                                // overflowY: 'scroll',
                                callbacks: {
                                    open: function () {
                                        const magnificPopupInstance = this;
                                        const $content = $(this.content);
                                        const iframe = $('iframe', $content);
                                        iframe.on('load', function () {
                                            const $this = $(this);
                                            /*const body = $this.contents().find('body');
                                            $.post( dataUrl, function( data ) {
                                                body.prepend( data );
                                                let selections = body.find(element.selector);
                                                selections.each((index, elem)=>{
                                                    const $elem = $(elem);
                                                    $elem.mousedown(function (mousedownEvt){
                                                        mousedownEvt.stopPropagation();
                                                        const selectedElement = $(this);
                                                        selectedElement.attr('draggable', true);
                                                    })
                                                    $elem.on('dragstart', function (dragstartEvt){
                                                        $elem.removeAttr('draggable');
                                                        dragstartEvt.originalEvent.dataTransfer.setData( 'modelName', elementModelName );
                                                        dragstartEvt.originalEvent.dataTransfer.setData( 'text/html', $elem[0].outerHTML );
                                                        dragstartEvt.originalEvent.dataTransfer.setDragImage( buttonView.iconView.element, 0, 0);
                                                        // console.log('selections.dragstart', {
                                                        //     magnificPopupInstance, dragstartEvt, htmlElement: $elem[0].outerHTML,
                                                        //     iconView : buttonView.iconView.element, element, $elem
                                                        // });
                                                        buttonGroup.fire('dragstart', dragstartEvt.originalEvent);
                                                        /!**
                                                         * Known issue in browser to modify dom element without trigger dragend, must set timeout
                                                         *!/
                                                        setTimeout(()=>{

                                                            $('.ck-editor-lightbox').css({
                                                                opacity : 0,
                                                                visibility : 'hidden',
                                                                zIndex : -11
                                                            });
                                                        }, 10)

                                                    });
                                                    $elem.on('dragend', function (/!*dragendEvt*!/){
                                                        $('.ck-editor-lightbox').css({
                                                            opacity : '',
                                                            visibility : '',
                                                            zIndex : ''
                                                        });
                                                        magnificPopupInstance.close();

                                                        buttonGroup.fire('dragend');
                                                    })
                                                })
                                            });*/

                                            let selections = $(this).contents().find(element.selector);
                                            selections.each((index, elem)=>{
                                                const $elem = $(elem);
                                                $elem.mousedown(function (mousedownEvt){
                                                    mousedownEvt.stopPropagation();
                                                    const selectedElement = $(this);
                                                    selectedElement.attr('draggable', true);
                                                })
                                                $elem.on('dragstart', function (dragstartEvt){
                                                    $elem.removeAttr('draggable');
                                                    dragstartEvt.originalEvent.dataTransfer.setData( 'modelName', elementModelName );
                                                    dragstartEvt.originalEvent.dataTransfer.setData( 'text/html', $elem[0].outerHTML );
                                                    dragstartEvt.originalEvent.dataTransfer.setDragImage( buttonView.iconView.element, 0, 0);
                                                    // console.log('selections.dragstart', {
                                                    //     magnificPopupInstance, dragstartEvt, htmlElement: $elem[0].outerHTML,
                                                    //     iconView : buttonView.iconView.element, element, $elem
                                                    // });
                                                    buttonGroup.fire('dragstart', dragstartEvt.originalEvent);
                                                    /**
                                                     * Known issue in browser to modify dom element without trigger dragend, must set timeout
                                                     */
                                                    setTimeout(()=>{

                                                        $('.ck-editor-lightbox').css({
                                                            opacity : 0,
                                                            visibility : 'hidden',
                                                            zIndex : -11
                                                        });
                                                    }, 10)

                                                });
                                                $elem.on('dragend', function (dragendEvt){
                                                    $('.ck-editor-lightbox').css({
                                                        opacity : '',
                                                        visibility : '',
                                                        zIndex : ''
                                                    });
                                                    magnificPopupInstance.close();

                                                    buttonGroup.fire('dragend');
                                                })
                                            })
                                        });
                                    },
                                }
                            });
                        }


                    })
                    // console.log('inserted.bs.popover', {evt, popover : dropdownButton.popover, $templateLightBoxes});


                }
            })
            dropdownButton.popover = new Popover(dropdownButton.element, {
                customClass : 'ct-drag-element-popover',
                trigger : 'focus',
                // trigger : 'click',
                title : `${element.title}`,
                content : `<ul class="list-group">${listItems}</ul>`,
                html : true,
                placement : 'left',
                boundary : 'clippingParents',
                sanitize : false,
                offset : '[0, 60]'
            });

        });
        buttonGroup.addChild(dropdownButton);
    }
    return buttonGroup;
}


class ButtonGroup extends View{
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        this.set('class', '');
        this.children = this.createCollection();
        // const
        this.setTemplate({
            tag: 'div',
            attributes : {
                class: [
                    bind.to( 'class' ),
                    'btn-group', 'rounded', 'group-element', 'shadow-sm'
                ],
            },
            children : this.children
        });
    }

    addChild(view){
        this.children.add(view);
    }

}

class ElementSeparator extends View{
    constructor(locale) {
        super(locale);
        this.setTemplate({
            tag : 'hr'
        })
    }

}
