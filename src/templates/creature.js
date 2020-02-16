import "../styles/markdown.scss";

import React from "react";
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

export const query = graphql`
  query Creature($locale: String!, $title: String!) {
    markdownRemark(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        plural
        names {
          name
          plural
          language
        }
        description
        folklore
        origin
        categories
        number
        habitat
        wikipedia
        image
      }
      html
    }
  }
`;

export default Creature;
