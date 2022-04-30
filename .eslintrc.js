module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:jsx-a11y/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
    "jest/globals": true,
  },
  globals: {
    graphql: "writable",
    __PATH_PREFIX__: "writable",
    __TRAILING_SLASH__: "writable",
    __BASE_PATH__: "writable",
  },
  plugins: ["prettier", "graphql"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "react/prop-types": [0],
    "no-irregular-whitespace": [
      "error",
      { skipComments: true, skipTemplates: true },
    ],
  },
  ignorePatterns: ["public/", ".cache/", "node_modules/"],
};
