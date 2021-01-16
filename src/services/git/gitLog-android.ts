import {NativeModules} from 'react-native';
import {jgitToIsoCommit} from '@utils';
import type {GitLogCommit, GitLogProps} from './gitLog';

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
