const localizedNavigation = require("../i18n/navigation");

exports.parseTags = edges => {
  let tags = {};

  edges.forEach(({ node: { frontmatter } }) => {
    for (const tag in frontmatter) {
      if (!localizedNavigation.tags[tag]) continue;

      let tagValues = frontmatter[tag];
      tagValues = Array.isArray(tagValues) ? tagValues : [tagValues];

      const existingTags = tags[tag];
      if (existingTags) {
        tags[tag] = [...new Set(existingTags.concat(tagValues).filter(x => x))];
      } else {
        tags[tag] = tagValues;
      }
    }
  });

  return tags;
};
