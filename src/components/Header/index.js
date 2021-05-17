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
    <div className={styles.header__container}>
      <div className={styles.header}>
        <HamburgerButton
          handleClick={handleToggleMenu}
          isActive={isMenuActive}
        />
        <div className={styles.header__menu}>
          <NavigationBar
            isActive={isMenuActive}
            handleToggleMenu={handleToggleMenu}
          />
        </div>
        <div className={styles.header__languages}>
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
