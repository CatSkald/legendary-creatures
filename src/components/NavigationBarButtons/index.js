import {
  active,
  navigationBarButtons,
  navigationBarButtons__button,
  navigationBarButtons__language,
  navigationBarButtons__theme,
  navigationBarButtons__theme__dark,
  navigationBarButtons__theme__light,
} from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { LocaleContext } from "../Layout";

const NavigationBarButtons = (props) => {
  const { language } = React.useContext(LocaleContext);

  return (
    <ul className={navigationBarButtons}>
      <li className={navigationBarButtons__button}>
        <span
          title="Change language"
          className={`${navigationBarButtons__language} ${
            props.isLanguageSelectionActive ? active : ""
          }`}
          onClick={() => props.handleToggleLanguageSelection()}
        >
          {language.name}
        </span>
      </li>
      <li className={navigationBarButtons__button}>
        <span
          title="Switch color theme"
          role="img"
          aria-label="Change website color theme"
          className={`${navigationBarButtons__theme} ${
            props.isDarkColorTheme
              ? navigationBarButtons__theme__dark
              : navigationBarButtons__theme__light
          }`}
          onClick={() => props.handleToggleColorTheme()}
        ></span>
      </li>
    </ul>
  );
};

NavigationBarButtons.propTypes = {
  handleToggleColorTheme: PropTypes.func.isRequired,
  isDarkColorTheme: PropTypes.bool.isRequired,
  handleToggleLanguageSelection: PropTypes.func.isRequired,
  isLanguageSelectionActive: PropTypes.bool.isRequired,
};

export default NavigationBarButtons;
