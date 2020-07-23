import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {revList} from './revList';

interface GetPushPullProps {
  path: string;
}

export const getPushPull = async ({path}: GetPushPullProps) => {
  const currBranch = (await git.currentBranch({
    fs,
    dir: path,
  })) as string;

  const trackedBranch = await git.getRemoteTrackingBranch({
    fs,
    dir: path,
    ref: currBranch,
  });

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
