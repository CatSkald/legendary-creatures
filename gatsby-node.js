const path = require("path");
const languages = require("./src/i18n/languages");
const localizedNavigation = require("./src/i18n/navigation");
const {
  getTagsPath,
  getCreatureUrl,
  getCreaturesUrl,
  getTagValueUrl,
  localizedSlug,
} = require("./src/utils/url-helpers");
const { parseTags } = require("./src/utils/tags-helpers");
const configuration = require("./src/configuration");
const { supportedTags } = require("./src/i18n/navigation");

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Delete the page autogenerated by Gatsby
  deletePage(page);

  Object.entries(languages).map(([lang, langProps]) => {
    const localizedPath = langProps.path + page.path;

    return createPage({
      ...page, // original page
      path: localizedPath,
      context: {
        ...page.context,
        language: langProps,
        locale: lang,
        dateFormat: langProps.dateFormat,
        limit: configuration.creaturesPerPage,
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
    const language = name.slice(-2); //"en".length = 2
    const isDefault =
      language &&
      languages[language] &&
      languages[language].code === configuration.defaultLanguage;

    createNodeField({ node, name: "slug", value: slug });
    createNodeField({ node, name: "locale", value: language });
    createNodeField({ node, name: "isDefault", value: isDefault });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const creatureTemplate = path.resolve("./src/templates/creature.js");
  const creatureListTemplate = path.resolve("./src/templates/creatures.js");
  const pageTemplate = path.resolve("./src/templates/page.js");
  const tagListTemplate = path.resolve("./src/templates/tags.js");

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
              description
              path
              id
              page
              origin {
                value
                comment
                sometimes
              }
              taxonomy {
                value
                comment
                sometimes
              }
              shapeshifting {
                value
                comment
                sometimes
              }
              activityTime {
                value
                comment
                sometimes
              }
              voice {
                value
                comment
                sometimes
              }
              character {
                value
                comment
                sometimes
              }
              appearance {
                value
                comment
                sometimes
              }
              clothes {
                value
                comment
                sometimes
              }
              paraphernalia {
                value
                comment
                sometimes
              }
              number {
                value
                comment
                sometimes
              }
              habitat {
                value
                comment
                sometimes
              }
              wikipedia
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
  const tags = parseTags(pageContentFromMarkdown);
  const getLocalizedLinks = (id, isPage) => {
    let localizedLinks = {};
    pageContentFromMarkdown
      .filter(({ node: page }) => page.frontmatter.id === id)
      .forEach(({ node: page }) => {
        const path = page.frontmatter.path || page.fields.slug;
        localizedLinks[page.fields.locale] = {
          path: isPage ? path : getCreatureUrl(path, page.fields.locale),
        };
      });
    return localizedLinks;
  };

  pageContentFromMarkdown.forEach(({ node: file }) => {
    const slug = file.fields.slug;
    const id = file.frontmatter.id;

    //fields created in exports.onCreateNode
    const locale = file.fields.locale;
    const isDefault = file.fields.isDefault;

    const isPage = file.frontmatter.page; //only pages should have this field set
    const template = isPage ? pageTemplate : creatureTemplate;

    createPage({
      path: localizedSlug({ isDefault, locale, slug, isPage }),
      component: template,
      context: {
        language: languages[locale],
        locale: locale,
        id: id,
        localizedLinks: getLocalizedLinks(id, isPage),
      },
    });
  });

  function createPaginatedPages(
    totalItems,
    language,
    getUrl,
    template,
    localizedLinks,
    context = {},
  ) {
    const pageCount = Math.ceil(totalItems / configuration.creaturesPerPage);

    Array.from({ length: pageCount }).forEach((_, index) => {
      const pageContext = {
        limit: configuration.creaturesPerPage,
        skip: index * configuration.creaturesPerPage,
        numPages: pageCount,
        currentPage: index,
        language: language,
        locale: language.code,
        dateFormat: language.dateFormat,
        localizedLinks: localizedLinks,
      };

      supportedTags.forEach(tagName => {
        if (context[tagName]) pageContext[tagName] = context[tagName];
      });

      createPage({
        path: language.path + getUrl(index),
        component: template,
        context: pageContext,
      });
    });
  }

  Object.entries(languages).forEach(([lang, langProps]) => {
    //create tags list
    createPage({
      path: langProps.path + getTagsPath(langProps.code),
      component: tagListTemplate,
      context: {
        language: langProps,
        locale: lang,
        localizedLinks: localizedNavigation.pages.tags,
      },
    });

    //create paginated creatures list
    const creaturePagesCount = pageContentFromMarkdown.filter(
      page => !page.node.frontmatter.page && page.node.fields.locale === lang,
    ).length;

    createPaginatedPages(
      creaturePagesCount,
      langProps,
      index => getCreaturesUrl(index, lang),
      creatureListTemplate,
      localizedNavigation.pages.creatures,
    );

    //create paginated tag search results
    Object.entries(tags).forEach(([tag, values]) => {
      if (values && values.length > 0) {
        values.forEach(value => {
          if (!value) return;

          const creaturePagesCount = pageContentFromMarkdown.filter(page => {
            if (
              page.node.fields.locale === lang &&
              page.node.frontmatter[tag]
            ) {
              const tagValue = page.node.frontmatter[tag];
              return Array.isArray(tagValue)
                ? tagValue.some(x => x.value === value)
                : tagValue.value === value;
            }

            return false;
          }).length;

          const tagName = localizedNavigation.tags[tag][lang];
          const context = {};
          context[tag] = value;

          createPaginatedPages(
            creaturePagesCount,
            langProps,
            pageIndex =>
              getTagValueUrl(tagName, value, langProps.code, pageIndex),
            creatureListTemplate,
            localizedNavigation.pages.tags,
            context,
          );
        });
      }
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const categoryType = name => ({
    type: "[Category!]",
    resolve: source => source[name] || [{ value: configuration.noTag }],
  });
  const pageFields = {
    //all
    title: { type: "String!" },
    description: { type: "String!" },
    id: "String!",
    //pages
    path: "String",
    page: "Boolean",
    //creatures
    names: { type: "[Name!]" },
    map: { type: "String" },
    related: { type: "[String!]" },
    wikipedia: { type: "String" },
    date: {
      type: "Date",
      extensions: { dateformat: {} },
    },
  };

  //add tags to the fields
  supportedTags.forEach(
    tagName => (pageFields[tagName] = categoryType(tagName)),
  );

  const typeDefs = [
    schema.buildObjectType({
      name: "MarkdownRemark",
      fields: { frontmatter: "Frontmatter!" },
      interfaces: ["Node"],
      extensions: { infer: true },
    }),
    schema.buildObjectType({
      name: "Frontmatter",
      fields: pageFields,
    }),
    schema.buildObjectType({
      name: "Name",
      fields: {
        name: { type: "String!" },
        plural: { type: "String" },
        language: { type: "String!" },
        origin: { type: "String" },
      },
    }),
    schema.buildObjectType({
      name: "Category",
      fields: {
        value: { type: "String!" },
        comment: { type: "String" },
        sometimes: {
          type: "Boolean",
          resolve: source => source.sometimes || false,
        },
      },
    }),
  ];
  createTypes(typeDefs);
};
