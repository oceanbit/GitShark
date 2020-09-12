import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import git from 'isomorphic-git/index.umd.min.js';
import {ThunkDispatchType} from '@hooks';
import {getLocalBranches} from '@store';
import {logService} from '../debug';

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
  logService && console.log('service - deleteLocalBranch');

  await git.deleteBranch({
    fs,
    dir: repo.path,
    ref: branchName,
  });

  dispatch(getLocalBranches(repo.path));
};
