import {Platform} from 'react-native';
import {getRepoStatusAndroid} from './status-android';
import {logService, NotImplemented} from '../debug';

export interface ChangesArrayItem {
  fileName: string;
  staged: boolean;
  unstagedChanges: boolean;
  fileStatus: 'unmodified' | 'added' | 'deleted' | 'modified' | 'conflicted';
}

export const getRepoStatus = async (path: string) => {
  logService && console.log('service - getRepoStatus');

  if (Platform.OS === 'android') {
    return getRepoStatusAndroid(path);
  }

  throw new NotImplemented('getRepoStatus');
};
