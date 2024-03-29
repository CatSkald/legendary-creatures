module.exports = {
  errorOnDeprecated: true,
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: `http://localhost`,
  },
  transform: {
    "^.+\\.jsx?$": `<rootDir>/__mocks__/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!gatsby|gatsby-script)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/__mocks__/loadershim.js`],
};
