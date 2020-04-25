import React from "react";
import { Link } from "gatsby";
import { LocaleContext } from "../Layout";

const LocalizedLink = ({ to, ...props }) => {
  const { language } = React.useContext(LocaleContext);

  const isHomepage = to === "/";
  const path = language.path + (isHomepage ? "" : to);

  return <Link {...props} to={path} />;
};

export default LocalizedLink;
