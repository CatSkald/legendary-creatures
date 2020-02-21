import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import TitlePage from "../components/TitlePage";
import PageList from "../components/PageList";
import LocalizedLink from "../components/LocalizedLink";
import useTranslations from "../i18n/useTranslations";

const Index = ({ data: { allMarkdownRemark } }) => {
  const translations = useTranslations();

  const pages = allMarkdownRemark.edges;

  return (
    <div>
      <SEO title={translations.Home} />
      <TitlePage text={translations.Title} />
      <p>{translations.Description}</p>
      <hr style={{ margin: `2rem 0` }} />
      <h2>
        <strong>{translations.Latest}</strong>
      </h2>
      <br />
      <PageList pages={pages} />
      <br />
      <LocalizedLink to={"/creatures/"}>
        {translations.All}
      </LocalizedLink>
    </div>
  );
};

export default Index;

export const query = graphql`
  query Index($locale: String!, $dateFormat: String!) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        frontmatter: { page: { eq: null } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            origin
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
