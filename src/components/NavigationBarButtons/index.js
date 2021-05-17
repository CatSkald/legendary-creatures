import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { LocaleContext } from "../Layout";

const NavigationBarButtons = (props) => {
  const { language } = React.useContext(LocaleContext);

  return (
    <ul className={styles.navigationBarButtons}>
      <li className={styles.navigationBarButtons__button}>
        <span
          title="Change language"
          className={`${styles.navigationBarButtons__language} ${
            props.isLanguageSelectionActive ? styles.active : ""
          }`}
          onClick={() => props.handleToggleLanguageSelection()}
        >
          {language.name}
        </span>
      </li>
      <li className={styles.navigationBarButtons__button}>
        <span
          title="Switch color theme"
          role="img"
          aria-label="Change website color theme"
          className={`${styles.navigationBarButtons__theme} ${
            props.isDarkColorTheme
              ? styles.navigationBarButtons__theme__dark
              : styles.navigationBarButtons__theme__light
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
