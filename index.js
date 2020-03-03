/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './patch-FileReader';

AppRegistry.registerComponent(appName, () => App);
