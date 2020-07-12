import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {changeBranch} from '@store';

interface CheckoutBranchProps {
  repo: ReduxRepo;
  branchName: string;
  dispatch: ThunkDispatchType;
}
export const checkoutBranch = async ({
  repo,
  branchName,
  dispatch,
}: CheckoutBranchProps) => {
  await git.checkout({fs, ref: branchName, dir: repo.path});
  dispatch(changeBranch({repoId: repo.id, branchName}));
};
