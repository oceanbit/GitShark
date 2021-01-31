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
  de: () => require('../../translations/de.json'),
  en: () => require('../../translations/en.json'),
  es: () => require('../../translations/es.json'),
  de: () => require('../../translations/de.json'),
  pt: () => require('../../translations/pt.json'),
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
