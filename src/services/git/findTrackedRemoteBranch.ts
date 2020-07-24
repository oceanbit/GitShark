import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {RemoteBranch} from '@types';

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
  // Returns 'refs/remotes/bar/test'
  const trackingBranch = await git.getRemoteTrackingBranch({
    fs,
    dir: path,
    ref: branchName,
  });

  const trackedBranch = remoteBranches.find(rBranch => {
    return `refs/remotes/${rBranch.remote}/${rBranch.name}` === trackingBranch;
  });

  return trackedBranch || null;
};
