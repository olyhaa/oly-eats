module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  env: { browser: true, es6: true },
  globals: {
    __DEV__: false,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    'comma-dangle': 0,
    'brace-style': 'off',
    'generator-star-spacing': 0,
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'max-len': [2, { code: 120, tabWidth: 2, ignoreUrls: true }],
    'no-prototype-builtins': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-undef': 'off',
    'object-curly-newline': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['.svg'],
      },
    ],
  },
};
