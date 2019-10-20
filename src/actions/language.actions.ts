export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const INIT_LANGUAGE = 'INIT_LANGUAGE';

export const changeLanguage = language => ({ language, type: CHANGE_LANGUAGE });
export const initLanguage = language => ({ language, type: INIT_LANGUAGE });

export const TYPES = {
    CHANGE_LANGUAGE,
    INIT_LANGUAGE,
};

export default { changeLanguage, initLanguage };
