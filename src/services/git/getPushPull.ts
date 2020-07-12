import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {revList} from './revList';

interface GetPushPull {
  path: string;
}

export const getPushPull = async ({path}: GetPushPull) => {
  const currBranch: string = (await git.currentBranch({
    fs,
    dir: path,
  })) as any;
  /**
   * isomorphic-git does not currently have support for remote tracking
   * (or at least, does not store the tracked branch properly)
   *
   * We will be working on introducing this functionality upsteam
   * but until such time, we will move forward in this service by assuming
   * the remote branch has the same name as the local branch (DANGEROUS assumption)
   *
   * Another dangerous assumption we have to make: It will track
   */

  const remotes = await git.listRemotes({fs, dir: path});

  const trackedRemote = remotes[0].remote;
  const trackedBranch = `${trackedRemote}/${currBranch}`;

  const {branch1Diff: toPull, branch2Diff: toPush} = await revList({
    dir: path,
    branchName1: currBranch,
    branchName2: trackedBranch,
  });

  return {
    toPush,
    toPull,
  };
};
