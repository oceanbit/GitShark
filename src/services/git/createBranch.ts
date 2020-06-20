import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import git from 'isomorphic-git/index.umd.min.js';

interface CreateBranchProps {
  repo: ReduxRepo;
  branchName: string;
  checkAfterCreate: boolean;
}
export const createBranch = async ({
  repo,
  branchName,
  checkAfterCreate,
}: CreateBranchProps) => {
  await git.branch({
    fs,
    dir: repo.path,
    ref: branchName,
    checkout: checkAfterCreate,
  });
};
