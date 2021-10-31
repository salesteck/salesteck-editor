
import { Command } from 'ckeditor5/src/core';
import {_isMagnificPopupValid, _isStrNotEmpty} from "../../general";
import $ from "jquery";
export default class InsertFromAjax extends Command{
    constructor(editor) {
        super(editor);
        this._isValid = _isMagnificPopupValid();
        this.componentUrl = editor.config.get('componentUrl') || '';
    }
    execute({url, selector}) {
        // console.log("InsertFromAjax#execute", { url, selector});
        this._openPopup(url, selector);
    }
    refresh() {
        this.isEnabled = _isStrNotEmpty(this.componentUrl);
    }

    _openPopup(url, selector){

        if(_isMagnificPopupValid() && _isStrNotEmpty(url) && this._isValid && _isStrNotEmpty(selector) && _isStrNotEmpty(this.componentUrl)){
            const _this = this;
            // console.log('url', {url, selector});

            $.magnificPopup.open({
                iframe : {
                    markup: '<div class="mfp-iframe-scaler ck-editor-iframe">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe mfp-ck-editor" allowfullscreen></iframe>'+
                        '</div>'
                },
                mainClass : 'ck-editor-lightbox',
                items: {
                    src: _this.componentUrl+url
                },
                type: 'iframe',
                callbacks: {
                    open: function() {
                        const magnificPopupInstance = this;
                        // console.log('Popup is opened');
                        const $content = $(this.content);
                        const iframe = $('iframe', $content);
                        iframe.on('load', function (){
                            // const $this = $(this);
                            // const body = $this.contents().find('body');
                            // $.post( address, function( data ) {
                            //     body.prepend(data);
                            //     let selections = body.find(selector);
                            //     selections.click(function (){
                            //         const htmlElement = $(this)[0].outerHTML;
                            //         _this._insertHtml(htmlElement);
                            //         magnificPopupInstance.close();
                            //     })
                            //
                            // });
                            let selections = $(this).contents().find(selector);
                            // console.log("IconInsertAjaxCommand#execute", { selections});
                            selections.click(function (){
                                const htmlElement = $(this)[0].outerHTML;
                                _this._insertHtml(htmlElement);
                                magnificPopupInstance.close();
                            })

                        });

                    }
                }
            });
        }
    }


    _insertHtml(htmlString){
        // console.log(`InsertFromAjax`, {htmlString});
    }

}
