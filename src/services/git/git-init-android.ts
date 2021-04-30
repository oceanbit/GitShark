import {NativeModules} from 'react-native';
import type {GitInitProps} from './git-init';

export const gitInitAndroid = async ({path}: GitInitProps) => {
  return await NativeModules.GitModule.listRemotes(path);
};
