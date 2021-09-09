const path = require('path');
const webpackPaths = require('../webpack/webpack.paths.js');

require('@babel/register')({
	extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
	cwd: webpackPaths.rootPath,
});
