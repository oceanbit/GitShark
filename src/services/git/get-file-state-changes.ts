import {ChangesArrayItem} from '@services/git/status';
import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {getFileStateChangesAndroid} from './getFileStateChanges.android';

export const getFileStateChanges = async (
  commitHash1: string,
  commitHash2: string,
  dir: string,
): Promise<ChangesArrayItem[]> => {
  logService && console.log('service - getFileStateChanges');

  if (Platform.OS === 'android') {
    return await getFileStateChangesAndroid(commitHash1, commitHash2, dir);
  }

  throw new NotImplemented('getFileStateChanges');
};
