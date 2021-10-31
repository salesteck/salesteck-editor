import {Plugin} from "ckeditor5/src/core";


export default class KeepDisplayWidgetToolbar extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'KeepDisplayWidgetToolbar';
    }

    constructor(editor) {
        super(editor);
    }

    init() {
        const editor = this.editor;
        const clipWidgetToolbar = !!editor.config.get('clipWidgetToolbar') || false;

        this.listenTo(editor.ui.focusTracker, 'change:isFocused', (evt, data) => {
            if (clipWidgetToolbar) {
                // console.log(`${evt.name}`, {evt, data, clipWidgetToolbar});
                evt.stop()
            }
        }, {priority: 'highest'});
    }
}
