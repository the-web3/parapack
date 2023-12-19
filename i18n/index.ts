import 'intl'; // Import the polyfill
import 'intl-pluralrules'; // Import the polyfill
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { GLOBAL_I18N_LANGUAGE } from '@constants/storage';
import { getData } from '@common/utils/storage';
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
/**
 * get valiad format language
 * @returns 
 */
export function getValidLan() {
  function isLanguageValid(data: string): boolean {
    return Object.values(Languages).includes(data as Languages);
  }
  return getData("GLOBAL_I18N_LANGUAGE").then(value => {
    if (isLanguageValid(value)) {
      return value
    }
    return Languages.ZH_CN
  }).catch(() => {
    return Languages.ZH_CN
  })
}


async function initializeI18n() {
  const lng = await getValidLan();
  i18n
    .use(LanguageDetector) // 了解更多信息: https://github.com/i18next/i18next-browser-languageDetector
    .use(initReactI18next) // 将 i18n 传递给 react-i18next
    .init({
      resources,
      lng,
      fallbackLng: [Languages.ZH_CN, Languages.EN_US],
      interpolation: {
        escapeValue: false, // react 已经保护了 XSS
      },
    });
}

initializeI18n()

export const { t } = i18n;

export default i18n;
