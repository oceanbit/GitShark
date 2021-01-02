import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {RemoteBranch} from '@types';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

interface FindTrackedRemoteBranchProps {
  branchName: string;
  remoteBranches: RemoteBranch[];
  path: string;
}
export const findTrackedRemoteBranch = async ({
  branchName,
  remoteBranches,
  path,
}: FindTrackedRemoteBranchProps) => {
  logService && console.log('service - findTrackedRemoteBranch');

  const repoPath = getRepoPath(path);

  // Returns 'refs/remotes/bar/test'
  const trackingBranch = await git.getRemoteTrackingBranch({
    fs,
    dir: repoPath,
    ref: branchName,
  });

  const trackedBranch = remoteBranches.find(rBranch => {
    return `refs/remotes/${rBranch.remote}/${rBranch.name}` === trackingBranch;
  });

  return trackedBranch || null;
};
