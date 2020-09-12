import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {changeBranch} from '@store';
import {logService} from '../debug';

interface CheckoutBranchProps {
  repo: ReduxRepo;
  branchName: string;
  dispatch: ThunkDispatchType;
  onProgress?: ProgressCallback;
}
export const checkoutBranch = async ({
  repo,
  branchName,
  dispatch,
  onProgress,
}: CheckoutBranchProps) => {
  logService && console.log('service - checkoutBranch');
  await git.checkout({fs, ref: branchName, dir: repo.path, onProgress});
  dispatch(changeBranch({repoId: repo.id, branchName}));
};
