import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {RemoteBranch} from '@types';
import {logService} from '../debug';
import {getRepoPath} from '@utils';
import {Platform} from 'react-native';
import {findTrackedRemoteBranchAndroid} from '@services/git/findTrackedRemoteBranch.android';

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

  if (Platform.OS === 'android') {
    return await findTrackedRemoteBranchAndroid({
      branchName,
      remoteBranches,
      path,
    });
  }

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
