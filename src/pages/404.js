import "../styles/404.scss";
import React from "react";
import SEO from "../components/seo";
import { notFound } from "../i18n/navigation";

const NotFound = ({ location }) => {
  const language =
    location.pathname && /\/[a-z]{2}\/.+/.test(location.pathname)
      ? location.pathname.slice(1, 3)
      : "";
  const translation = notFound[language] || notFound[notFound.default];

  return (
    <>
      <SEO title="404: Not found" />
      <h1>
        404
        <span role="img" aria-label="Emoji: face screaming in fear">
          😱
        </span>
      </h1>
      <br />
      <h2>{translation.header}</h2>
      <br />
      <br />
      {translation.content}
    </>
  );
};

export default NotFound;
