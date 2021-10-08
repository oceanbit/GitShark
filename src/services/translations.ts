import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import dayjs from 'dayjs';

// DayJS
require('dayjs/locale/de');
require('dayjs/locale/en');
require('dayjs/locale/es');
require('dayjs/locale/de');
require('dayjs/locale/pt');

type StringRec = {
  [key: string]: string | StringRec;
};

const translations: Record<string, () => StringRec> = {
  en: () => {
    return require('../../translations/en.json');
  },
  es: () => {
    return require('../../translations/es.json');
  },
  de: () => {
    return require('../../translations/de.json');
  },
  pt: () => {
    return require('../../translations/pt.json');
  },
};

/**
 * While this currently works, this may cause issues if the user changes their language while
 * GitShark is currently open. This may show the old selected language until they restart the app. This might
 * be worth fixing
 */
const fallback = {languageTag: 'en', isRTL: false};
const {languageTag, isRTL} =
  RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback;

dayjs.locale(languageTag);

i18n
  .use(initReactI18next)
  .init({
    // Remove and replace with Hermes usage:
    // https://reactnative.dev/blog/2021/08/17/version-065
    compatibilityJSON: 'v3',
    resources: {
      [languageTag]: {
        translation: translations[languageTag](),
      },
    },
    lng: languageTag,
  })
  .catch(e => {
    console.error('There was an error initializing translations');
    console.error(e);
  });
