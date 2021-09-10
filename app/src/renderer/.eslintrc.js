module.exports = {
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': [2, { functions: true, classes: true }],
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
