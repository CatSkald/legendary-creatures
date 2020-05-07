import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import LocalizedLink from "../LocalizedLink";
import { LocaleContext } from "../Layout";

const NavigationBar = props => {
  const { language } = React.useContext(LocaleContext);
  const { rawData } = useStaticQuery(queryMenu);
  const localeFileExtension = "." + language.code;
  const menuItemsForCurrentLocale = rawData.edges
    .filter(
      item => item.node.name && item.node.name.endsWith(localeFileExtension),
    )
    .map(item => item.node.translations.menuItems)[0];

  return (
    <>
      <nav
        className={`${styles.NavigationBar} ${
          props.isActive ? styles.active : ""
        }`}
      >
        {menuItemsForCurrentLocale.map(menu => (
          <LocalizedLink
            className={styles.NavigationLink}
            key={menu.name}
            to={menu.link}
            aria-label={menu.name}
            activeClassName={styles.active}
            onClick={() => props.handleToggleMenu()}
          >
            {menu.name}
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

const queryMenu = graphql`
  query queryMenu {
    rawData: allFile(
      filter: {
        sourceInstanceName: { eq: "i18n-configuration" }
        name: { glob: "menu.*" }
      }
    ) {
      edges {
        node {
          name
          translations: childConfigurationYaml {
            menuItems {
              link
              name
            }
          }
        }
      }
    }
  }
`;
