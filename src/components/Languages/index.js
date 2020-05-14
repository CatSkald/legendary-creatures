import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { navigate, Link } from "gatsby";
import { LocaleContext } from "../Layout";

const languages = require("../../i18n/languages");

const Languages = props => {
  const { language } = React.useContext(LocaleContext);

  function handleClickLanguage(e, lang) {
    props.handleLanguageSelected();

    //TODO localStorage.getItem("preferredLanguage");
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) window.localStorage.setItem("preferredLanguage", lang);

    if (language.code === lang) {
      e.preventDefault();
      return;
    }

    var selectedLanguage = languages[lang];
    if (!selectedLanguage) return;

    e.preventDefault();

    const mappedUrl = props.localizedLinks && props.localizedLinks[lang];

    return navigate(
      mappedUrl
        ? `${languages[lang].path}/${mappedUrl}`
        : selectedLanguage.path,
    );
  }

  return (
    <ul
      className={`${styles.LanguageList} ${
        props.isActive ? styles.active : ""
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

Languages.propTypes = {
  handleLanguageSelected: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Languages;
