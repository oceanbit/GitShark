import type {ReadCommitProps} from './read-commit';
import {NativeModules} from 'react-native';
import {jgitToIsoCommit} from '@utils';
import type {GitLogCommit} from './gitLog';

export const readCommitAndroid = async ({path, oid}: ReadCommitProps) => {
  const res = (await NativeModules.GitModule.readCommit(
    path,
    oid,
  )) as GitLogCommit;

  res.oid = jgitToIsoCommit(res.oid);
  res.parent = res.parent.map(p => jgitToIsoCommit(p));

  return res;
};
