import {fs} from '@constants';
import {ReduxRepo} from '@entities';
import git, {ReadCommitResult} from 'isomorphic-git/index.umd.min.js';
import {NativeModules, Platform} from 'react-native';

export type GitLogCommit = ReadCommitResult['commit'] & {
  oid: ReadCommitResult['oid'];
};

interface GitLogProps {
  repo: Partial<ReduxRepo>;
  ref?: string;
}

export const gitLog = async ({repo, ref}: GitLogProps) => {
  if (Platform.OS === 'android') {
    const res = (await NativeModules.GitModule.gitLog(
      repo!.path,
      ref || '',
    )) as GitLogCommit[];

    const commitRegex = /commit\s*(.*?)\s/;

    return res.map(c => {
      const [_, oid] = commitRegex.exec(c.oid) || [];

      c.oid = oid;
      c.parent = c.parent.map(p => {
        const [_, pOid] = commitRegex.exec(p) || [];
        return pOid;
      });
      return c;
    });
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
