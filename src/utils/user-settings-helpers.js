const isBrowser = typeof window !== "undefined";
const configuration = require("../configuration");
const keys = {
  theme: "theme",
  themes: { dark: "dark", light: "light" },
};

const getDefaultTheme = () => {
  return isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? keys.themes.dark
    : configuration.defaultTheme;
};

const storeToLocalStorage = (key, value) => {
  if (isBrowser) window.localStorage.setItem(key, value);
};

const getFromLocalStorage = (key) => {
  return isBrowser ? window.localStorage.getItem(key) : null;
};

exports.loadUserSettings = () => {
  const selectedTheme = getFromLocalStorage(keys.theme);

  return new UserSettings(selectedTheme);
};

class UserSettings {
  constructor(theme) {
    this.selectedTheme = theme || getDefaultTheme();
  }

  toggleTheme() {
    this.selectedTheme = this.isDarkColorTheme
      ? keys.themes.light
      : keys.themes.dark;
    storeToLocalStorage(keys.theme, this.selectedTheme);
  }

  get isDarkColorTheme() {
    return this.selectedTheme === keys.themes.dark;
  }
}
