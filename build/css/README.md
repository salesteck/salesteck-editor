#Style Cleaning

Go to -> /build/css/salesteck-editor.bundle.css

```CSS
/*WIDGET*/
/*remove*/
.ck .ck-widget, .ck .ck-widget.ck-widget_with-selection-handle {
remove all
    position: relative
}

/*remove*/
.ck .ck-editor__nested-editable {
remove all
    border: 1px solid transparent
}
/*TABLE*/
.ck-content .table {
    remove all
}
.ck-content .table table {
    remove all
}
.ck-content .table table td, .ck-content .table table th {
    remove all
}
.ck-content .table table th {
    remove all
}

.ck-content .table > figcaption {
    display: table-caption;
    word-break: break-word;
    outline-offset: -1px;
}
--ck-color-table-caption-highlighted-background: hsl(52, 100%, 50%);


/*IMAGE*/

.ck-content .image {
    remove all
}

.ck-content .image-inline {
    remove all
}

.ck-content .image-inline img, .ck-content .image-inline picture {
    remove all
}

.ck-content .image.image_resized {
    remove all
}

/*tooltip*/
.ck.ck-tooltip.ck-tooltip_s, .ck.ck-tooltip.ck-tooltip_se, .ck.ck-tooltip.ck-tooltip_sw {
    bottom: calc(-1 * var(--ck-tooltip-arrow-size));
    //CHANGE this
    right: unset !important;
    transform: translate(-50%) translateY(100%);
}
.ck.ck-tooltip .ck-tooltip__text {

    font-size: .9em;
    line-height: 1.5;
    color: var(--ck-color-tooltip-text);
    padding: var(--ck-spacing-small) var(--ck-spacing-medium);
    background: var(--ck-color-tooltip-background);
    position: relative;
    //CHANGE this
    left: 0;
}
```
