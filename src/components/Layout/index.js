import "../../styles/global.scss";
import "../../styles/theme-light.scss";
import "../../styles/theme-dark.scss";
import styles from "./index.module.scss";

import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

const LocaleContext = React.createContext();

const Layout = ({ children, pageContext: { language } }) => {
  const [isDarkColorTheme, switchColorTheme] = useState(false);

  function handleToggleColorTheme() {
    switchColorTheme(!isDarkColorTheme);
  }

  return (
    <LocaleContext.Provider value={{ language }}>
      <div
        className={`body ${styles.Wrapper} ${
          isDarkColorTheme ? "theme-dark" : "theme-light"
        }`}
      >
        <Header
          isDarkColorTheme={isDarkColorTheme}
          handleToggleColorTheme={handleToggleColorTheme}
        />
        <section className={styles.SiteContent} role="main">
          <div className={styles.Container}>{children}</div>
        </section>
        <Footer />
      </div>
    </LocaleContext.Provider>
  );
};

export { Layout, LocaleContext };
