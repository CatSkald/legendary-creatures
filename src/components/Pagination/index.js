import { pagination } from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import LocalizedLink from "../LocalizedLink";
import useTranslations from "../../i18n/translations/useTranslations";

const Pagination = (props) => {
  const translations = useTranslations();

  const current = props.currentPage + 1;
  const isFirst = current === 1;
  const isLast = current === props.numPages;

  return (
    <div className={pagination}>
      <p>
        {!isFirst && (
          <LocalizedLink to={props.prevPage}>
            ← {translations.Prev}
          </LocalizedLink>
        )}
      </p>
      <p>
        {current} {translations.of} {props.numPages}
      </p>
      <p>
        {!isLast && (
          <LocalizedLink to={props.nextPage}>
            {translations.Next} →
          </LocalizedLink>
        )}
      </p>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  prevPage: PropTypes.string,
  nextPage: PropTypes.string,
};

export default Pagination;
