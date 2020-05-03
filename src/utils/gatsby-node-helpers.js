exports.localizedSlug = ({ isDefault, locale, slug, isPage }) => {
  if (isPage) {
    return isDefault ? `/${slug}` : `/${locale}/${slug}`;
  }

  return isDefault
    ? `/creatures/${slug}`
    : `/${locale}/creatures/${slug}`;
};
