module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'linebreak-style': 'off',
    'no-throw-literal': 'off',
  },
};
