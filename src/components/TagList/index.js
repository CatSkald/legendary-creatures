import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import LocalizedLink from "../LocalizedLink";
import { LocaleContext } from "../Layout";
import useTranslations from "../../i18n/translations/useTranslations";

const TagList = props => {
  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");
  const { localizedSort } = require("../../utils/array-helpers");
  const translations = useTranslations();
  const { language } = React.useContext(LocaleContext);

  const getSortedTags = tags =>
    localizedSort(
      Object.entries(tags).map(([tag, values]) => ({
        tag: translations[tag],
        values: localizedSort(values, language.code),
      })),
      language.code,
      x => x.tag,
    );

  return (
    <section className={styles.TagList}>
      {getSortedTags(props.tags).map(({ tag, values }) => {
        return (
          <div key={tag} className={styles.TagListItem}>
            <LocalizedLink
              className={styles.Tag}
              to={getTagUrl(tag, language.code)}
            >
              {tag}
            </LocalizedLink>
            {values.map((value, index) => (
              <LocalizedLink
                className={styles.TagValue}
                key={`${tag}_${value}${index}`}
                to={getTagValueUrl(tag, value, language.code)}
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
