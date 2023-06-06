import 'intl'; // Import the polyfill
import 'intl-pluralrules'; // Import the polyfill
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { GLOBAL_I18N_LANGUAGE } from '@constants/storage';
import { Languages } from './constants';
import en_US from './locales/en_US';
import zh_CN from './locales/zh_CN';

export const resources = {
  [Languages.EN_US]: {
    translation: {
      ...en_US,
    },
  },
  [Languages.ZH_CN]: {
    translation: {
      ...zh_CN,
    },
  },
};

// const lng = localStorage.getItem(GLOBAL_I18N_LANGUAGE) ?? Languages.ZH_CN;
const lng = Languages.ZH_CN;

i18n
  .use(LanguageDetector) // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng,
    fallbackLng: [Languages.ZH_CN, Languages.EN_US],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export const { t } = i18n;

export default i18n;
