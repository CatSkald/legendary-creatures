import "../styles/markdown.scss";

import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import TitlePage from "../components/TitlePage";
import SEO from "../components/seo";

const Page = props => {
  const content = props.data.markdownRemark;

  return (
    <>
      <SEO
        title={content.frontmatter.title}
        description={content.frontmatter.description}
        image={content.frontmatter.image}
      />
      <TitlePage text={content.frontmatter.title} />
      <section className="markdown">
        <div dangerouslySetInnerHTML={{ __html: content.html }}></div>
      </section>
    </>
  );
};

Page.propTypes = {
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

export default Page;

export const query = graphql`
  query Page($locale: String!, $title: String!) {
    markdownRemark(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        description
        image
      }
      html
    }
  }
`;
