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

    if (language.code === lang) {
      e.preventDefault();
      return;
    }

    var selectedLanguage = languages[lang];
    if (!selectedLanguage) return;

    e.preventDefault();

    const mappedUrl =
      props.localizedLinks &&
      props.localizedLinks[lang] &&
      props.localizedLinks[lang].path;

    return navigate(`${selectedLanguage.path}${mappedUrl || ""}` || "/");
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
              to={languageProps.path || "/"}
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
