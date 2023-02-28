import {
  footer__container,
  footer,
  footer__author,
  footer__menu,
} from "./index.module.scss";

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
    .filter(([, data]) => data.type === "footer")
    .map(([, data]) => data[language.code]);

  return (
    <div className={footer__container}>
      <div className={footer}>
        <div className={footer__author}>
          <p>{`${translations.footerMoto} © 2020—2023 CatSkald`}</p>
          <SocialLinks />
        </div>
        <div className={footer__menu}>
          {menuItems.map((menu) => (
            <p key={menu.path}>
              <LocalizedLink to={menu.path} aria-label={menu.title}>
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
