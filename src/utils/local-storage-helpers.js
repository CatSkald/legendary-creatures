const isBrowser = typeof window !== "undefined";
const configuration = require("../configuration");
const keys = {
  theme: "theme",
  themes: { dark: "dark", light: "light" },
};

exports.store = (key, value) => {
  if (isBrowser) window.localStorage.setItem(key, value);
};

exports.get = (key) => {
  return isBrowser ? window.localStorage.getItem(key) : null;
};

exports.getUserSettings = (key) => {
  if (!isBrowser) return new UserSettings();

  const theme = window.localStorage.getItem(keys.theme);

  return new UserSettings(theme);
};

exports.keys = keys;

class UserSettings {
  constructor(theme) {
    const getDefaultTheme = () => {
      isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : configuration.defaultTheme;
    };

    this.selectedTheme = theme || getDefaultTheme();
  }

  get isDarkColorTheme() {
    return this.selectedTheme === keys.themes.dark;
  }
}
