import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {getCommitRev} from '@store';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';

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
  await git.fetch({
    fs,
    http,
    dir,
    remote,
    singleBranch: !fetchAll,
    prune,
    onProgress,
  });

  dispatch(getCommitRev({path: repo.path, repoId: repo.id}));
};
