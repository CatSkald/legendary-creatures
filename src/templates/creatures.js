import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import TitlePage from "../components/TitlePage";
import PageList from "../components/PageList";
import Pagination from "../components/Pagination";
import SEO from "../components/seo";
import useTranslations from "../i18n/translations/useTranslations";

const Creatures = props => {
  const { getCreaturesUrl } = require("../utils/url-helpers");

  // Logic for Pagination Component
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = getCreaturesUrl(currentPage - 1);
  const nextPage = getCreaturesUrl(currentPage + 1);
  const pages = props.data.allMarkdownRemark.edges;
  const translations = useTranslations();

  return (
    <>
      <SEO title={translations.CreaturesPageTitle} />
      <TitlePage text={translations.CreaturesPageTitle} />
      <PageList pages={pages} />
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        numPages={numPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </>
  );
};

Creatures.propTypes = {
  pageContext: PropTypes.object.isRequired,
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

export default Creatures;

export const query = graphql`
  query Creatures(
    $locale: String!
    $dateFormat: String!
    $skip: Int!
    $limit: Int!
    $origin: String!
    $categories: String!
    $number: String!
    $habitat: String!
  ) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        frontmatter: {
          page: { eq: null }
          origin: { glob: $origin }
          categories: { glob: $categories }
          number: { glob: $number }
          habitat: { glob: $habitat }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
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
