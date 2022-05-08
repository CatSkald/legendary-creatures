const isBrowser = typeof window !== "undefined";
const configuration = require("../configuration");
const themes = {
  light: { name: "Light", id: "light", cssClassName: "theme-light", icon: "🌣" },
  dark: { name: "Dark", id: "dark", cssClassName: "theme-dark", icon: "☽" },
  darkHighContrast: {
    id: "darkHighContrast",
    name: "Dark High Contrast",
    cssClassName: "theme-dark-high-contrast",
    icon: "✪",
  },
};
const keys = {
  theme: "theme",
};

const getDefaultThemeId = () => {
  return isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? themes.dark.id
    : themes[configuration.defaultTheme].id;
};

const storeToLocalStorage = (key, value) => {
  if (isBrowser) window.localStorage.setItem(key, value);
};

const getFromLocalStorage = (key) => {
  return isBrowser ? window.localStorage.getItem(key) : null;
};

exports.loadUserSettings = () => {
  const selectedThemeId = getFromLocalStorage(keys.theme);

  return new UserSettings(selectedThemeId);
};

class UserSettings {
  constructor(themeId) {
    this.selectedTheme = themes[themeId] || themes[getDefaultThemeId()];
  }

  toggleTheme() {
    switch (this.selectedTheme && this.selectedTheme.id) {
      case themes.light.id:
        this.selectedTheme = themes.dark;
        break;
      case themes.dark.id:
        this.selectedTheme = themes.darkHighContrast;
        break;
      case themes.darkHighContrast.id:
        this.selectedTheme = themes.light;
        break;
      default:
        this.selectedTheme = themes[getDefaultThemeId()];
        break;
    }

    storeToLocalStorage(keys.theme, this.selectedTheme.id);
  }
}
