import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enStrings from "./constants/translations/en.json";
import arStrings from "./constants/translations/ar.json";
import { localStorageSiteLang } from "./services/localStorage";

// the translations
const resources = {
  en: { translation: enStrings },
  ar: { translation: arStrings },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorageSiteLang.get() ?? "ar",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { i18n };
