import React from "react";
import { Link } from "gatsby";
import { LocaleContext } from "../Layout";
import locales from "../../i18n/locales";

const LocalizedLink = ({ to, ...props }) => {
  const { locale } = React.useContext(LocaleContext);
  const currentLocale = locales[locale];

  const enrichLinkWithLocale = () => {
    // Don't add redundant trailing slash in case of the homepage
    const isHomepage = to === "/";
    return currentLocale.path + (isHomepage ? "" : to);
  };

  const path = currentLocale.default ? to : enrichLinkWithLocale();

  return <Link {...props} to={path} />;
};

export default LocalizedLink;
