import React from "react";
import { graphql } from "gatsby";
import TitlePage from "../components/TitlePage";
import PageList from "../components/PageList";
import Pagination from "../components/Pagination";
import SEO from "../components/seo";

const Creatures = props => {
  // Logic for Pagination Component
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? "/creatures"
      : `/creatures/${currentPage - 1}`;
  const nextPage = `/creatures/page/${currentPage + 1}`;
  const pages = props.data.allMarkdownRemark.edges;

  return (
    <>
      <SEO title="Creatures" />
      <TitlePage text="Creatures" />
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

export const query = graphql`
  query Creatures(
    $locale: String!
    $dateFormat: String!
    $skip: Int!
    $limit: Int!
  ) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        frontmatter: { page: { eq: null } }
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
            folklore
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

export default Creatures;
