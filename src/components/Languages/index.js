import styles from "./index.module.scss";

import React from "react";
import { navigate, Link } from "gatsby";
import { LocaleContext } from "../Layout";
import usePageMapping from "../../i18n/configuration/usePageMapping";

const languages = require("../../i18n/languages");

const Languages = () => {
  const { language } = React.useContext(LocaleContext);
  const pageMapping = usePageMapping();

  function handleClickLanguage(e, lang) {
    //TODO localStorage.getItem("preferredLanguage");
    const isBrowser = typeof window !== "undefined";
    if (isBrowser)
      window.localStorage.setItem("preferredLanguage", lang);

    if (language.code === lang) {
      e.preventDefault();
      return;
    }

    const url = window.location.pathname.split("/").pop();
    if (!url) return;

    const mappedUrl = pageMapping.find(item => {
      let hasUrl = false;

      Object.entries(item).forEach(([key, value]) => {
        if (value.split("/").pop() === url) return (hasUrl = true);
      });

      return hasUrl;
    });

    if (!mappedUrl) return;

    e.preventDefault();

    return languages[lang].default
      ? navigate(`/${mappedUrl[lang]}`)
      : navigate(`/${lang}/${mappedUrl[lang]}`);
  }

  return (
    <ul className={styles.LanguageList}>
      {Object.entries(languages)
        .filter(([language, languageProps]) => !languageProps.hidden)
        .map(([language, languageProps]) => (
          <li className={styles.LanguageItem} key={language}>
            <Link
              className={styles.LanguageLink}
              key={language}
              to={languageProps.default ? "/" : languageProps.path}
              hrefLang={language}
              onClick={e => handleClickLanguage(e, language)}
            >
              {language}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Languages;
