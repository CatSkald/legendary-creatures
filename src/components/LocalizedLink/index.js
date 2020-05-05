import React from "react";
import { navigate, Link } from "gatsby";
import { LocaleContext } from "../Layout";

const LocalizedLink = ({ to, navigateOnClick, ...props }) => {
  const { language } = React.useContext(LocaleContext);

  const isHomepage = to === "/";
  const path = language.path + (isHomepage ? "" : to);

  return navigateOnClick ? (
    <Link
      {...props}
      to={path}
      hrefLang={language.code}
      onClick={() => navigate(path)}
    />
  ) : (
    <Link {...props} to={path} hrefLang={language.code} />
  );
};

export default LocalizedLink;
