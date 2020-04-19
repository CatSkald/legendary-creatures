const path = require("path");
const locales = require("./src/i18n/locales");
const { localizedSlug } = require("./src/utils/gatsby-node-helpers");

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Delete the page autogenerated by Gatsby
  deletePage(page);

  Object.entries(locales).map(([lang, langProps]) => {
    const localizedPath = langProps.default
      ? page.path
      : langProps.path + page.path;

    return createPage({
      ...page, // original page
      path: localizedPath,
      context: {
        ...page.context,
        locale: lang,
        dateFormat: langProps.dateFormat,
      },
    });
  });
};

// Correcting language and slug to the frontmatter of each file
// A new node is created automatically with the filename
// It's necessary to do that to filter by language
// And the slug make sure the urls will be the same for all pages
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  var isMarkdownFile = node.internal.type === "MarkdownRemark";
  if (isMarkdownFile) {
    // Expected format of node.fileAbsolutePath is
    // "path/filename.en.md" where "en" is language code
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    const name = path.basename(node.fileAbsolutePath, ".md");
    const slug = name.slice(0, -3); //".en".length = 3
    const lang = name.slice(-2); //"en".length = 2
    const isDefault = lang && locales[lang].default;

    createNodeField({ node, name: "slug", value: slug });
    createNodeField({ node, name: "locale", value: lang });
    createNodeField({ node, name: "isDefault", value: isDefault });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const creatureTemplate = path.resolve(
    "./src/templates/creature.js",
  );
  const creatureListTemplate = path.resolve(
    "./src/templates/creatures.js",
  );
  const pageTemplate = path.resolve("./src/templates/page.js");

  const result = await graphql(`
    {
      files: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              locale
              isDefault
              slug
            }
            frontmatter {
              title
              page
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    return;
  }

  const pageContentFromMarkdown = result.data.files.edges;

  let countOfCreaturePages = {};

  pageContentFromMarkdown.forEach(({ node: file }) => {
    const slug = file.fields.slug;
    const title = file.frontmatter.title;
    // Use the fields created in exports.onCreateNode
    const locale = file.fields.locale;
    const isDefault = file.fields.isDefault;

    // Only pages should have that field set
    const isPage = file.frontmatter.page;

    const template = isPage ? pageTemplate : creatureTemplate;

    if (!isPage) {
      countOfCreaturePages[locale] = countOfCreaturePages[locale]
        ? countOfCreaturePages[locale] + 1
        : 1;
    }

    createPage({
      path: localizedSlug({ isDefault, locale, slug, isPage }),
      component: template,
      context: { locale, title },
    });
  });

  // Create list with pagination
  const itemsPerPage = 4;

  Object.entries(locales).map(([lang, langProps]) => {
    const listSize = countOfCreaturePages[lang] || 0;
    const pageCount = Math.ceil(listSize / itemsPerPage);

    // Use the values defined in "locales" to construct the path
    const localizedPath = langProps.default
      ? "/creatures"
      : langProps.path + "/creatures";

    return Array.from({ length: pageCount }).forEach((_, index) => {
      createPage({
        path:
          index === 0
            ? localizedPath
            : `${localizedPath}/page/${index + 1}`,
        component: creatureListTemplate,
        context: {
          limit: itemsPerPage,
          skip: index * itemsPerPage,
          numPages: pageCount,
          currentPage: index + 1,
          locale: lang,
          dateFormat: langProps.dateFormat,
        },
      });
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: "MarkdownRemark",
      fields: { frontmatter: "Frontmatter!" },
      interfaces: ["Node"],
      extensions: { infer: true },
    }),
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        title: { type: "String!" },
        names: { type: "[Name!]" },
        description: { type: "String!" },
        categories: { type: "[String!]!" },
        origin: { type: "[String!]" },
        map: { type: "String" },
        related: { type: "[Frontmatter!]" },
        number: { type: "String" },
        habitat: { type: "[String!]" },
        wikipedia: { type: "String" },
        date: {
          type: "Date!",
          extensions: { dateformat: {} },
        },
        page: "Boolean",
      },
    }),
    schema.buildObjectType({
      name: "Name",
      fields: {
        name: { type: "String!" },
        plural: { type: "String!" },
        language: { type: "String!" },
      },
    }),
  ];
  createTypes(typeDefs);
};
