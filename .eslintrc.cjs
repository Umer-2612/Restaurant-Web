module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "react-app",
    "plugin:import/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "18.2",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: [
    "react",
    "import",
    "react-hooks",
    "prettier",
    "check-file",
    "react-refresh",
  ],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": "warn",
    "import/no-named-as-default-member": "off",
    "check-file/folder-match-with-fex": [
      "error",
      {
        "*.test.{js,jsx,ts,tsx}": "**/__tests__/",
        "*.styled.{jsx,tsx}": "**/pages/",
      },
    ],
    "check-file/filename-naming-convention": [
      "error",
      {
        "src/assets/**/*.{png,svg}": "KEBAB_CASE",
        "src/store/**/*.{js,ts}": "CAMEL_CASE",
        "src/utils/**/*.{js,ts}": "CAMEL_CASE",
        "src/components/**/*.{jsx,tsx,js,ts}": "PASCAL_CASE",
        "src/context/**/*.{jsx,tsx,js,ts}": "PASCAL_CASE",
        "src/layouts/**/*.{jsx,tsx,js,ts}": "PASCAL_CASE",
        "src/pages/**/*.{jsx,tsx,js,ts}": "PASCAL_CASE",
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/": "KEBAB_CASE",
      },
    ],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-debugger": "warn",
    quotes: ["error", "single"],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "object",
          "type",
          "sibling",
          "parent",
          "internal",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*", "!@mui/material/test-utils/*"],
      },
    ],
  },
};
