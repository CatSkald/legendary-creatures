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
      ru: { title: "Библиотека существ", path: "/creatures" },
      uk: { title: "Бібліотека істот", path: "/creatures" },
      type: "menu",
    },
    tags: {
      en: { title: "Tags", path: "/tags" },
      ru: { title: "Метки", path: "/tags" },
      uk: { title: "Мітки", path: "/tags" },
      type: "menu",
    },
    search: {
      en: { title: "", path: "/search" },
      ru: { title: "", path: "/search" },
      uk: { title: "", path: "/search" },
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
