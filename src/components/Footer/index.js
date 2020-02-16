import styles from "./index.module.scss";

import React from "react";
import SocialLinks from "../SocialLinks";
import useTranslations from "../useTranslations";

const Footer = () => {
  const translations = useTranslations();

  return (
    <div className={styles.FooterWrapper}>
      <div className={styles.FooterContainer}>
        <p>{`${translations.footerMoto} © 2020 CatSkald`}</p>
        <SocialLinks />
      </div>
    </div>
  );
};

export default Footer;
