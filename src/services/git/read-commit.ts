import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {readCommitAndroid} from './readCommit.android';

export interface ReadCommitProps {
  oid: string;
  path: string;
}

export const readCommit = async ({path, oid}: ReadCommitProps) => {
  logService && console.log('service - readCommit');

  if (Platform.OS === 'android') {
    return readCommitAndroid({path, oid});
  }

  throw new NotImplemented('readCommit');
};
