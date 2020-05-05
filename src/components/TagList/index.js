import styles from "./index.module.scss";

import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import LocalizedLink from "../LocalizedLink";

const TagList = props => {
  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");

  return (
    <section className={styles.TagList}>
      {Object.entries(props.tags).map(([tag, values], tagIndex) => (
        <>
          <LocalizedLink
            className={styles.Tag}
            key={tagIndex + tag}
            to={getTagUrl(tag)}
            navigateOnClick={true}
          >
            {tag}
          </LocalizedLink>
          {values.map((value, index) => (
            <LocalizedLink
              className={styles.TagValue}
              key={`${tagIndex}${tag}_${index}${value}`}
              to={getTagValueUrl(tag, value)}
              navigateOnClick={true}
            >
              {value}
            </LocalizedLink>
          ))}
          <br />
        </>
      ))}
    </section>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const query = graphql`
  query TagValues($locale: String!, $tag: MarkdownRemarkFieldsEnum!) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        frontmatter: { page: { eq: null } }
      }
    ) {
      distinct(field: $tag)
    }
  }
`;

export default TagList;
