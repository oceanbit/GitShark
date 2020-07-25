import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {changeBranch} from '@store';

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
  await git.checkout({fs, ref: branchName, dir: repo.path, onProgress});
  dispatch(changeBranch({repoId: repo.id, branchName}));
};
