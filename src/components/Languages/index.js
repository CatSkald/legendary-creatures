import styles from "./index.module.scss";

import React from "react";
import { navigate, Link } from "gatsby";
import { LocaleContext } from "../Layout";
import usePageMapping from "../../i18n/configuration/usePageMapping";

const languages = require("../../i18n/languages");

const Languages = ({ isActive, handleLanguageSelected }) => {
  const { language } = React.useContext(LocaleContext);
  const pageMapping = usePageMapping();

  function handleClickLanguage(e, lang) {
    handleLanguageSelected();

    //TODO localStorage.getItem("preferredLanguage");
    const isBrowser = typeof window !== "undefined";
    if (isBrowser)
      window.localStorage.setItem("preferredLanguage", lang);

    if (language.code === lang) {
      e.preventDefault();
      return;
    }

    var selectedLanguage = languages[lang];
    if (!selectedLanguage) return;

    e.preventDefault();

    const url = window.location.pathname.split("/").pop();
    if (!url) {
      navigate(selectedLanguage.path);
      return;
    }

    const mappedUrl = pageMapping.find(item => {
      let hasUrl = false;

      Object.entries(item).forEach(([key, value]) => {
        if (value.split("/").pop() === url) return (hasUrl = true);
      });

      return hasUrl;
    });

    if (!mappedUrl) {
      navigate(selectedLanguage.path);
      return;
    }

    return navigate(`${languages[lang].path}/${mappedUrl[lang]}`);
  }

  return (
    <ul
      className={`${styles.LanguageList} ${
        isActive ? styles.active : ""
      }`}
    >
      {Object.entries(languages)
        .filter(([lang, languageProps]) => !languageProps.hidden)
        .map(([lang, languageProps]) => (
          <li className={styles.LanguageItem} key={lang}>
            <Link
              className={`${styles.LanguageLink} ${
                language.code === lang ? styles.active : ""
              }`}
              key={lang}
              to={languageProps.path}
              hrefLang={lang}
              onClick={e => handleClickLanguage(e, lang)}
            >
              {languageProps.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Languages;
