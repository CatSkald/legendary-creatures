import styles from "./index.module.scss";

import React from "react";
import propTypes from "prop-types";
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
  isFirst: propTypes.bool.isRequired,
  isLast: propTypes.bool.isRequired,
  currentPage: propTypes.number.isRequired,
  numPages: propTypes.number.isRequired,
  prevPage: propTypes.string,
  nextPage: propTypes.string,
};

export default Pagination;
