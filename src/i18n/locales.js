// Only one language MUST have the "default: true" key

module.exports = {
  en: {
    default: true,
    path: "/en",
    locale: "en-US",
    country: "us",
    dateFormat: "DD/MM/YYYY",
    siteLanguage: "en",
    ogLanguage: "en_US",
  },
  ru: {
    path: "/ru",
    locale: "ru-RU",
    country: "ru",
    dateFormat: "DD.MM.YYYY",
    siteLanguage: "ru",
    ogLanguage: "ru_RU",
  },
  uk: {
    hidden: true,
    path: "/uk",
    locale: "uk-UA",
    country: "ua",
    dateFormat: "DD.MM.YYYY",
    siteLanguage: "uk",
    ogLanguage: "uk_UA",
  },
};
