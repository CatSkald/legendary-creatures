import "../styles/markdown.scss";

import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import CreatureCard from "../components/CreatureCard";
import SEO from "../components/seo";

const Creature = (props) => {
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
        related
        origin {
          value
          comment
          sometimes
        }
        taxonomy {
          value
          comment
          sometimes
        }
        shapeshifting {
          value
          comment
          sometimes
        }
        activityTime {
          value
          comment
          sometimes
        }
        voice {
          value
          comment
          sometimes
        }
        character {
          value
          comment
          sometimes
        }
        appearance {
          value
          comment
          sometimes
        }
        clothes {
          value
          comment
          sometimes
        }
        paraphernalia {
          value
          comment
          sometimes
        }
        number {
          value
          comment
          sometimes
        }
        habitat {
          value
          comment
          sometimes
        }
        wikipedia
        image
        external_references {
          type
          reference_url
          reference_html
        }
      }
      html
    }
  }
`;
