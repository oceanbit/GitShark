import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {getTrackedBranchAndroid} from '@services/git/get-tracked-branch-android';

interface FindTrackedRemoteBranchProps {
  branchName: string;
  path: string;
}
export const getTrackedBranch = async ({
  branchName,
  path,
}: FindTrackedRemoteBranchProps) => {
  logService && console.log('service - findTrackedRemoteBranch');

  if (Platform.OS === 'android') {
    return await getTrackedBranchAndroid({
      branchName,
      path,
    });
  }

  throw new NotImplemented('findTrackedRemoteBranch');
};
