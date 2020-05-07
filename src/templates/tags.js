import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import TitlePage from "../components/TitlePage";
import TagList from "../components/TagList";
import SEO from "../components/seo";
import useTranslations from "../i18n/translations/useTranslations";

const Tags = props => {
  const translations = useTranslations();
  let tags = {};

  props.data.allMarkdownRemark.edges.forEach(({ node: { frontmatter } }) => {
    for (const tag in frontmatter) {
      let tagValues = frontmatter[tag];
      tagValues = Array.isArray(tagValues) ? tagValues : [tagValues];
      const tagName = translations[tag] || tag;

      const existingTags = tags[tagName];
      if (existingTags) {
        tags[tagName] = [...new Set(existingTags.concat(tagValues))];
      } else {
        tags[tagName] = tagValues;
      }
    }
  });

  return (
    <>
      <SEO title={translations.TagsPageTitle} />
      <TitlePage text={translations.TagsPageTitle} />
      <TagList tags={tags} />
    </>
  );
};

Tags.propTypes = {
  data: PropTypes.object.isRequired,
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
            origin
            categories
            number
            habitat
          }
        }
      }
    }
  }
`;
