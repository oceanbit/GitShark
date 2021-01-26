import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs, GITHUB_TOKEN_STORAGE_KEY} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {getCommitRev} from '@store';
import RNSecureKeyStore from 'react-native-secure-key-store';

import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {RemoteBranch} from '@types';
import {logService} from '../debug';
import {getRepoPath} from '@utils';
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

  // if (!GH_TOKEN) throw new Error('You are not logged in');

  const repoPath = getRepoPath(repo.path);

  await git.push({
    force: forcePush,
    fs,
    dir: repoPath,
    ref: branch,
    http,
    remote: destination.remote,
    remoteRef: destination.name,
    onProgress,
    onAuth: () => ({
      username: GH_TOKEN,
      password: 'x-oauth-basic',
    }),
  });

  dispatch(getCommitRev({path: repoPath, repoId: repo.id}));
};
