const localizedNavigation = require("../i18n/navigation");
const { noTag } = require("../configuration");

exports.parseTags = edges => {
  let tags = {};

  edges.forEach(({ node: { frontmatter } }) => {
    for (const tag in frontmatter) {
      if (!localizedNavigation.tags[tag]) continue;

      let tagValues = frontmatter[tag];
      if (!tagValues) continue;

      tagValues = Array.isArray(tagValues)
        ? tagValues.map(v => v.value)
        : [tagValues.value];
      tagValues = tagValues.filter(value => value !== noTag);
      if (tagValues.length === 0) continue;

      const existingTags = tags[tag];
      if (existingTags) {
        tags[tag] = [...new Set(existingTags.concat(tagValues))];
      } else {
        tags[tag] = tagValues;
      }
    }
  });

  return tags;
};
