import {revList} from './revList';
import {logService} from '../debug';
import {getRepoPath} from '@utils';
import {currentBranch} from './current-branch';
import {getTrackedBranch} from './get-tracked-branch';

interface GetPushPullProps {
  path: string;
}

export const getPushPull = async ({path}: GetPushPullProps) => {
  logService && console.log('service - getPushPull');

  const repoPath = getRepoPath(path);

  const currBranch = (await currentBranch({
    path: repoPath,
  })) as string;

  const trackedBranch = await getTrackedBranch({
    path: repoPath,
    branchName: currBranch,
  });

  if (!trackedBranch)
    return {
      toPush: [],
      toPull: [],
    };

  const {branch1Diff: toPull, branch2Diff: toPush} = await revList({
    dir: repoPath,
    branchName1: currBranch,
    branchName2: trackedBranch,
  });

  return {
    toPush,
    toPull,
  };
};
