import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import useTranslations from "../i18n/translations/useTranslations";

function SEO({ description, lang, meta, title, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            # author
            siteUrl
          }
        }
      }
    `,
  );

  const separators = [
    "🐲",
    "🦄",
    "🐉",
    "🦚",
    "🐾",
    "🐁",
    "🐈",
    "🦇",
    "🦖",
    "😈",
    "👹",
    "👺",
    "👻",
    "🧚",
    "🧙",
    "🧛",
    "🧟",
    "🦉",
    "🧝",
    "🎅",
    "👼",
    "🍀",
  ];
  const randomSeparator =
    separators[Math.floor(Math.random() * separators.length)];

  const translations = useTranslations();
  const metaTitle = title || translations.Title;
  const metaDescription = description || translations.Description;
  const url = site.siteMetadata.siteUrl;
  const ogImage = `${url}${image || "/assets/images/cover.jpg"}`;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={metaTitle}
      titleTemplate={`%s ${randomSeparator} ${translations.Title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: metaTitle,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:image",
          content: ogImage,
        },
        {
          property: "og:type",
          content: "website",
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  description: "",
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
