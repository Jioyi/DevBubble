module.exports = {
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
};
