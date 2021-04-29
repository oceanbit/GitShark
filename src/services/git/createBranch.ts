import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import git from 'isomorphic-git/index.umd.min.js';
import {ThunkDispatchType} from '@hooks';
import {checkoutBranch} from './checkoutBranch';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

interface CreateBranchProps {
  repo: ReduxRepo;
  branchName: string;
  checkAfterCreate: boolean;
  dispatch: ThunkDispatchType;
}
export const createBranch = async ({
  repo,
  branchName,
  checkAfterCreate,
  dispatch,
}: CreateBranchProps) => {
  logService && console.log('service - createBranch');

  await git.branch({
    fs,
    dir: getRepoPath(repo.path),
    ref: branchName,
    checkout: checkAfterCreate,
  });

  if (checkAfterCreate) {
    await checkoutBranch({branchName, repo, dispatch, remote: false});
  }
};
