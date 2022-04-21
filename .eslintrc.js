module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
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
  plugins: ["react", "prettier", "jest"],
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
    "prettier/prettier": "error",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
};
