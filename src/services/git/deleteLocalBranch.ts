import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import git from 'isomorphic-git/index.umd.min.js';
import {ThunkDispatchType} from '@hooks';
import {getLocalBranches} from '@store';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

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

  const repoPath = getRepoPath(repo.path);

  await git.deleteBranch({
    fs,
    dir: repoPath,
    ref: branchName,
  });

  dispatch(getLocalBranches(repoPath));
};
