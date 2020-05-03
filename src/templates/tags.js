import React from "react";
import { graphql } from "gatsby";
import TitlePage from "../components/TitlePage";
import TagList from "../components/TagList";
import SEO from "../components/seo";

const Tags = props => {
  let tags = {};

  props.data.allMarkdownRemark.edges.forEach(({ node: { frontmatter } }) => {
    for (const tag in frontmatter) {
      let tagValues = frontmatter[tag];
      tagValues = Array.isArray(tagValues) ? tagValues : [tagValues];

      const existingTags = tags[tag];
      if (existingTags) {
        tags[tag] = [...new Set(existingTags.concat(tagValues))];
      } else {
        tags[tag] = tagValues;
      }
    }
  });

  return (
    <>
      <SEO title="Tags" />
      <TitlePage text="Tags" />
      <TagList tags={tags} />
    </>
  );
};

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

export default Tags;
