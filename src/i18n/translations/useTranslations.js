import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { LocaleContext } from "../../components/Layout";

function useTranslations() {
  const { language } = React.useContext(LocaleContext);
  const { rawData } = useStaticQuery(queryTranslations);

  const translationsForCurrentLocale = rawData.edges
    .filter(item => item.node.name === language.code)
    .map(item => item.node.translations)[0];

  return translationsForCurrentLocale;
}

export default useTranslations;

const queryTranslations = graphql`
  query queryTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsYaml {
            Description
            Title
            ShortTitle
            footerMoto
            by
            for
            fromPerson
            fromPlace
            of
            View
            all
            orSearchBy
            tags
            All
            Home
            Latest
            Next
            Prev
            Tags
            plural
            CreaturesPageTitle
            TagsPageTitle
            related
            origin
            taxonomy
            shapeshifting
            activityTime
            voice
            character
            appearance
            clothes
            paraphernalia
            number
            habitat
            sometimes
          }
        }
      }
    }
  }
`;
