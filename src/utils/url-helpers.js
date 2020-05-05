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

exports.getTagUrl = tag => `${tagsPath}#${tag}`;
exports.getTagValueUrl = (tag, value) => `${creaturesPath}?${tag}=${value}`;

exports.getCreaturesUrl = pageIndex =>
  pageIndex === 0 ? creaturesPath : `${creaturesPath}/page/${pageIndex + 1}`;
