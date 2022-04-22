import { getImageNameOrDefaultCover } from "./image-helpers";

describe("getImageNameOrDefaultCover", () => {
  test.each([null, undefined, ""])(
    "returns default when path is missing ('%s')",
    (path) => {
      const actual = getImageNameOrDefaultCover(path);

      expect(actual).toBe("cover.jpg");
    },
  );

  test.each([
    ["file.png", "/folder/file.png"],
    ["file", "folder1\\folder 2\\file"],
    ["x.jpg", "folder1\\folder 2/f3\\x.jpg"],
    ["x.y", "x.y"],
  ])("extracts file name %s from path %s", (fileName, path) => {
    const actual = getImageNameOrDefaultCover(path);

    expect(actual).toBe(fileName);
  });
});
