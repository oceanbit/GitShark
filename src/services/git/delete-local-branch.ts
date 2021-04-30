import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {getLocalBranches} from '@store';
import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {deleteLocalBranchAndroid} from '@services/git/delete-local-branch-android';

export interface DeleteLocalBranchProps {
  repo: ReduxRepo;
  branchName: string;
  dispatch: ThunkDispatchType;
}
export const deleteLocalBranch = async ({
  repo,
  branchName,
  dispatch,
}: DeleteLocalBranchProps) => {
  logService && console.log('service - deleteLocalBranch');

  if (Platform.OS === 'android') {
    await deleteLocalBranchAndroid({
      repo,
      branchName,
      dispatch,
    });
  } else {
    throw new NotImplemented('deleteLocalBranch');
  }

  dispatch(getLocalBranches(repo.path));
};
