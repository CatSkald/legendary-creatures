const localizedNavigation = require("../i18n/navigation");
const path = require("path");

const pagePath = pageIndex => (pageIndex >= 1 ? `/${pageIndex}` : "");

const getTagsPath = languageCode =>
  localizedNavigation.pages.tags[languageCode].path;
const getCreaturesPath = languageCode =>
  localizedNavigation.pages.creatures[languageCode].path;
const getSearchPath = languageCode =>
  localizedNavigation.pages.search[languageCode].path;

const removeSpecialCharacters = s => s.replace(/\s/g, "");

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
  `${getTagsPath(languageCode)}#${removeSpecialCharacters(tag)}`;

exports.getTagValueUrl = (tag, value, languageCode, pageIndex) => {
  if (!tag || !value) return null;
  const url = `${getSearchPath(languageCode)}/${removeSpecialCharacters(
    tag,
  ).toLowerCase()}/${removeSpecialCharacters(value).toLowerCase()}`;
  return url + pagePath(pageIndex);
};

exports.getCreatureUrl = (creatureName, languageCode) => {
  return `${getCreaturesPath(languageCode)}/${removeSpecialCharacters(
    creatureName,
  )}`;
};

exports.getCreaturesUrl = (pageIndex, languageCode) => {
  return getCreaturesPath(languageCode) + pagePath(pageIndex);
};

exports.getNameFromPath = value => {
  const nameWithLanguage = path.basename(value, ".md");
  const name = nameWithLanguage.slice(0, -3); //".en".length = 3
  const language = nameWithLanguage.slice(-2); //"en".length = 2

  return {
    name,
    language,
  };
};
