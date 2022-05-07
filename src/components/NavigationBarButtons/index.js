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
          <span
            role="img"
            className={`${navigationBarButtons__theme} ${
              props.isDarkColorTheme
                ? navigationBarButtons__theme__dark
                : navigationBarButtons__theme__light
            }`}
          ></span>
        </button>
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
