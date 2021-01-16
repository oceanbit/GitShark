import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {logService} from '../debug';
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

  const commit = await git.readCommit({dir: path, fs: fs, oid});

  return {
    ...commit.commit,
    oid: commit.oid,
  };
};
