import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {checkoutBranch} from './checkoutBranch';
import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {createBranchAndroid} from '@services/git/create-branch-android';

export interface CreateBranchProps {
  repo: ReduxRepo;
  branchName: string;
  checkAfterCreate: boolean;
  dispatch: ThunkDispatchType;
}
export const createBranch = async ({
  repo,
  branchName,
  checkAfterCreate,
  dispatch,
}: CreateBranchProps) => {
  logService && console.log('service - createBranch');

  if (Platform.OS === 'android') {
    await createBranchAndroid({repo, branchName, dispatch, checkAfterCreate});
  } else {
    throw new NotImplemented('createBranch');
  }

  if (checkAfterCreate) {
    await checkoutBranch({branchName, repo, dispatch, remote: false});
  }
};
