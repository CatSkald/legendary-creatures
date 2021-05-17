import styles from "./index.module.scss";

import React from "react";

import SocialLinks from "../SocialLinks";
import LocalizedLink from "../LocalizedLink";
import useTranslations from "../../i18n/translations/useTranslations";
import { LocaleContext } from "../Layout";
import { pages } from "../../i18n/navigation";

const Footer = () => {
  const translations = useTranslations();
  const { language } = React.useContext(LocaleContext);
  var menuItems = Object.entries(pages)
    .filter(([page, data]) => data.type === "footer")
    .map(([page, data]) => data[language.code]);

  return (
    <div className={styles.FooterWrapper}>
      <div className={styles.FooterContainer}>
        <div className={styles.FooterAuthor}>
          <p>{`${translations.footerMoto} © 2020 CatSkald`}</p>
          <SocialLinks />
        </div>
        <div className={styles.FooterMenu}>
          {menuItems.map((menu) => (
            <p key={menu.path}>
              <LocalizedLink
                className={styles.NavigationLink}
                to={menu.path}
                aria-label={menu.title}
                activeClassName={styles.active}
              >
                {menu.title}
              </LocalizedLink>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
