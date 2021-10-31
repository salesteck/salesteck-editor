
import { Command } from 'ckeditor5/src/core';
import {
    _isFunction,
    _isMagnificPopupValid,
    _isStr,
    _isStrNotEmpty
} from "../../general";
import {_openMagnificPopupIframe} from "./preview-ui";

export default class PreviewCommand extends Command{
    constructor( editor, extraData) {
        super( editor );
        // console.log("PreviewCommand#constructor", { editor });
        // this.isEnabled = true;
        this.extraData = extraData;
    }


    execute({preview, screenType}) {
        const editor = this.editor;
        const extraData = this.extraData || {};
        let data = editor._getData();
        screenType = _isStr(screenType) ? screenType : "";
        if(_isFunction(preview)){
            preview(editor, data);
        }else {
            if(_isMagnificPopupValid() && _isStrNotEmpty(preview)){
                // console.log({data})
                $.post(preview, {
                    data : data, extraData
                }).done(function (){
                    _openMagnificPopupIframe(preview, screenType)
                })

            }
        }


    }

}
