exports.getImageNameOrDefaultCover = (imagePath) =>
  imagePath ? imagePath.split("\\").pop().split("/").pop() : "cover.jpg";
