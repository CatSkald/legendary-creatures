import styles from "./index.module.scss";

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LocalizedLink from "../LocalizedLink";
import { LocaleContext } from "../Layout";

const NavigationBar = ({ isActive, handleToggleMenu }) => {
  const { locale } = React.useContext(LocaleContext);
  const { rawData } = useStaticQuery(queryMenu);
  const localeFileExtension = "." + locale;
  const menuItemsForCurrentLocale = rawData.edges
    .filter(
      item =>
        item.node.name &&
        item.node.name.endsWith(localeFileExtension),
    )
    .map(item => item.node.translations.menuItems)[0];

  return (
    <>
      <nav
        className={`${styles.NavigationBar} ${
          isActive ? styles.active : ""
        }`}
      >
        {menuItemsForCurrentLocale.map(menu => (
          <LocalizedLink
            className={styles.NavigationLink}
            key={menu.name}
            to={menu.link}
            aria-label={menu.name}
            activeClassName={styles.active}
            onClick={() => handleToggleMenu()}
          >
            {menu.name}
          </LocalizedLink>
        ))}
      </nav>
    </>
  );
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
