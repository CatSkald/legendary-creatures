import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import TitlePage from "../components/TitlePage";
import PageList from "../components/PageList";
import Pagination from "../components/Pagination";
import SEO from "../components/seo";
import useTranslations from "../i18n/translations/useTranslations";
import { LocaleContext } from "../components/Layout";
import { getCreaturesUrl } from "../utils/url-helpers";

const Creatures = props => {
  const { language } = React.useContext(LocaleContext);

  // Logic for Pagination Component
  const { currentPage, numPages } = props.pageContext;
  const prevPage = getCreaturesUrl(currentPage - 1, language.code);
  const nextPage = getCreaturesUrl(currentPage + 1, language.code);
  const pages = props.data.allMarkdownRemark.edges;
  const translations = useTranslations();

  return (
    <>
      <SEO title={translations.CreaturesPageTitle} />
      <TitlePage text={translations.CreaturesPageTitle} />
      <PageList pages={pages} />
      <Pagination
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
    $origin: String = "*"
    $taxonomy: String = "*"
    $shapeshifting: String = "*"
    $activityTime: String = "*"
    $voice: String = "*"
    $character: String = "*"
    $appearance: String = "*"
    $clothes: String = "*"
    $paraphernalia: String = "*"
    $number: String = "*"
    $habitat: String = "*"
  ) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        frontmatter: {
          page: { eq: null }
          origin: { elemMatch: { value: { glob: $origin } } }
          taxonomy: { elemMatch: { value: { glob: $taxonomy } } }
          shapeshifting: { elemMatch: { value: { glob: $shapeshifting } } }
          activityTime: { elemMatch: { value: { glob: $activityTime } } }
          voice: { elemMatch: { value: { glob: $voice } } }
          character: { elemMatch: { value: { glob: $character } } }
          appearance: { elemMatch: { value: { glob: $appearance } } }
          clothes: { elemMatch: { value: { glob: $clothes } } }
          paraphernalia: { elemMatch: { value: { glob: $paraphernalia } } }
          number: { elemMatch: { value: { glob: $number } } }
          habitat: { elemMatch: { value: { glob: $habitat } } }
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
