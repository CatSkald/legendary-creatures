const tagsPath = "/tags";
const creaturesPath = "/creatures";
const searchPath = creaturesPath + "/search";

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
  const paginationPath = pageIndex ? `/${pageIndex + 1}` : "";
  return url + paginationPath;
};

exports.getCreatureUrl = creatureName => {
  return `${creaturesPath}/${creatureName}`;
};

exports.getCreaturesUrl = pageIndex => {
  const paginationPath = pageIndex ? `/${pageIndex + 1}` : "";
  return creaturesPath + paginationPath;
};
