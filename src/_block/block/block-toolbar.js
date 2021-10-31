/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/imagetoolbar
 */

import {Plugin} from 'ckeditor5/src/core';
import {WidgetToolbarRepository} from 'ckeditor5/src/widget';
import BlocksEditing from "./blocks-editing";
import {BLOCK_LABEL} from "./block-operation/block-operation-ui";
import BlockOperation from "./block-operation";
import { TOOLBAR_SEPARATOR} from "../../const";
import SideBar from "../../module/side-bar/side-bar";
import {BLOCK_STYLES} from "../../module/side-bar/style/style-editing";
import {BLOCK_CLASS_ATTRIBUTES} from "../../module/side-bar/class/class-attributes-editing";
import {BLOCK_ATTRIBUTES} from "../../module/side-bar/attribute/attributes-editing";
import {ACTIVE_STATE, HOVER_STATE} from "../../ckeditor5-hover-attribute/hover-attribute";
import BlockCloneCommand from "./block-operation/commands/block-clone-command";
import BlockSelectParentCommand from "./block-operation/commands/block-select-parent-command";
import BlockDeleteCommand from "./block-operation/commands/block-delete-command";
import BlockMoveCommand from "./block-operation/commands/block-move-command";
import {findViewForWidgetToolbar} from "../../engine/utils/position/widget-toolbar-utils";

/**
 * The image toolbar plugin. It creates and manages the image toolbar (the toolbar displayed when an image is selected).
 *
 * For a detailed overview, check the {@glink features/image#image-contextual-toolbar image contextual toolbar} documentation.
 *
 * Instances of toolbar components (e.g. buttons) are created using the editor's
 * {@link @ckEditor5/ui/componentfactory~ComponentFactory component factory}
 * based on the {@link @ckEditor5/image/image~ImageConfig#toolbar `image.toolbar` configuration option}.
 *
 * The toolbar uses the {@link @ckEditor5/ui/panel/balloon/contextualballoon~ContextualBalloon}.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
export default class BlockToolbar extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [
            WidgetToolbarRepository,
            SideBar,
            BlockOperation,
        ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckBlockToolbar';
    }

    /**
     * @inheritDoc
     */
    afterInit() {

        const editor = this.editor;

        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

        this._registerContentToolbar(widgetToolbarRepository, editor);
        this._registerBlockToolbar(widgetToolbarRepository, editor, BlocksEditing.columnPluginName, 'Column toolbar');
        this._registerBlockToolbar(widgetToolbarRepository, editor, BlocksEditing.blockPluginName, 'Block toolbar');
        this._registerBlockToolbar(widgetToolbarRepository, editor, BlocksEditing.rowModelName, 'Row toolbar');
        this._registerBlockToolbar(widgetToolbarRepository, editor, BlocksEditing.containerPluginName, 'Container toolbar');
        this._registerBlockToolbar(widgetToolbarRepository, editor, BlocksEditing.sectionPluginName, 'Section toolbar');

    }

    _registerContentToolbar(widgetToolbarRepository, editor) {
        const t = editor.t;
        const modelName = BlocksEditing.contentModelName;
        let items = [
            modelName + BLOCK_LABEL,
            `${HOVER_STATE}_${modelName}`,
            // `${ACTIVE_STATE}_${modelName}`,
            modelName + BlockDeleteCommand.commandName,
            TOOLBAR_SEPARATOR,
            modelName + BlockSelectParentCommand.commandName,
            TOOLBAR_SEPARATOR,
            modelName + BlockMoveCommand.commandName,
            modelName + BlockCloneCommand.commandName,
            TOOLBAR_SEPARATOR,
            modelName + BLOCK_STYLES,
            modelName + BLOCK_ATTRIBUTES,
            modelName + BLOCK_CLASS_ATTRIBUTES
        ];
        widgetToolbarRepository.register(modelName, {
            ariaLabel: t('Content toolbar'),
            items: items,
            getRelatedElement: function (viewSelection) {
                return findViewForWidgetToolbar(editor, viewSelection, modelName);
            },
            // balloonClassName : 'test'
        });
    }

    _registerBlockToolbar(widgetToolbarRepository, editor, modelName, label) {
        let items = [
            modelName + BLOCK_LABEL,
            `${HOVER_STATE}_`,
            // `${ACTIVE_STATE}_`,
            BlockDeleteCommand.commandName,
            TOOLBAR_SEPARATOR,
            BlockSelectParentCommand.commandName,
            TOOLBAR_SEPARATOR,
            modelName + BlockMoveCommand.commandName,
            BlockCloneCommand.commandName,
            TOOLBAR_SEPARATOR,

            BLOCK_STYLES,
            BLOCK_ATTRIBUTES,
            BLOCK_CLASS_ATTRIBUTES
        ];
        const t = editor.t;
        widgetToolbarRepository.register(modelName, {
            ariaLabel: t(label),
            items: items,
            getRelatedElement: function (viewSelection) {
                return findViewForWidgetToolbar(editor, viewSelection, modelName);
            }
        });
    }
}
