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

  if (Platform.OS === 'android') {
    await pullAndroid({
      path: repo.path,
      remote: destination.remote,
      remoteRef: destination.name,
      authToken: GH_TOKEN,
      onProgress,
    });

    dispatch(getCommitRev({path: repo.path, repoId: repo.id}));

    return;
  }

  const repoPath = getRepoPath(repo.path);

  await git.pull({
    fs,
    dir: repoPath,
    ref: branch,
    http,
    remote: destination.remote,
    remoteRef: destination.name,
    onProgress,
    onAuth: () =>
      GH_TOKEN
        ? {
            username: GH_TOKEN,
            password: 'x-oauth-basic',
          }
        : {},
    author: {
      email,
      name,
    },
  });

  dispatch(getCommitRev({path: repoPath, repoId: repo.id}));
};
