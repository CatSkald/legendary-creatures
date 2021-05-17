import {
  active,
  languageMenu,
  languageMenu__language,
  languageMenu__link,
} from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { navigate, Link } from "gatsby";

import { LocaleContext } from "../Layout";
import languages from "../../i18n/languages";

const Languages = (props) => {
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
    <ul className={`${languageMenu} ${props.isActive ? active : ""}`}>
      {Object.entries(languages)
        .filter(([lang, languageProps]) => !languageProps.hidden)
        .map(([lang, languageProps]) => (
          <li className={languageMenu__language} key={lang}>
            <Link
              className={`${languageMenu__link} ${
                language.code === lang ? active : ""
              }`}
              key={lang}
              to={languageProps.path || "/"}
              hrefLang={lang}
              onClick={(e) => handleClickLanguage(e, lang)}
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
