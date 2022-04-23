import { searchInput, searchButton } from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";

import useTranslations from "../../i18n/translations/useTranslations";

const Search = ({ searchEngine, queryTemplate }) => {
  const createSearchQuery = (term) => `${queryTemplate}${term}`;
  const translations = useTranslations();

  const [searchQuery, onChangeSearchQuery] = React.useState(
    createSearchQuery(""),
  );

  const handleOnKeyDown = (e) => {
    if (searchQuery && e.key === "Enter") {
      window.location.assign(searchQuery);
      return false;
    }
  };
  return (
    <>
      <label>
        {translations.SearchUsing} {searchEngine}:
        <input
          className={searchInput}
          type="search"
          name="q"
          autoFocus
          onChange={(e) =>
            onChangeSearchQuery(createSearchQuery(e.target.value))
          }
          onKeyPress={handleOnKeyDown}
        />
      </label>
      <a className={searchButton} href={searchQuery}>
        {translations.Search}
      </a>
    </>
  );
};

Search.propTypes = {
  searchEngine: PropTypes.string.isRequired,
  queryTemplate: PropTypes.string.isRequired,
};

export default Search;
