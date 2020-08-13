import {fs} from '@constants';
import {ReduxRepo} from '@entities';
import git, {ReadCommitResult} from 'isomorphic-git/index.umd.min.js';
import {NativeModules, Platform} from 'react-native';

export type GitLogCommit = ReadCommitResult['commit'] & {
  oid: ReadCommitResult['oid'];
};

interface GitLogProps {
  repo: ReduxRepo;
}

export const gitLog = async ({repo}: GitLogProps) => {
  if (Platform.OS === 'android') {
    return (await NativeModules.GitModule.gitLog(repo.path)) as GitLogCommit[];
  }
  const commits = await git.log({
    fs,
    dir: repo.path,
    ref: repo.currentBranchName,
  });

  return commits.map(commitData => {
    return {
      ...commitData.commit,
      oid: commitData.oid,
    };
  });
};
