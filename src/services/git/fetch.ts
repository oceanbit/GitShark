import {getCommitRev, getRemotesAndBranches} from '@store';
import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {fetchAndroid} from '@services/git/fetch-android';
import {ProgressCallback} from '@types';

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

  throw new NotImplemented('fetch');
};
