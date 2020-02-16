import "../../styles/global.css";
import styles from "./index.module.scss";

import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const LocaleContext = React.createContext();

const Layout = ({ children, pageContext: { locale } }) => (
  <LocaleContext.Provider value={{ locale }}>
    <div className={styles.Wrapper}>
      <Header />
      <section className={styles.SiteContent} role="main">
        <div className={styles.Container}>{children}</div>
      </section>
      <Footer />
    </div>
  </LocaleContext.Provider>
);

export { Layout, LocaleContext };
