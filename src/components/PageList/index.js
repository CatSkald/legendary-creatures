import { pageList } from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import CreaturePage from "../CreaturePage";
import { LocaleContext } from "../Layout";
import { getCreaturesPath } from "../../utils/url-helpers";

const PageList = (props) => {
  const { language } = React.useContext(LocaleContext);

  return (
    <section className={pageList}>
      {props.pages.map(
        ({
          node: {
            frontmatter: { date, description, title, image },
            fields: { slug },
          },
        }) => (
          <CreaturePage
            key={slug}
            slug={`${getCreaturesPath(language.code)}/${slug}`}
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
