import React from "react";
import { Link } from "gatsby";
import { LocaleContext } from "../Layout";

const LocalizedLink = ({ to, ...props }) => {
  const { language } = React.useContext(LocaleContext);

  const enrichLinkWithLocale = () => {
    // Don't add redundant trailing slash in case of the homepage
    const isHomepage = to === "/";
    return language.path + (isHomepage ? "" : to);
  };

  const path = language.default ? to : enrichLinkWithLocale();

  return <Link {...props} to={path} />;
};

export default LocalizedLink;
