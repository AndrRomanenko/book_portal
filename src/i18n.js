import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// translations sources
import enTranslation from './locales/en.json'
import deTranslation from './locales/de.json'

const resources = {
  en: enTranslation,
  de: deTranslation,
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
