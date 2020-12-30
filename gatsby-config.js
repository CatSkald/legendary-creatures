module.exports = {
  siteMetadata: {
    title: `Legendary Creatures and Fabulous Beasts`,
    description: `An encyclopaedia of creatures originating from the folklore, legends, mythos`,
    author: `CatSkald`,
    siteUrl: `https://legendary-creatures.github.io`,
  },
  pathPrefix: "/legendary-creatures",
  plugins: [
    {
      // always load static before other loading others
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/images`,
        name: `image-assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/i18n/translations`,
        name: `translations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/creatures`,
        name: `creatures`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/pages`,
        name: `pages`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // this must precede gatsby-remark-images
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth in pixels of the content container is used
              // as the base for generating different widths of each image
              maxWidth: 1040,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-lazy-load`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: true,
            },
          },
          `gatsby-remark-prismjs`, // It needs to be the last one
        ],
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ["Open Sans:400,600,700"],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Legendary Creatures and Fabulous Beasts`,
        short_name: `Legendary Creatures`,
        start_url: `/`,
        background_color: `#16202c`,
        theme_color: `#16202c`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // relative to the website root
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          localIdentName: "[hash:base64:5]",
        },
      },
    },
    `gatsby-plugin-catch-links`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
