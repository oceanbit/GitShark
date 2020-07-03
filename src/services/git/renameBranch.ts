import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ThunkDispatchType} from '@hooks';
import {changeBranch, getLocalBranches} from '@store';
import {ReduxRepo} from '@entities';

interface RenameBranchProps {
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
  await git.renameBranch({
    fs,
    checkout,
    dir: repo.path,
    ref: branchName,
    oldref: oldBranchName,
  });

  dispatch(getLocalBranches(repo.path));

  if (checkout) {
    dispatch(changeBranch({repoId: repo.id, branchName}));
  }
};
