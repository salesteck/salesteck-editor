
import {icons} from 'ckeditor5/src/core';

import KeepDisplayWidgetToolbar from './src/module/debug/keep-display-widget-toolbar';
// import HtmlBlock from './src/$html-block/$html-block';
// import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import SourceEditing from './src/module/source-editing/src/sourceediting';
// import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
// import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import Modal from "./src/module/modal-offcanvas/modal/modal";
//TODO
import "./src/theme/style.css";
import arrowNormal from './src/theme/icon/normal.svg';
// Essentials
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
// import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard.js';

// SpecialCharacters
import {
    SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersEssentials,
    SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
// Heading
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
// Indentation
import {Indent, IndentBlock} from '@ckeditor/ckeditor5-indent';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
// Style
import {Bold, Strikethrough, Subscript, Superscript, Underline, Italic} from '@ckeditor/ckeditor5-basic-styles';

// Font
import {FontBackgroundColor, FontColor, FontFamily, FontSize} from '@ckeditor/ckeditor5-font';

// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
//TODO
// List
import {List, ListStyle} from "@ckeditor/ckeditor5-list";
import CustomList from "./src/module/list/customList";
// import List from './src/_block/_list-unused/src/list';
// import ListStyle from './src/_block/_list-unused/src/liststyle';

// RestrictedEditing
import RestrictedEditingMode from '@ckeditor/ckeditor5-restricted-editing/src/restrictededitingmode.js';
import StandardEditingMode from "@ckeditor/ckeditor5-restricted-editing/src/standardeditingmode.js";
import RestrictedEditingCommand from "./src/core/commands/restrictededitingcommand";
// Table
import {Table, TableCellProperties, TableProperties, TableToolbar, TableCaption} from "@ckeditor/ckeditor5-table";


import Blocks from "./src/_block/block/blocks";


// Image

import { Image, AutoImage, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar } from '@ckeditor/ckeditor5-image';
import CKFinder from './src/module/ckfinder/ckfinder';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
// import LinkImage from './src/ckeditor/link/src/linkimage.js';
import SalesteckLinkImageEditing from './src/module/inline/link/salesteck-link-image-editing';
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage.js";

// Media
import MediaEmbed from './src/module/media/mediaembed-custom/mediaembed.js';
import MediaStyle from './src/module/media/media-resize/mediastyle.js';
import MediaToolbar from './src/module/media/media-resize/mediatoolbar.js';
import MediaRatio from "./src/module/media/media-resize/media-ratio.js";


// import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
// import Autolink from '@ckeditor/link/src/autolink.js';
// import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
// import Link from '@ckeditor/ckeditor5-link/src/salesteck-link.js';
//TODO remove link temporary for drag & drop test
import SalesteckLink from './src/module/inline/link/salesteck-link.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
// import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown.js';
// import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
// import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js';


// require('@ckeditor/ckeditor5-lang-inline/lang/translations/fr.js');
// require('./fr.js');


import ImageCustom from './src/module/image/image.js';


import MultiRootEditor from "./src/multiroot-editor/multi-root-editor";
// import TextBlock from "./src/_inline/text/text-block";
import InlineElement from "./src/module/inline/element/inline-element";
import Icon from './src/module/inline/icon/icon';
import Placeholder from './src/module/inline/placeholder/placeholder';
import SaveUi from "./src/module/save/save-ui";
import PreviewUi from "./src/module/preview/preview-ui";
import ClassAttributes from "./src/module/side-bar/class/class-attributes";
import Attributes from "./src/module/side-bar/attribute/attributes";
import {BLOCK_TREE} from "./src/module/side-bar/tree/tree-editing";
import {BLOCK_ATTRIBUTES} from "./src/module/side-bar/attribute/attributes-editing";
import {BLOCK_CLASS_ATTRIBUTES} from "./src/module/side-bar/class/class-attributes-editing";
import {BLOCK_ELEMENTS} from "./src/module/side-bar/element/elements-editing";
import TableAttribute from "./src/module/table/table-attribute";
import {FigureAttributes} from "./src/module/image/figure-attributes";
import {SALESTECK_ICONS, TOOLBAR_SEPARATOR} from "./src/const";
import MediaResize from "./src/module/media/media-resize/mediaresize";
import HoverAttribute from "./src/ckeditor5-hover-attribute/hover-attribute";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import InlineElementEditing from "./src/module/inline/element/inline-element-editing";
import BlockSelectParentCommand from "./src/_block/block/block-operation/commands/block-select-parent-command";
import PlaceholderCommand from "./src/module/inline/placeholder/placeholdercommand";
import StyleSrc from "./src/module/style-source/style-src";
import {HtmlComment} from "@ckeditor/ckeditor5-html-support";
import OffCanvas from "./src/module/modal-offcanvas/off-canvas/off-canvas";
import SalesteckAttrConverter from "./src/module/attr-converter/_salesteck/_attr/salesteck-attr-converter";
import SalesteckContextualBalloonOffset from "./src/$html-block/salesteck-contextual-balloon-offset";
import BsAttrConverter from "./src/module/attr-converter/_bs/_attr/bs-attr-converter";
import CollapseBlock from "./src/$block/collapse-block/collapse-block";
import ShapedDivider from "./src/module/shape-divider/shaped-divider";
import ProgressBar from "./src/$block/progress-bar/progress-bar";
import TextBlockClass from "./src/module/text-block/text-block-class";

// add( 'en', {
//     'cancel': 'OK',
//     'Bold': 'Anuluj',
//     // ...
// },  n => n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && ( n % 100 < 10 || n % 100 >= 20 ) ? 1 : 2 );
class SalesteckEditor extends MultiRootEditor {}

(function () {

    const modules = {
        specialChar: true,
        heading: true,
        indentation: true,
        list: true,
        image: true,
        media: true,
        table: true,
        restrictedEditing: false
    }
    let defaultConfig = {debug: false};
    defaultConfig.componentUrl = "";
    defaultConfig.fixedClass = ['col', 'row', 'container', 'container-fluid', 'image', 'image-inline', 'media', 'table'];
    defaultConfig.fixedAttribute = ['data-block-type'];

    /*defaultConfig.htmlSupport = {
        allow: [
            {
                name: 'div',
                styles: true,
                classes: true,
                attributes: true
            },
            'span', 'select', 'option', 'label',
            {
                name: 'iframe',
                styles: true,
                classes: true,
                attributes: true
            },
            {
                name: 'input',
                styles: true,
                classes: true,
                attributes: true
            },
        ],
        disallow: [
            {
                name: 'div',
                attributes: 'data-block-type'
            },
        ]
    };*/
    defaultConfig.htmlSupport = {
        allow: [
            {
                name: 'style'
            },
            // Enables all HTML features.
            {
                name: /.*/,
                attributes: [{key: 'data-html-support', value: 'true'}],
                classes: true,
                styles: true
            }
        ],
        // disallow: [
        //     {
        //         attributes: [
        //             {key: /^on(.*)/i, value: true},
        //             {key: /.*/, value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i},
        //             {key: `data-block-type`, value: true},
        //         ]
        //     },
        //     {name: 'script'}
        // ]
    };

    let toolbarItems = [
        BLOCK_TREE, TOOLBAR_SEPARATOR, 'sourceEditing',
        // 'findAndReplace',
        // 'copy', 'cut', 'paste',
        TOOLBAR_SEPARATOR, 'previewData', TOOLBAR_SEPARATOR, 'saveData', TOOLBAR_SEPARATOR, 'undo', 'redo',
    ];
    let builtinPlugins = [
        SalesteckContextualBalloonOffset,
        // HtmlComment,
        StyleSrc,
        HoverAttribute,
        // FigureAttributes,
        KeepDisplayWidgetToolbar,
        // FindAndReplace,
        // GeneralHtmlSupport,
        Attributes,
        ClassAttributes,
        SaveUi,
        PreviewUi,
        Essentials,
        SourceEditing,


        Autoformat,
        // CloudServices,
        // ImageUpload,
        // Markdown,
        // Mention,
        Paragraph,
        // PasteFromOffice,

        // WordCount,


        InlineElement,
        Icon,
        Placeholder,
        List, ListStyle, CustomList
    ];
    defaultConfig.sideBar = {
      tree : {
          unRemovableModelElements : ['tableCell', InlineElementEditing.textContainerModelName, 'modalContent', 'modalBody']
      }
    };
    if (modules.specialChar) {
        bundlePlugins(
            ['insertIcon', 'specialCharacters', PlaceholderCommand.commandName, TOOLBAR_SEPARATOR],
            [
                SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersEssentials,
                SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText
            ]
        )

    }

    if (modules.heading) {
        bundlePlugins(['heading', 'text-block' + BLOCK_CLASS_ATTRIBUTES, TOOLBAR_SEPARATOR], [Heading, TextBlockClass])
        defaultConfig.heading = {
            options: [
                { model: 'text-container', view: { name: 'div', attributes: { "data-block-type": 'text-container' } }, title: 'Text container', converterPriority: 'high'},
                { model: 'paragraph', view: { name: 'p' }, title: 'Paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6' },
            ]
        };
    }

    if (modules.indentation) {
        bundlePlugins(['indent', 'outdent', TOOLBAR_SEPARATOR], [Indent, IndentBlock, PageBreak, HorizontalLine]);
    }

    bundlePlugins(
        [
            'bold', 'italic', 'underline', 'strikethrough', 'blockQuote',
            // 'link',
            'subscript', 'superscript', TOOLBAR_SEPARATOR,
            'alignment', 'fontFamily', 'fontSize', 'fontBackgroundColor', 'fontColor'/*, 'highlight'*/
        ],
        [
            Bold,
            Italic,
            Underline,
            Strikethrough,
            BlockQuote,
            SalesteckLink,
            Link,
            // Autolink,
            Subscript,
            Superscript,
            Alignment, FontFamily, FontSize, FontBackgroundColor, FontColor, /*Highlight,*/
        ]
    )
    defaultConfig.fontSize = {
        options: [
            'default', 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 40, 50
        ],
        supportAllValues: true
    };
    defaultConfig.fontColor = {
        columns: 8
    };
    defaultConfig.fontBackgroundColor = {
        columns: 8
    };
    defaultConfig.fontFamily = {
        supportAllValues: true
    };

    if (modules.list) {
        bundlePlugins([TOOLBAR_SEPARATOR, 'bulletedList', 'numberedList'], []);
    }


    defaultConfig.inlineConfig = {};
    defaultConfig.iconConfig = {};

    if (modules.image) {
        bundlePlugins(
            [],
            [
                Image, ImageCustom, ImageInsert, ImageResize, ImageStyle,
                ImageToolbar,
                AutoImage,
                CKFinder,
                CKFinderUploadAdapter
                , SalesteckLinkImageEditing
                , LinkImage
                , ImageCaption
            ]
        )
        defaultConfig.image = {
            insert: { type: 'block' },
            styles : {
                options : [
                    {name: 'alignLeft', title: 'Left aligned image', icon: icons.objectLeft, className: 'float-start'},
                    {name: 'alignRight', title: 'Right aligned image', icon: icons.objectRight, className: 'float-end'},
                    {name: 'alignCenter', title: 'Center image', icon: icons.objectRight, className: 'mx-auto'},
                    {
                        name: 'inline',
                        icon: SALESTECK_ICONS.imageInline
                    }, {
                        name: 'block',
                        title: 'Block image',
                        icon: SALESTECK_ICONS.image
                    }
                ]
            },
            toolbar: [
                BlockSelectParentCommand.commandName,
                TOOLBAR_SEPARATOR,
                'imageEdit',
                TOOLBAR_SEPARATOR,
                'toggleImageCaption',
                {
                    // Grouping the buttons for the icon-like image styling
                    // into one drop-down.
                    name: 'imageStyle:icons',
                    items: [
                        'imageStyle:alignLeft',
                        'imageStyle:alignCenter',
                        'imageStyle:alignRight'
                    ],
                    defaultItem: 'imageStyle:alignCenter'
                }, {
                    // Grouping the buttons for the regular
                    // picture-like image styling into one drop-down.
                    name: 'imageStyle:pictures',
                    items: [ 'imageStyle:block', 'imageStyle:inline' ],
                    defaultItem: 'imageStyle:block'
                },
                TOOLBAR_SEPARATOR,
                'imageResize',
                TOOLBAR_SEPARATOR,
                'imageTextAlternative',
                TOOLBAR_SEPARATOR,
                'linkImage',
                TOOLBAR_SEPARATOR,
                BLOCK_ATTRIBUTES,
                BLOCK_CLASS_ATTRIBUTES

            ],
            resizeOptions: [
                {
                    name: 'resizeImage:original',
                    value: null,
                    icon: 'original'
                },
                {
                    name: 'resizeImage:25',
                    value: '25',
                    icon: 'small'
                },
                {
                    name: 'resizeImage:50',
                    value: '50',
                    icon: 'medium'
                },
                {
                    name: 'resizeImage:75',
                    value: '75',
                    icon: 'large'
                },
                {
                    name: 'resizeImage:100',
                    value: '100',
                    icon: 'large'
                }
            ]
        }
    }

    if (modules.media) {
        bundlePlugins(
            [
                // 'mediaEmbed'
            ],
            [
                MediaEmbed,
                MediaResize,
                MediaRatio,
                MediaStyle,
                MediaToolbar
            ]
        )
        defaultConfig.mediaEmbed = {
            styles: [
                {name: 'full', icon: arrowNormal},
                'alignLeft', 'alignCenter', 'alignRight'
            ],
            ratio: {
                defaultClass: 'ratio',
                options: [
                    {
                        label: 'No ratio',
                        name: 'mediaRatio:original',
                        value: null
                    },
                    {
                        label: '1:1',
                        name: 'mediaRatio:1x1',
                        value: 'ratio-1x1'
                    },
                    {
                        label: '4:3',
                        name: 'mediaRatio:4x3',
                        value: 'ratio-4x3'
                    },
                    {
                        label: '16:9',
                        name: 'mediaRatio:16x9',
                        value: 'ratio-16x9'
                    },
                    {
                        label: '21:9',
                        name: 'mediaRatio:21x9',
                        value: 'ratio-21x9'
                    }
                ]
            },
            toolbar: [
                BlockSelectParentCommand.commandName,
                TOOLBAR_SEPARATOR,
                'mediaEmbed',
                TOOLBAR_SEPARATOR,
                'mediaStyle:full', 'mediaStyle:alignLeft', 'mediaStyle:alignCenter', 'mediaStyle:alignRight',
                TOOLBAR_SEPARATOR,
                'mediaRatio',
                'mediaResize',
                TOOLBAR_SEPARATOR,
                BLOCK_ATTRIBUTES,
                BLOCK_CLASS_ATTRIBUTES
            ], previewsInData: false
        }
    }

    if (modules.table) {
        bundlePlugins(
            ['insertTable'],
            [Table, TableCellProperties, TableProperties, TableToolbar, TableCaption, TableAttribute]
        )
        defaultConfig.table = {
            contentToolbar: [
                'toggleTableCaption', 'caption' + BLOCK_ATTRIBUTES, 'caption' + BLOCK_CLASS_ATTRIBUTES,
                TOOLBAR_SEPARATOR,
                'tableProperties', 'table' + BLOCK_ATTRIBUTES, 'table' + BLOCK_CLASS_ATTRIBUTES,
                TOOLBAR_SEPARATOR,
                'tableRow', 'tableColumn',
                TOOLBAR_SEPARATOR,
                'mergeTableCells', 'tableCellProperties', 'tableCell' + BLOCK_ATTRIBUTES, 'tableCell' + BLOCK_CLASS_ATTRIBUTES,
                TOOLBAR_SEPARATOR,
                //TODO
            ],
            tableProperties : {

            }
        };
    }

    if (modules.restrictedEditing) {
        bundlePlugins(
            [TOOLBAR_SEPARATOR, 'restrictedEditingException', 'restrictedEditing'],
            [RestrictedEditingMode, StandardEditingMode, RestrictedEditingCommand]
        )
        defaultConfig.restrictedEditing = {
            allowedCommands: ['bold', 'restrictedEditingException']
        }
    }

    toolbarItems.push(TOOLBAR_SEPARATOR, `addHiddenComponents`, BLOCK_ELEMENTS);


    bundlePlugins([], [
        Modal,
        OffCanvas,
        ProgressBar,
        ShapedDivider,
        Blocks,
        // CollapseBlock
    ])
    defaultConfig.modal = {
        size : {
            options : [
                {label : "default", value : ''}, {label : "sm", value : 'sm'}, {label : "lg", value : 'lg'}, {label : "xl", value : 'xl'},
            ]
        },
        fullscreen : {
            options : [
                {label : "default", value : ''},
                {label : "all screen", value : 'all'},
                {label : "< sm screen", value : 'sm'},
                {label : "< md screen", value : 'md'},
                {label : "< lg screen", value : 'lg'},
                {label : "< xl screen", value : 'xl'},
                {label : "< xxl screen", value : 'xxl'},
            ]
        },
        templateUrl: ''
    };
    defaultConfig.offcanvas = {
        placement : {
            options : [
                {label : "left", value : 'start'}, {label : "top", value : 'top'}, {label : "right", value : 'end'}, {label : "bottom", value : 'bottom'}
            ]
        },
        templateUrl: ''
    };
    builtinPlugins.push(SalesteckAttrConverter);
    builtinPlugins.push(BsAttrConverter);
    SalesteckEditor.builtinPlugins = builtinPlugins;


    defaultConfig.toolbar = {
        items: toolbarItems,
        shouldGroupWhenFull: true,
        viewportTopOffset : 40

    };
    defaultConfig.elementsToolbar = [];

    SalesteckEditor.defaultConfig = defaultConfig;

    window.SalesteckEditor = SalesteckEditor;

    function bundlePlugins(toolItems, plugins) {
        toolbarItems = toolbarItems.concat(toolItems);
        builtinPlugins = builtinPlugins.concat(plugins);
    }

})();


export default SalesteckEditor;
