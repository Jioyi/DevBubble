/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import webpackPaths from './webpack.paths.js';
import { dependencies as externals } from '../../build/app/package.json';
const Dotenv = require('dotenv-webpack');

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    library: {
      type: 'commonjs2',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    /*fallback: {
      fs: false,
    },*/
    alias: {
      process: 'process/browser',
    },
  },
  plugins: [
    new Dotenv(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.ExternalsPlugin('commonjs', ['electron']),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  externals: {
    electron: 'electron',
  },
};
