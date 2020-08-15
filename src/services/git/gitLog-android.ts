import {ReduxRepo} from '@entities';
import {ReadCommitResult} from 'isomorphic-git/index.umd.min.js';
import {NativeModules} from 'react-native';
import {jgitToIsoCommit} from '@utils';

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

  return res.map(c => {
    c.oid = jgitToIsoCommit(c.oid);
    c.parent = c.parent.map(p => jgitToIsoCommit(p));
    return c;
  });
};
