import git, {ProgressCallback} from 'isomorphic-git/index.umd.min.js';
import {fs, GITHUB_TOKEN_STORAGE_KEY} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {getCommitRev} from '@store';
import RNSecureKeyStore from 'react-native-secure-key-store';

import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {RemoteBranch} from '@types';

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
  const GH_TOKEN = await RNSecureKeyStore.get(GITHUB_TOKEN_STORAGE_KEY);

  await git.pull({
    fs,
    dir: repo.path,
    ref: branch,
    http,
    remote: destination.remote,
    remoteRef: destination.name,
    onProgress,
    onAuth: () => ({
      username: GH_TOKEN,
      password: 'x-oauth-basic',
    }),
    author: {
      email,
      name,
    },
  });

  dispatch(getCommitRev({path: repo.path, repoId: repo.id}));
};
