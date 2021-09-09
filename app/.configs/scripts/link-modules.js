import fs from 'fs';
import {
  appNodeModulesPath,
  srcNodeModulesPath,
} from '../webpack/webpack.paths.js';

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath);
}
