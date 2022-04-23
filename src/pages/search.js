import React from "react";

import TitlePage from "../components/TitlePage";
import Search from "../components/Search";
import SEO from "../components/seo";
import useTranslations from "../i18n/translations/useTranslations";

const SearchContainer = () => {
  const translations = useTranslations();

  return (
    <>
      <SEO title={translations.Search} />
      <TitlePage text={translations.Search} />
      <Search
        engine="DuckDuckGo"
        queryTemplate="https://duckduckgo.com/?q=site%3Alegendary-creatures.github.io+"
      />
    </>
  );
};

export default SearchContainer;
