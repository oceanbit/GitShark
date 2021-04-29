import {GITHUB_TOKEN_STORAGE_KEY} from '@constants';
import {getCommitRev, getGitLog} from '@store';
import RNSecureKeyStore from 'react-native-secure-key-store';

import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {ProgressCallback, RemoteBranch} from '@types';
import {logService, NotImplemented} from '../debug';
import {getRepoPath} from '@utils';
import {pullAndroid} from './pull-android';
import {Platform} from 'react-native';

interface PushProps {
  destination: RemoteBranch;
  branch: string;
  onProgress: ProgressCallback;
  repo: ReduxRepo;
  dispatch: ThunkDispatchType;
  email: string;
  name: string;
}

export const pull = async ({
  destination,
  branch,
  repo,
  dispatch,
  onProgress,
  email,
  name,
}: PushProps) => {
  logService && console.log('service - pull');

  let GH_TOKEN = '';

  try {
    GH_TOKEN = await RNSecureKeyStore.get(GITHUB_TOKEN_STORAGE_KEY);
  } catch (e) {}

  const repoPath = getRepoPath(repo.path);

  if (Platform.OS === 'android') {
    await pullAndroid({
      path: repo.path,
      remote: destination.remote,
      remoteRef: destination.name,
      authToken: GH_TOKEN,
      onProgress,
    });
  } else {
    throw new NotImplemented('pull');
  }

  dispatch(getCommitRev({path: repoPath, repoId: repo.id}));
  dispatch(getGitLog());
};
