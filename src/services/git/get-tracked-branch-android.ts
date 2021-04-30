import {NativeModules} from 'react-native';

interface FindTrackedRemoteBranchProps {
  branchName: string;
  path: string;
}
export const getTrackedBranchAndroid = async ({
  branchName,
  path,
}: FindTrackedRemoteBranchProps) => {
  const trackingBranch = await NativeModules.GitModule.getTrackedBranch(
    path,
    branchName,
  );

  return trackingBranch || null;
};
