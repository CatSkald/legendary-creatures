import { useStaticQuery, graphql } from "gatsby";

export const useImages = () => {
  const { listImages } = useStaticQuery(
    graphql`
      query {
        listImages: allFile(
          filter: { sourceInstanceName: { eq: "image-assets" } }
        ) {
          edges {
            node {
              childImageSharp {
                previewImage: fluid {
                  ...GatsbyImageSharpFluid
                }
                fluidImage: fluid(fit: INSIDE) {
                  src
                  originalName
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
              }
            }
          }
        }
      }
    `,
  );
  return listImages.edges.map(edge => ({
    src: edge.node.childImageSharp.fluidImage.src,
    originalName: edge.node.childImageSharp.fluidImage.originalName,
    preview: edge.node.childImageSharp.previewImage,
    fluid: edge.node.childImageSharp.fluidImage,
  }));
};
