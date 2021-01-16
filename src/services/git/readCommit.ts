import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {logService} from '../debug';

interface RenameBranchProps {
  oid: string;
  path: string;
}
export const readCommit = async ({path, oid}: RenameBranchProps) => {
  logService && console.log('service - readCommit');

  const commit = await git.readCommit({dir: path, fs: fs, oid});

  return {
    ...commit.commit,
    oid: commit.oid,
  };
};
