import {RemoteBranch} from '@types';
import {logService, NotImplemented} from '../debug';
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

  throw new NotImplemented('findTrackedRemoteBranch');
};
