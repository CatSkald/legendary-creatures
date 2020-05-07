exports.getImageNameOrDefaultCover = imagePath =>
  imagePath
    ? imagePath.slice(imagePath.lastIndexOf("/") + 1, imagePath.length)
    : "cover.jpg";
