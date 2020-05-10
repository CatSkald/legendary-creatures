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

exports.getTagValueUrl = (tag, value, pageIndex) => {
  const url = `${creaturesPath}/search/${tag.toLowerCase()}/${value.toLowerCase()}`;
  const paginationPath = pageIndex ? `/page/${pageIndex + 1}` : "";
  return url + paginationPath;
};

exports.getCreaturesUrl = pageIndex => {
  const paginationPath = pageIndex ? `/page/${pageIndex + 1}` : "";
  return creaturesPath + paginationPath;
};
