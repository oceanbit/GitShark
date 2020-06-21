import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {changeBranch, findRepoList} from '@store';

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
  dispatch(changeBranch({repoId: repo.id, branchName}));
  dispatch(findRepoList());
};
