import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import LocalizedLink from "../LocalizedLink";
import useTranslations from "../../i18n/translations/useTranslations";

const TagList = props => {
  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");
  const translations = useTranslations();

  return (
    <section className={styles.TagList}>
      {Object.entries(props.tags).map(([tag, values]) => {
        const localizedTag = translations[tag];

        return (
          <div key={localizedTag} className={styles.TagListItem}>
            <LocalizedLink className={styles.Tag} to={getTagUrl(localizedTag)}>
              {localizedTag}
            </LocalizedLink>
            {values.map((value, index) => (
              <LocalizedLink
                className={styles.TagValue}
                key={`${localizedTag}_${value}${index}`}
                to={getTagValueUrl(localizedTag, value)}
              >
                {value}
              </LocalizedLink>
            ))}
            <br />
          </div>
        );
      })}
    </section>
  );
};

TagList.propTypes = {
  tags: PropTypes.object.isRequired,
};

export default TagList;
