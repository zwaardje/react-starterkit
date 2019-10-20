import i18next from 'i18next/index.js';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import nl  from './translations/nl.json';
import en  from './translations/en.json';

const translations = {
    nl: {
        ... nl,
    },
    en: {
        ... en,
    },
};

export const config = {
    lng: 'nl',
    fallbackLng: 'en',
    ns: ['pages'],
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    react: { wait: true },
    resources: translations,
};

export default i18next.use(LanguageDetector)
    .use(initReactI18next);
