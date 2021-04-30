import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {gitInitAndroid} from './git-init-android';

export interface GitInitProps {
  path: string;
}
export const gitInit = async ({path}: GitInitProps) => {
  logService && console.log('service - gitInit');

  if (Platform.OS === 'android') {
    return await gitInitAndroid({
      path,
    });
  }

  throw new NotImplemented('gitInit');
};
