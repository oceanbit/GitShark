import {RemoteBranch} from '@types';
import {NativeModules} from 'react-native';

interface FindTrackedRemoteBranchProps {
  branchName: string;
  remoteBranches: RemoteBranch[];
  path: string;
}
export const findTrackedRemoteBranchAndroid = async ({
  branchName,
  remoteBranches,
  path,
}: FindTrackedRemoteBranchProps) => {
  const trackingBranch = await NativeModules.GitModule.getTrackedBranch(
    path,
    branchName,
  );

  const trackedBranch = remoteBranches.find(rBranch => {
    return `refs/remotes/${rBranch.remote}/${rBranch.name}` === trackingBranch;
  });

  return trackedBranch || null;
};
