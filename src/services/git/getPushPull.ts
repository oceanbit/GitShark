import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {revList} from './revList';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

interface GetPushPullProps {
  path: string;
}

export const getPushPull = async ({path}: GetPushPullProps) => {
  logService && console.log('service - getPushPull');

  const repoPath = getRepoPath(path);

  const currBranch = (await git.currentBranch({
    fs,
    dir: repoPath,
  })) as string;

  const trackedBranch = await git.getRemoteTrackingBranch({
    fs,
    dir: repoPath,
    ref: currBranch,
  });

  const {branch1Diff: toPull, branch2Diff: toPush} = await revList({
    dir: repoPath,
    branchName1: currBranch,
    branchName2: trackedBranch,
  });

  console.log('toPull', toPull.length);
  console.log('toPush', toPush.length);

  return {
    toPush,
    toPull,
  };
};
