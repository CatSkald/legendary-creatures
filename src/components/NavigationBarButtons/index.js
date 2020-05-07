import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { LocaleContext } from "../Layout";

const NavigationBarButtons = props => {
  const { language } = React.useContext(LocaleContext);

  return (
    <ul className={styles.ButtonList}>
      <li className={styles.Button}>
        <span
          title="Change language"
          className={`${styles.Language} ${
            props.isLanguageSelectionActive ? styles.active : ""
          }`}
          onClick={() => props.handleToggleLanguageSelection()}
        >
          {language.name}
        </span>
      </li>
      <li className={styles.Button}>
        <span
          title="Switch color theme"
          role="img"
          aria-label="Change website color theme"
          className={`${styles.ColorTheme} ${
            props.isDarkColorTheme ? styles.ThemeDark : styles.ThemeLight
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
