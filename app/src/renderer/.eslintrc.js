module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  rules: {
    'react/prop-types': 'off',
  },
  // allow jsx syntax in js files (for next.js project)
};
