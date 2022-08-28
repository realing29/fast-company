module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: [2, "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "always",
        asyncArrow: "always",
      },
    ],
    "multiline-ternary": ["off"],
    indent: ["off"],
    quotes: [2, "double", { avoidEscape: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "comma-dangle": [2, "always-multiline"],
  },
};
