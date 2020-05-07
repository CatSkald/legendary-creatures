import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import LocalizedLink from "../LocalizedLink";
import useTranslations from "../../i18n/translations/useTranslations";

const Pagination = props => {
  const translations = useTranslations();

  return (
    <ul className={styles.PaginationContainer}>
      <li>
        {!props.isFirst && (
          <LocalizedLink to={props.prevPage}>
            ← {translations.Prev}
          </LocalizedLink>
        )}
      </li>
      <p>
        {props.currentPage} {translations.of} {props.numPages}
      </p>
      <li>
        {!props.isLast && (
          <LocalizedLink to={props.nextPage}>
            {translations.Next} →
          </LocalizedLink>
        )}
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  prevPage: PropTypes.string,
  nextPage: PropTypes.string,
};

export default Pagination;
