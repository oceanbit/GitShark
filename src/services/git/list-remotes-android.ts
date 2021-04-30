import {NativeModules} from 'react-native';
import type {ListRemotesProps} from './list-remotes';

export const listRemotesAndroid = async ({path}: ListRemotesProps) => {
  return await NativeModules.GitModule.listRemotes(path);
};
