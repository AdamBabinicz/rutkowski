import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pl from '../locales/pl.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

const resources = {
  pl: { translation: pl },
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
