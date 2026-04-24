import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import az from "./locales/az.json"
import en from "./locales/eng.json"
  
const savedLang = localStorage.getItem("lang") || "en"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      az: { translation: az },
      en: { translation: en }
    },
    lng: savedLang,
    fallbackLng: "en",
    debug: true,
    interpolation: { escapeValue: false }
  })

export default i18n
