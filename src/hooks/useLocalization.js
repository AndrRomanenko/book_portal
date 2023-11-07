import { useTranslation } from 'react-i18next'

const LANGUAGE_KEY = 'lang'

export const useLocalization = () => {
  const { i18n } = useTranslation()

  const setAppLanguage = (lang) => {
    localStorage.setItem(LANGUAGE_KEY, lang)
    i18n.changeLanguage(lang)
  }

  const getCurrentLanguage = () => localStorage.getItem(LANGUAGE_KEY)

  const saveAppLanguage = (lang) => localStorage.setItem(LANGUAGE_KEY, lang)

  return { setAppLanguage, getCurrentLanguage, saveAppLanguage }
}
