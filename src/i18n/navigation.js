const tags = {
  origin: {
    en: "origin",
    ru: "происхождение",
    uk: "походження",
  },
  taxonomy: {
    en: "taxonomy",
    ru: "таксономия",
    uk: "таксономія",
  },
  shapeshifting: {
    en: "shapeshifting",
    ru: "ипостаси",
    uk: "іпостасі",
  },
  activityTime: {
    en: "activity time",
    ru: "время активности",
    uk: "час активності",
  },
  voice: {
    en: "voice",
    ru: "голос",
    uk: "голос",
  },
  character: {
    en: "character",
    ru: "характер",
    uk: "характер",
  },
  appearance: {
    en: "appearance",
    ru: "внешность",
    uk: "зовнішність",
  },
  clothes: {
    en: "clothes",
    ru: "одежда",
    uk: "одяг",
  },
  paraphernalia: {
    en: "paraphernalia",
    ru: "атрибутика",
    uk: "атрибутика",
  },
  number: {
    en: "number",
    ru: "численность",
    uk: "чисельність",
  },
  habitat: {
    en: "habitat",
    ru: "ареал",
    uk: "ареал",
  },
};

module.exports = {
  // use non-breaking space in titles: " "
  pages: {
    home: {
      en: { title: "Home", path: "/" },
      ru: { title: "Главная", path: "/" },
      uk: { title: "Головна", path: "/" },
      type: "menu",
    },
    creatures: {
      en: { title: "Creatures", path: "/creatures" },
      ru: { title: "Библиотека существ", path: "/существа" },
      uk: { title: "Бібліотека істот", path: "/істоти" },
      type: "menu",
    },
    tags: {
      en: { title: "Tags", path: "/tags" },
      ru: { title: "Метки", path: "/метки" },
      uk: { title: "Мітки", path: "/мітки" },
      type: "menu",
    },
    search: {
      en: { title: "", path: "/search" },
      ru: { title: "", path: "/поиск" },
      uk: { title: "", path: "/пошук" },
    },
    about: {
      en: { title: "About", path: "/about" },
      ru: { title: "О проекте", path: "/about" },
      uk: { title: "Про проект", path: "/about" },
      type: "menu",
    },
    terms: {
      en: { title: "Privacy & Terms", path: "/terms" },
      ru: { title: "Конфиденциальность и условия пользования", path: "/terms" },
      uk: { title: "Конфіденційність та умови користування", path: "/terms" },
      type: "footer",
    },
    contact: {
      en: { title: "Contact", path: "/contact" },
      ru: { title: "Обратная связь", path: "/contact" },
      uk: { title: "Зворотній зв’язок", path: "/contact" },
      type: "footer",
    },
  },
  tags: tags,
  supportedTags: Object.keys(tags),
};
