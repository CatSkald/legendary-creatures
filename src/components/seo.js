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
            author
            url
            image
          }
        }
      }
    `,
  );

  const translations = useTranslations();
  const ogTitle = title || translations.Title;
  const ogDescription = description || translations.Description;
  const ogImage = `${site.siteMetadata.url}${image || site.siteMetadata.image}`;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={ogTitle}
      titleTemplate={`%s 🐾 ${translations.ShortTitle}`}
      meta={[
        {
          property: "og:title",
          content: ogTitle,
        },
        {
          name: "description",
          content: ogDescription,
        },
        {
          property: "og:description",
          content: ogDescription,
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
};

export default SEO;
