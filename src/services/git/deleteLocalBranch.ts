import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import git from 'isomorphic-git/index.umd.min.js';
import {ThunkDispatchType} from '@hooks';
import {getLocalBranches} from '@store';

interface DeleteLocalBranchProps {
  repo: ReduxRepo;
  branchName: string;
  dispatch: ThunkDispatchType;
}
export const deleteLocalBranch = async ({
  repo,
  branchName,
  dispatch,
}: DeleteLocalBranchProps) => {
  await git.deleteBranch({
    fs,
    dir: repo.path,
    ref: branchName,
  });

  dispatch(getLocalBranches(repo.path));
};
