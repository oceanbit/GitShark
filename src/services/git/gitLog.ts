import {fs} from '@constants';
import {ReduxRepo} from '@entities';
import git, {ReadCommitResult} from 'isomorphic-git/index.umd.min.js';
import {Platform} from 'react-native';
import {gitLogAndroid} from './gitLog-android';
import {logService} from '../debug';

export type GitLogCommit = ReadCommitResult['commit'] & {
  oid: ReadCommitResult['oid'];
};

interface GitLogProps {
  repo: Partial<ReduxRepo>;
  ref?: string;
}

export const gitLog = async ({repo, ref}: GitLogProps) => {
  logService && console.log('service - gitLog');

  if (Platform.OS === 'android') {
    return gitLogAndroid({repo, ref});
  }

  const commits = await git.log({
    fs,
    dir: repo!.path,
    ref: ref || repo?.currentBranchName || '',
  });

  return commits.map(commitData => {
    return {
      ...commitData.commit,
      oid: commitData.oid,
    };
  });
};
