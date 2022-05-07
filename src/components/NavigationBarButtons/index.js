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

const NavigationBarButtons = (props) => {
  const { language } = React.useContext(LocaleContext);

  return (
    <ul className={navigationBarButtons}>
      <li className={navigationBarButtons__button}>
        <button
          title="Change language"
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
          title="Switch color theme"
          aria-label="Change website color theme"
          onClick={() => props.handleToggleColorTheme()}
        >
          <span role="img" className={`${navigationBarButtons__theme}`}>
            {props.selectedThemeIcon}
          </span>
        </button>
      </li>
    </ul>
  );
};

NavigationBarButtons.propTypes = {
  handleToggleColorTheme: PropTypes.func.isRequired,
  selectedThemeIcon: PropTypes.string.isRequired,
  handleToggleLanguageSelection: PropTypes.func.isRequired,
  isLanguageSelectionActive: PropTypes.bool.isRequired,
};

export default NavigationBarButtons;
