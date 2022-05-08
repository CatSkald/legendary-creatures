import {
  header__container,
  header,
  header__menu,
  header__languages,
} from "./index.module.scss";

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
    <div className={header__container}>
      <div className={header}>
        <HamburgerButton
          handleClick={handleToggleMenu}
          isActive={isMenuActive}
        />
        <div className={header__menu}>
          <NavigationBar
            isActive={isMenuActive}
            handleToggleMenu={handleToggleMenu}
          />
        </div>
        <div className={header__languages}>
          <NavigationBarButtons
            selectedTheme={props.selectedTheme}
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
  selectedTheme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    cssClassName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
