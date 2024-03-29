import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import TitlePage from "../components/TitlePage";
import PageList from "../components/PageList";
import LocalizedLink from "../components/LocalizedLink";
import useTranslations from "../i18n/translations/useTranslations";
import { LocaleContext } from "../components/Layout";
import { getTagsPath, getCreaturesPath } from "../utils/url-helpers";

const Index = ({ data: { allMarkdownRemark } }) => {
  const translations = useTranslations();
  const { language } = React.useContext(LocaleContext);

  const pages = allMarkdownRemark.edges;

  return (
    <div>
      <SEO title={translations.Home} />
      <TitlePage text={translations.Title} />
      <p>{translations.Description}</p>
      <hr />
      <h2>
        <strong>{translations.Latest}</strong>
      </h2>
      <PageList pages={pages} />
      <span>{translations.View} </span>
      <LocalizedLink to={getCreaturesPath(language.code)}>
        {translations.all}
      </LocalizedLink>
      <span> {translations.orSearchBy} </span>
      <LocalizedLink to={getTagsPath(language.code)}>
        {translations.tags}
      </LocalizedLink>
    </div>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.object.isRequired,
          }),
        }).isRequired,
      ),
    }),
  }),
};

export default Index;

export const query = graphql`
  query Index($locale: String!, $dateFormat: String!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        frontmatter: { page: { eq: null } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            image
            date(formatString: $dateFormat)
          }
          fields {
            locale
            slug
          }
        }
      }
    }
  }
`;
