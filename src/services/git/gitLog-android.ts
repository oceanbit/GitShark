import {ReduxRepo} from '@entities';
import {ReadCommitResult} from 'isomorphic-git/index.umd.min.js';
import {NativeModules} from 'react-native';

export type GitLogCommit = ReadCommitResult['commit'] & {
  oid: ReadCommitResult['oid'];
};

interface GitLogProps {
  repo: Partial<ReduxRepo>;
  ref?: string;
}

export const gitLogAndroid = async ({repo, ref}: GitLogProps) => {
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
};
