import styles from "./index.module.scss";

import React, { useState } from "react";
import PropTypes from "prop-types";
import NavigationBar from "../NavigationBar";
import Languages from "../Languages";
import NavigationBarButtons from "../NavigationBarButtons";
import HamburgerButton from "../HamburgerButton";

const Header = (props) => {
  const [isMenuActive, toggleMenu] = useState(false);
  const [isLanguageSelectionActive, toggleLanguageSelection] = useState(false);

  function handleToggleMenu() {
    toggleLanguageSelection(false);
    toggleMenu(!isMenuActive);
  }

  function handleToggleLanguageSelection() {
    toggleMenu(false);
    toggleLanguageSelection(!isLanguageSelectionActive);
  }

  function handleLanguageSelected() {
    toggleMenu(false);
    toggleLanguageSelection(false);
  }

  return (
    <div className={styles.HeaderWrapper}>
      <div className={styles.Container}>
        <HamburgerButton
          handleClick={handleToggleMenu}
          isActive={isMenuActive}
        />
        <div className={styles.NavMenu}>
          <NavigationBar
            isActive={isMenuActive}
            handleToggleMenu={handleToggleMenu}
          />
        </div>
        <div className={styles.NavLanguages}>
          <NavigationBarButtons
            isDarkColorTheme={props.isDarkColorTheme}
            handleToggleColorTheme={props.handleToggleColorTheme}
            isLanguageSelectionActive={isLanguageSelectionActive}
            handleToggleLanguageSelection={handleToggleLanguageSelection}
          />
          <Languages
            isActive={isLanguageSelectionActive}
            handleLanguageSelected={handleLanguageSelected}
            localizedLinks={props.localizedLinks}
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  handleToggleColorTheme: PropTypes.func.isRequired,
  isDarkColorTheme: PropTypes.bool.isRequired,
};

export default Header;
