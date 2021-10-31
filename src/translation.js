
export function addTranslations(language, translations, getPluralForm) {
    if (!window.CKEDITOR_TRANSLATIONS) {
        window.CKEDITOR_TRANSLATIONS = {};
    }

    if (!window.CKEDITOR_TRANSLATIONS[language]) {
        window.CKEDITOR_TRANSLATIONS[language] = {};
    }

    const languageTranslations = window.CKEDITOR_TRANSLATIONS[language];

    languageTranslations.dictionary = languageTranslations.dictionary || {};
    languageTranslations.getPluralForm = getPluralForm || languageTranslations.getPluralForm;

    // Extend the dictionary for the given language.
    Object.assign(languageTranslations.dictionary, translations);
}
