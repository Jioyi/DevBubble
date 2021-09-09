import path from 'path';
import rimraf from 'rimraf';
import webpackPaths from '../webpack/webpack.paths.js';

const deleteSourceMaps = () => {
  rimraf.sync(path.join(webpackPaths.distMainPath, '*.js.map'));
  rimraf.sync(path.join(webpackPaths.distRendererPath, '*.js.map'));
}

export default deleteSourceMaps;