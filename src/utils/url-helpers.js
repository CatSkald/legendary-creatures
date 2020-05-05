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

function getTagUrl(tag) {
  return `${tagsPath}/${tag}`;
}

exports.getTagUrl = getTagUrl;

exports.getTagValueUrl = (tag, value) => {
  const tagUrl = getTagUrl(tag);

  return `${tagUrl}/${value}`;
};

exports.getCreaturesUrl = pageIndex => {
  return pageIndex === 0
    ? creaturesPath
    : `${creaturesPath}/page/${pageIndex + 1}`;
};
