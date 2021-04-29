import {GITHUB_TOKEN_STORAGE_KEY} from '@constants';
import {getCommitRev} from '@store';
import RNSecureKeyStore from 'react-native-secure-key-store';

import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {ProgressCallback, RemoteBranch} from '@types';
import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {pushAndroid} from './push-android';

interface PushProps {
  destination: RemoteBranch;
  forcePush: boolean;
  branch: string;
  onProgress: ProgressCallback;
  repo: ReduxRepo;
  dispatch: ThunkDispatchType;
}

export const push = async ({
  destination,
  forcePush,
  branch,
  repo,
  dispatch,
  onProgress,
}: PushProps) => {
  logService && console.log('service - push');

  let GH_TOKEN = '';

  try {
    GH_TOKEN = await RNSecureKeyStore.get(GITHUB_TOKEN_STORAGE_KEY);
  } catch (e) {}

  if (Platform.OS === 'android') {
    await pushAndroid({
      path: repo.path,
      remote: destination.remote,
      remoteRef: destination.name,
      authToken: GH_TOKEN,
      forcePush: forcePush,
      onProgress,
    });

    dispatch(getCommitRev({path: repo.path, repoId: repo.id}));

    return;
  }

  throw new NotImplemented('push');
};
