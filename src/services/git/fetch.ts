import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {getCommitRev, getRemotesAndBranches} from '@store';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {logService} from '../debug';
import {getRepoPath} from '@utils';

interface FetchProps {
  dir: string;
  remote: string;
  fetchAll: boolean;
  prune: boolean;
  onProgress: ProgressCallback;
  repo: ReduxRepo;
  dispatch: ThunkDispatchType;
}

export const fetch = async ({
  dir,
  remote,
  fetchAll,
  prune,
  onProgress,
  repo,
  dispatch,
}: FetchProps) => {
  logService && console.log('service - fetch');

  const repoPath = getRepoPath(repo.path);

  await git.fetch({
    fs,
    http,
    dir: getRepoPath(dir),
    remote,
    singleBranch: !fetchAll,
    prune,
    onProgress,
  });

  dispatch(getCommitRev({path: repoPath, repoId: repo.id}));
  dispatch(getRemotesAndBranches(repoPath));
};
