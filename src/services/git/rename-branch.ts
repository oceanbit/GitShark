import {ThunkDispatchType} from '@hooks';
import {changeBranch, getLocalBranches} from '@store';
import {ReduxRepo} from '@entities';
import {logService, NotImplemented} from '../debug';
import {getRepoPath} from '@utils';
import {Platform} from 'react-native';
import {renameBranchAndroid} from '@services/git/rename-branch-android';

export interface RenameBranchProps {
  branchName: string;
  oldBranchName: string;
  checkout: boolean;
  repo: ReduxRepo;
  dispatch: ThunkDispatchType;
}
export const renameBranch = async ({
  branchName,
  oldBranchName,
  checkout,
  repo,
  dispatch,
}: RenameBranchProps) => {
  logService && console.log('service - renameBranch');

  const repoPath = getRepoPath(repo.path);

  if (Platform.OS === 'android') {
    await renameBranchAndroid({
      branchName,
      oldBranchName,
      checkout,
      repo,
      dispatch,
    });
  } else {
    throw new NotImplemented('renameBranch');
  }

  dispatch(getLocalBranches(repoPath));

  if (checkout) {
    dispatch(changeBranch({repoId: repo.id, branchName}));
  }
};
