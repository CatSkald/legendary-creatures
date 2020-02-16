import styles from "./index.module.scss";

import React, { useState } from "react";
import NavigationBar from "../NavigationBar";
import Languages from "../Languages";
import HamburgerButton from "../HamburgerButton";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggleMenu() {
    setToggleMenu(!toggleMenu);
  }

  return (
    <div className={styles.HeaderWrapper}>
      <div className={styles.Container}>
        <HamburgerButton
          handleClick={handleToggleMenu}
          isActive={toggleMenu}
        />
        <div className={styles.NavMenu}>
          <NavigationBar
            isActive={toggleMenu}
            handleToggleMenu={handleToggleMenu}
          />
        </div>
        <div className={styles.NavLanguages}>
          <Languages />
        </div>
      </div>
    </div>
  );
};

export default Header;
