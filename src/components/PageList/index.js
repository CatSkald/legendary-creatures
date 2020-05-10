import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import CreaturePage from "../CreaturePage";

const PageList = props => {
  const { creaturesPath } = require("../../utils/url-helpers");

  return (
    <section className={styles.PageList}>
      {props.pages.map(
        ({
          node: {
            frontmatter: { date, description, title, image },
            fields: { slug },
          },
        }) => (
          <CreaturePage
            key={slug}
            slug={`${creaturesPath}/${slug}`}
            date={date}
            title={title}
            description={description}
            image={image}
          />
        ),
      )}
    </section>
  );
};

PageList.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default PageList;
