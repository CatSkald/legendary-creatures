exports.localizedSlug = ({ isDefault, locale, slug, isPage }) => {
  if (isPage) {
    return isDefault ? `/${slug}` : `/${locale}/${slug}`;
  }

  return isDefault ? `/creatures/${slug}` : `/${locale}/creatures/${slug}`;
};

const tagsPath = "/tags";
const creaturesPath = "/creatures";
exports.tagsPath = tagsPath;
exports.creaturesPath = creaturesPath;

function getTagUrl(languagePath, tag) {
  return `${languagePath + tagsPath}/${tag}`;
}

exports.getTagUrl = getTagUrl;

exports.getTagValueUrl = (languagePath, tag, value) => {
  const tagUrl = getTagUrl(languagePath, tag);

  return `${tagUrl}/${value}`;
};

exports.getCreaturesUrl = (languagePath, pageIndex) => {
  const localizedPath = languagePath + creaturesPath;

  return pageIndex === 0
    ? localizedPath
    : `${localizedPath}/page/${pageIndex + 1}`;
};
