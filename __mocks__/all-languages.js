import languages from "../src/i18n/languages";

exports.allLanguages = Object.entries(languages).map(
  ([, langProps]) => langProps,
);
