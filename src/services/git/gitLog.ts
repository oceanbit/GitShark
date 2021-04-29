import {ReduxRepo} from '@entities';
import {Platform} from 'react-native';
import {gitLogAndroid} from './gitLog-android';
import {logService, NotImplemented} from '../debug';
import {CommitObject} from '@types';

export type GitLogCommit = CommitObject & {
  oid: string;
};

export interface GitLogProps {
  repo: Partial<ReduxRepo>;
  ref?: string;
}

export const gitLog = async ({repo, ref}: GitLogProps) => {
  logService && console.log('service - gitLog');

  if (Platform.OS === 'android') {
    return gitLogAndroid({repo, ref});
  }

  throw new NotImplemented('gitLog');
};
