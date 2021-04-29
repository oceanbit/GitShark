import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {checkoutBranchAndroid} from '@services/git/checkoutBranch-android';
import {ProgressCallback} from '@types';

export interface CheckoutBranchProps {
  repo: ReduxRepo;
  branchName: string;
  remote: false | string;
  dispatch: ThunkDispatchType;
  onProgress?: ProgressCallback;
}
export const checkoutBranch = async ({
  repo,
  branchName,
  dispatch,
  onProgress,
  remote,
}: CheckoutBranchProps) => {
  logService && console.log('service - checkoutBranch');

  if (Platform.OS === 'android') {
    return await checkoutBranchAndroid({
      repo,
      branchName,
      dispatch,
      onProgress,
      remote,
    });
  }

  throw new NotImplemented('checkoutBranch');
};
