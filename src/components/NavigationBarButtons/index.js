import styles from "./index.module.scss";

import React from "react";
import { LocaleContext } from "../Layout";

const NavigationBarButtons = ({
  isDarkColorTheme,
  handleToggleColorTheme,
  isLanguageSelectionActive,
  handleToggleLanguageSelection,
}) => {
  const { language } = React.useContext(LocaleContext);

  return (
    <ul className={styles.ButtonList}>
      <li className={styles.Button}>
        <span
          title="Change language"
          className={`${styles.Language} ${
            isLanguageSelectionActive ? styles.active : ""
          }`}
          onClick={() => handleToggleLanguageSelection()}
        >
          {language.name}
        </span>
      </li>
      <li className={styles.Button}>
        <span
          title="Switch color theme"
          role="img"
          aria-label="Change website color theme"
          className={styles.ColorTheme}
          onClick={() => handleToggleColorTheme()}
        >
          {`${isDarkColorTheme ? "☽" : "🌣"}`}
        </span>
      </li>
    </ul>
  );
};

export default NavigationBarButtons;
