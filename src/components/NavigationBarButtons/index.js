import {
  active,
  navigationBarButtons,
  navigationBarButtons__button,
  navigationBarButtons__language,
  navigationBarButtons__theme,
} from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { LocaleContext } from "../Layout";
import useTranslations from "../../i18n/translations/useTranslations";

const NavigationBarButtons = (props) => {
  const { language } = React.useContext(LocaleContext);
  const translations = useTranslations();

  return (
    <ul className={navigationBarButtons}>
      <li className={navigationBarButtons__button}>
        <button
          title={translations.ChangeLanguage}
          className={`${navigationBarButtons__language} ${
            props.isLanguageSelectionActive ? active : ""
          }`}
          onClick={() => props.handleToggleLanguageSelection()}
        >
          {language.name}
        </button>
      </li>
      <li className={navigationBarButtons__button}>
        <button
          title={`'${props.selectedTheme.name}', ${translations.clickToChange}`}
          aria-label={translations.ChangeColorTheme}
          onClick={() => props.handleToggleColorTheme()}
        >
          <span role="img" className={navigationBarButtons__theme}>
            {props.selectedTheme.icon}
          </span>
        </button>
      </li>
    </ul>
  );
};

NavigationBarButtons.propTypes = {
  handleToggleColorTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    cssClassName: PropTypes.string.isRequired,
  }).isRequired,
  handleToggleLanguageSelection: PropTypes.func.isRequired,
  isLanguageSelectionActive: PropTypes.bool.isRequired,
};

export default NavigationBarButtons;
