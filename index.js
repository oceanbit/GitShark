/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {plugins} from 'isomorphic-git';
import {mappedRNFSToIsomorphicGitFS} from './rnfs-to-iso-git-fs';

plugins.set('fs', mappedRNFSToIsomorphicGitFS);

AppRegistry.registerComponent(appName, () => App);
