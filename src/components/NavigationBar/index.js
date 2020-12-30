import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";

import LocalizedLink from "../LocalizedLink";
import { LocaleContext } from "../Layout";
import { pages } from "../../i18n/navigation";

const NavigationBar = props => {
  const { language } = React.useContext(LocaleContext);
  var menuItems = Object.entries(pages)
    .filter(([page, data]) => data.type === "menu")
    .map(([page, data]) => data[language.code]);

  return (
    <>
      <nav
        className={`${styles.NavigationBar} ${
          props.isActive ? styles.active : ""
        }`}
      >
        {menuItems.map(menu => (
          <LocalizedLink
            className={styles.NavigationLink}
            key={menu.path}
            to={menu.path}
            aria-label={menu.title}
            activeClassName={styles.active}
            onClick={() => props.handleToggleMenu()}
          >
            {menu.title}
          </LocalizedLink>
        ))}
      </nav>
    </>
  );
};

NavigationBar.propTypes = {
  handleToggleMenu: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default NavigationBar;
