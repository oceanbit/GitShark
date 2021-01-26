import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {getCommitRev, getRemotesAndBranches} from '@store';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {logService} from '../debug';
import {getRepoPath} from '@utils';
import {Platform} from 'react-native';
import {fetchAndroid} from '@services/git/fetch-android';

export interface FetchProps {
  dir: string;
  remote: string;
  fetchAll: boolean;
  prune: boolean;
  onProgress: ProgressCallback;
  repo: ReduxRepo;
  dispatch: ThunkDispatchType;
}

export const fetch = async (props: FetchProps) => {
  const {dir, remote, fetchAll, prune, onProgress, repo, dispatch} = props;

  logService && console.log('service - fetch');

  if (Platform.OS === 'android') {
    await fetchAndroid(props);

    dispatch(getCommitRev({path: repo.path, repoId: repo.id}));
    dispatch(getRemotesAndBranches(repo.path));

    return;
  }

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
