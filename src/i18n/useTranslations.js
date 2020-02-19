import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { LocaleContext } from "../components/Layout";

function useTranslations() {
  const { locale } = React.useContext(LocaleContext);
  const { rawData } = useStaticQuery(queryTranslations);

  const translationsForCurrentLocale = rawData.edges
    .filter(item => item.node.name === locale)
    .map(item => item.node.translations)[0];

  return translationsForCurrentLocale;
}

export default useTranslations;

const queryTranslations = graphql`
  query queryTranslations {
    rawData: allFile(
      filter: { sourceInstanceName: { eq: "translations" } }
    ) {
      edges {
        node {
          name
          translations: childTranslationsYaml {
            Description
            Title
            NotFound404Header
            NotFound404Content
            footerMoto
            Icon
            by
            for
            fromPerson
            fromPlace
            of
            using
            Categories
            All
            Home
            Latest
            Next
            Prev
            Tags
            plural
            Number
            Origin
            Habitat
          }
        }
      }
    }
  }
`;
