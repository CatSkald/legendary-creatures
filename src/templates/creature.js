import "../styles/markdown.scss";

import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import CreatureCard from "../components/CreatureCard";
import SEO from "../components/seo";

const Creature = props => {
  const content = props.data.markdownRemark;

  return (
    <>
      <SEO
        title={content.frontmatter.title}
        description={content.frontmatter.description}
        image={content.frontmatter.image}
      />
      <section className="markdown">
        <CreatureCard frontmatter={content.frontmatter} />
        <div dangerouslySetInnerHTML={{ __html: content.html }}></div>
      </section>
    </>
  );
};

Creature.propTypes = {
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

export default Creature;

export const query = graphql`
  query Creature($locale: String!, $id: String!) {
    markdownRemark(
      frontmatter: { id: { eq: $id } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        names {
          name
          plural
          language
        }
        description
        origin
        taxonomy
        shapeshifting
        activityTime
        voice
        appearance
        clothes
        paraphernalia
        number
        habitat
        wikipedia
        image
      }
      html
    }
  }
`;
