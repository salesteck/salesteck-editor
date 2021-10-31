import { View } from 'ckeditor5/src/ui';

export function viewCreator(locale, templateOption = {tag : 'div'}){
    const view = new View(locale);
    view.setTemplate(templateOption);
    view.set({
        children : view.createCollection(),
        class : '',
        id : '',
    });
    return view;
}

