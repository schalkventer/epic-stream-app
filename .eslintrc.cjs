module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier"],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",

    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",

    "airbnb",
    "prettier",
  ],

  rules: {
    // Automatically added by Vite configuration.
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    // React object is not required to be in scope when using Vite
    "react/react-in-jsx-scope": "off",

    // Disables strict EOL rule since Git automatically does conversion before
    // committing and/or pushing code
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],

    // Rules below is purely personal preference and has no bearing on the
    // code/logic itself.

    // Use arrow functions across entire code-base to prevent having to consider
    // `this` binding.
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
};
