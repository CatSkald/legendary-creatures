import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import TitlePage from "../components/TitlePage";
import TagList from "../components/TagList";
import SEO from "../components/seo";
import useTranslations from "../i18n/translations/useTranslations";
import { parseTags } from "../utils/tags-helpers";

const Tags = (props) => {
  const translations = useTranslations();
  const tags = parseTags(props.data.allMarkdownRemark.edges);

  return (
    <>
      <SEO title={translations.TagsPageTitle} />
      <TitlePage text={translations.TagsPageTitle} />
      <TagList tags={tags} />
    </>
  );
};

Tags.propTypes = {
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

export default Tags;

export const query = graphql`
  query Tags($locale: String!) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        frontmatter: { page: { eq: null } }
      }
    ) {
      edges {
        node {
          frontmatter {
            origin {
              value
            }
            taxonomy {
              value
            }
            shapeshifting {
              value
            }
            activityTime {
              value
            }
            voice {
              value
            }
            appearance {
              value
            }
            character {
              value
            }
            clothes {
              value
            }
            paraphernalia {
              value
            }
            number {
              value
            }
            habitat {
              value
            }
          }
        }
      }
    }
  }
`;
