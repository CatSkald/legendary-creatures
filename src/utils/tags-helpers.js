exports.parseTags = edges => {
  let tags = {};

  edges.forEach(({ node: { frontmatter } }) => {
    for (const tag in frontmatter) {
      let tagValues = frontmatter[tag];
      tagValues = Array.isArray(tagValues) ? tagValues : [tagValues];

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
