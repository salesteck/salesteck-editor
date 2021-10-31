import {Command} from 'ckeditor5/src/core';
import $ from 'jquery';
import 'magnific-popup';

export default class SaveCommand extends Command {
    static get commandName(){
        return 'saveData';
    }
    constructor(editor, saveDataFunction) {
        super(editor);
        // console.log("SaveCommand#constructor", {editor});
        this.saveDataFunction = saveDataFunction;
    }


    execute() {
        const editor = this.editor;
        const saveDataFunction = this.saveDataFunction;
        let data = editor._getData();
        $.magnificPopup.open({
            items: {
                src: '<div class="ck-save-modal">' +
                    '<h3>'+editor.t('Save')+'?</h3>' +
                    '<p style="margin-top: 15px">' +
                        '<button class="ck-dismiss-btn btn btn-c-light" id="ck-dismiss-btn"  href="#">'+editor.t('Cancel')+'</button>' +
                        '<button class="ck-save-btn btn btn-c-danger" id="ck-save-btn"  href="#" style="float: right">'+editor.t('Save')+'</button>' +
                    '</p>' +
                    '</div>', // can be a HTML string, jQuery object, or CSS selector
                type: 'inline'
            },
            callbacks: {
                open: function () {
                    const magnificPopupInstance = this;
                    const $content = $(this.content);
                    let $saveBtn = $('#ck-save-btn', $content);
                    if ($saveBtn.length) {
                        $saveBtn.click( ()=> {
                            saveDataFunction(editor, data);
                            magnificPopupInstance.close();
                        });
                    }
                    let $cancelBtn = $('#ck-dismiss-btn', $content);
                    if ($cancelBtn.length) {
                        $cancelBtn.click( ()=> {
                            magnificPopupInstance.close();
                        });
                    }
                },
            }
        });

    }

}
