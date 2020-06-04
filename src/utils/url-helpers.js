const tagsPath = "/tags";
const creaturesPath = "/creatures";
const searchPath = creaturesPath + "/search";

const pagePath = pageIndex => (pageIndex >= 1 ? `/${pageIndex}` : "");

exports.tagsPath = tagsPath;
exports.creaturesPath = creaturesPath;

exports.localizedSlug = ({ isDefault, locale, slug, isPage }) => {
  if (isPage) {
    return isDefault ? `/${slug}` : `/${locale}/${slug}`;
  }

  return isDefault
    ? `${creaturesPath}/${slug}`
    : `/${locale + creaturesPath}/${slug}`;
};

exports.getTagUrl = tag => `${tagsPath}#${tag}`;

exports.getTagValueUrl = (tag, value, pageIndex) => {
  const url = `${searchPath}/${tag.toLowerCase()}/${value.toLowerCase()}`;
  return url + pagePath(pageIndex);
};

exports.getCreatureUrl = creatureName => {
  return `${creaturesPath}/${creatureName}`;
};

exports.getCreaturesUrl = pageIndex => {
  return creaturesPath + pagePath(pageIndex);
};
