import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import LocalizedLink from "../LocalizedLink";

const TagList = props => {
  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");

  return (
    <section className={styles.TagList}>
      {Object.entries(props.tags).map(([tag, values]) => (
        <div key={tag} className={styles.TagListItem}>
          <LocalizedLink className={styles.Tag} to={getTagUrl(tag)}>
            {tag}
          </LocalizedLink>
          {values.map((value, index) => (
            <LocalizedLink
              className={styles.TagValue}
              key={`${tag}_${value}${index}`}
              to={getTagValueUrl(tag, value)}
            >
              {value}
            </LocalizedLink>
          ))}
          <br />
        </div>
      ))}
    </section>
  );
};

TagList.propTypes = {
  tags: PropTypes.object.isRequired,
};

export default TagList;
