const localizedNavigation = require("../i18n/navigation");

const pagePath = pageIndex => (pageIndex >= 1 ? `/${pageIndex}` : "");

const getTagsPath = languageCode =>
  localizedNavigation.pages.tags[languageCode].path;
const getCreaturesPath = languageCode =>
  localizedNavigation.pages.creatures[languageCode].path;
const getSearchPath = languageCode =>
  localizedNavigation.pages.search[languageCode].path;

exports.getTagsPath = getTagsPath;
exports.getCreaturesPath = getCreaturesPath;
exports.getSearchPath = getSearchPath;

exports.localizedSlug = ({ isDefault, locale, slug, isPage }) => {
  if (isPage) {
    return isDefault ? `/${slug}` : `/${locale}/${slug}`;
  }

  const creaturesPath = getCreaturesPath(locale);

  return isDefault
    ? `${creaturesPath}/${slug}`
    : `/${locale + creaturesPath}/${slug}`;
};

exports.getTagUrl = (tag, languageCode) =>
  `${getTagsPath(languageCode)}#${tag}`;

exports.getTagValueUrl = (tag, value, languageCode, pageIndex) => {
  if (!tag || !value) return null;
  const url = `${getSearchPath(
    languageCode,
  )}/${tag.toLowerCase()}/${value.toLowerCase()}`;
  return url + pagePath(pageIndex);
};

exports.getCreatureUrl = (creatureName, languageCode) => {
  return `${getCreaturesPath(languageCode)}/${creatureName}`;
};

exports.getCreaturesUrl = (pageIndex, languageCode) => {
  return getCreaturesPath(languageCode) + pagePath(pageIndex);
};
