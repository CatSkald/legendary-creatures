import { useStaticQuery, graphql } from "gatsby";

export const useImages = () => {
  const { listImages } = useStaticQuery(
    graphql`
      {
        listImages: allFile(
          filter: { sourceInstanceName: { eq: "image-assets" } }
        ) {
          edges {
            node {
              childImageSharp {
                image: gatsbyImageData(layout: CONSTRAINED)
                metadata: parent {
                  ... on File {
                    relativePath
                  }
                }
              }
            }
          }
        }
      }
    `,
  );
  return listImages.edges.map((edge) => ({
    name: edge.node.childImageSharp.metadata.relativePath,
    image: edge.node.childImageSharp.image,
  }));
};
