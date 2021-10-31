import {Plugin} from 'ckeditor5/src/core';
import ModalEditing from "./modal-editing";
import HiddenComponents from "../hidden-components";
import ModalToolbar from "./modal-toolbar";
export default class Modal extends Plugin{
    static get pluginName() {
        return 'Modal';
    }
    /**
     * @inheritDoc
     */
    static get requires() {
        return [HiddenComponents, ModalEditing, ModalToolbar ];
    }

}
