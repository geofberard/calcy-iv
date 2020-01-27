module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/jsx-filename-extension": [1, {
      "extensions": [".jsx", ".tsx"]
    }],
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    "import/extensions": ["error", {
      ".ts": "never" | "always" | "ignorePackages",
      ".tsx": "never" | "always" | "ignorePackages",
    }],
    "implicit-arrow-linebreak": "off",
    "max-len": ["error", 130],
    "quotes": ["error", "double"],
    "arrow-parens": ["error", "as-needed"],
    "import/prefer-default-export" : "off",
    "operator-linebreak" : ["error", "after", { "overrides": { "=": "after" } }],
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".d.ts"]
      }
    }
  },
};
