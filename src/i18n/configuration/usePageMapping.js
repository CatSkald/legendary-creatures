import { useStaticQuery, graphql } from "gatsby";

function usePageMapping(url) {
  const { rawData } = useStaticQuery(queryPageMapping);

  const pageMapping = rawData.edges.map(
    item => item.node.translations.pageMapping,
  )[0];

  return pageMapping;
}

export default usePageMapping;

const queryPageMapping = graphql`
  query queryPageMapping {
    rawData: allFile(
      filter: {
        sourceInstanceName: { eq: "i18n-configuration" }
        name: { eq: "page-mapping" }
      }
    ) {
      edges {
        node {
          name
          translations: childConfigurationYaml {
            pageMapping {
              en
              ru
              uk
            }
          }
        }
      }
    }
  }
`;
