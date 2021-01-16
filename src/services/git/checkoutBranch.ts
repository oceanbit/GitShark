import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {changeBranch} from '@store';
import {logService} from '../debug';
import {Platform} from 'react-native';
import {checkoutBranchAndroid} from '@services/git/checkoutBranch-android';
import {getRepoPath} from '@utils';

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

  await git.checkout({
    fs,
    ref: branchName,
    dir: getRepoPath(repo.path),
    onProgress,
    remote: remote ? remote : undefined,
  });
  dispatch(changeBranch({repoId: repo.id, branchName}));
};
