import { useStaticQuery, graphql } from "gatsby";

export const useImages = () => {
  const { listImages } = useStaticQuery(
    graphql`
      query {
        listImages: allFile(
          filter: { childImageSharp: { fluid: { originalName: { ne: null } } } }
        ) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 350) {
                  src
                  originalName
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `,
  );
  return listImages.edges.map(edge => edge.node.childImageSharp.fluid);
};
