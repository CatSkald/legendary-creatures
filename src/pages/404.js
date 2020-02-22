import React from "react";
import SEO from "../components/seo";
import useTranslations from "../i18n/translations/useTranslations";

const NotFound = () => {
  const { NotFound404Header, NotFound404Content } = useTranslations();

  // TODO make it work for non-en locale
  return (
    <>
      <SEO title="404: Not found" />
      <h1>404</h1>
      <h2>{NotFound404Header}</h2>
      {NotFound404Content}
    </>
  );
};

export default NotFound;
