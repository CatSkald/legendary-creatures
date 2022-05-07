const isBrowser = typeof window !== "undefined";
const configuration = require("../configuration");
const themes = {
  light: { id: "light", name: "Light", cssClassName: "theme-light", icon: "🌣" },
  dark: { id: "dark", name: "Dark", cssClassName: "theme-dark", icon: "☽" },
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
    if (!this.selectedTheme) {
      this.selectedTheme = themes[getDefaultThemeId()];
      return;
    }

    switch (this.selectedTheme.id) {
      case themes.light.id:
        this.selectedTheme = themes.dark;
        break;
      case themes.dark.id:
        this.selectedTheme = themes.darkHighContrast;
        break;
      case themes.darkHighContrast.id:
      default:
        this.selectedTheme = themes.light;
        break;
    }
    storeToLocalStorage(keys.theme, this.selectedTheme.id);
  }

  get selectedThemeClassName() {
    return this.selectedTheme && this.selectedTheme.cssClassName;
  }

  get selectedThemeIcon() {
    return (this.selectedTheme && this.selectedTheme.icon) || "?";
  }
}
