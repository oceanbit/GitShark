/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './rnfs/readAsArrayBuffer';
/**
 * https://github.com/isomorphic-git/isomorphic-git/issues/597#issuecomment-443271254
 */
import * as git from 'isomorphic-git/dist/bundle.umd.min.js';
import {mappedRNFSToIsomorphicGitFS} from './rnfs/rnfs-to-iso-git-fs';

git.plugins.set('fs', mappedRNFSToIsomorphicGitFS);

AppRegistry.registerComponent(appName, () => App);
