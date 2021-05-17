import "../../styles/global.scss";
import "../../styles/theme-light.scss";
import "../../styles/theme-dark.scss";
import {
  layout__container,
  layout,
  layout__content,
} from "./index.module.scss";

import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import storage from "../../utils/local-storage-helpers";

const LocaleContext = React.createContext();

const Layout = (props) => {
  var userSettings = storage.getUserSettings();
  const [isDarkColorTheme, switchColorTheme] = React.useState(
    userSettings.isDarkColorTheme,
  );

  function handleToggleColorTheme() {
    switchColorTheme(!isDarkColorTheme);
    storage.store(
      storage.keys.theme,
      !isDarkColorTheme ? storage.keys.themes.dark : storage.keys.themes.light,
    );
  }

  return (
    <LocaleContext.Provider value={{ language: props.pageContext.language }}>
      <div
        className={`body ${layout__container} ${
          isDarkColorTheme ? "theme-dark" : "theme-light"
        }`}
      >
        <Header
          isDarkColorTheme={isDarkColorTheme}
          handleToggleColorTheme={handleToggleColorTheme}
          localizedLinks={props.pageContext.localizedLinks}
        />
        <section className={layout} role="main">
          <div className={layout__content}>{props.children}</div>
        </section>
        <Footer />
      </div>
    </LocaleContext.Provider>
  );
};

export { Layout, LocaleContext };
