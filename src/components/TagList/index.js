import styles from "./index.module.scss";

import React from "react";
import { navigate, Link } from "gatsby";
import PropTypes from "prop-types";
import { LocaleContext } from "../Layout";

const TagList = props => {
  const { language } = React.useContext(LocaleContext);
  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");

  return (
    <section className={styles.TagList}>
      {Object.entries(props.tags).map(([tag, values], tagIndex) => {
        var tagUrl = getTagUrl(language.path, tag);
        return (
          <>
            <Link
              className={styles.Tag}
              key={tagIndex + tag}
              to={tagUrl}
              hrefLang={language.code}
              onClick={() => navigate(tagUrl)}
            >
              {tag}
            </Link>
            {values.map((value, index) => {
              const url = getTagValueUrl(language.path, tag, value);
              return (
                <Link
                  className={styles.TagValue}
                  key={`${tag}${tagIndex}_${index}${value}`}
                  to={url}
                  hrefLang={language.code}
                  onClick={() => navigate(url)}
                >
                  {value}
                </Link>
              );
            })}
            <br />
          </>
        );
      })}
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
