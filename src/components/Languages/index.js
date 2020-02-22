import "flag-icon-css/css/flag-icon.css";
import styles from "./index.module.scss";

import React from "react";
import { navigate, Link } from "gatsby";
import { LocaleContext } from "../Layout";
import usePageMapping from "../../i18n/configuration/usePageMapping";

const locales = require("../../i18n/locales");

const Languages = () => {
  const { locale } = React.useContext(LocaleContext);
  const pageMapping = usePageMapping();

  function handleClickLanguage(e, lang) {
    //TODO localStorage.getItem("preferredLanguage");
    const isBrowser = typeof window !== "undefined";
    if (isBrowser)
      window.localStorage.setItem("preferredLanguage", lang);

    if (locale === lang) {
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

    return locales[lang].default
      ? navigate(`/${mappedUrl[lang]}`)
      : navigate(`/${lang}/${mappedUrl[lang]}`);
  }

  return (
    <ul className={styles.LanguageList}>
      {Object.entries(locales)
        .filter(([language, languageProps]) => !languageProps.hidden)
        .map(([language, languageProps]) => (
          <li
            className={styles.LanguageItem}
            key={languageProps.locale}
          >
            <Link
              className={styles.LanguageLink}
              key={languageProps.locale}
              to={languageProps.default ? "/" : languageProps.path}
              hrefLang={languageProps.siteLanguage}
              onClick={e =>
                handleClickLanguage(e, languageProps.siteLanguage)
              }
            >
              <span
                className={`flag-icon flag-icon-${languageProps.country}`}
              ></span>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Languages;
