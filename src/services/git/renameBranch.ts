import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ThunkDispatchType} from '@hooks';
import {changeBranch, getLocalBranches} from '@store';
import {ReduxRepo} from '@entities';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

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
  logService && console.log('service - renameBranch');

  const repoPath = getRepoPath(repo.path);

  await git.renameBranch({
    fs,
    checkout,
    dir: repoPath,
    ref: branchName,
    oldref: oldBranchName,
  });

  dispatch(getLocalBranches(repoPath));

  if (checkout) {
    dispatch(changeBranch({repoId: repo.id, branchName}));
  }
};
