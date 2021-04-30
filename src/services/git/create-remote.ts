import {ReduxRepo} from '@entities';
import {ThunkDispatchType} from '@hooks';
import {fetch} from './fetch';
import {logService, NotImplemented} from '../debug';
import {getRepoPath} from '@utils';
import {Platform} from 'react-native';
import {createRemoteAndroid} from '@services/git/create-remote-android';
import {ProgressCallback} from '@types';

export interface CreateRemoteProps {
  repo: ReduxRepo;
  remoteName: string;
  remoteURL: string;
  onProgress: ProgressCallback;
  dispatch: ThunkDispatchType;
}

export const createRemote = async ({
  repo,
  remoteName,
  remoteURL,
  onProgress,
  dispatch,
}: CreateRemoteProps) => {
  logService && console.log('service - createRemote');
  const repoPath = getRepoPath(repo.path);

  if (Platform.OS === 'android') {
    await createRemoteAndroid({
      repo,
      remoteName,
      remoteURL,
      onProgress,
      dispatch,
    });
  } else {
    throw new NotImplemented('createRemote');
  }

  await fetch({
    dir: repoPath,
    remote: remoteName,
    fetchAll: true,
    prune: false,
    onProgress,
    repo,
    dispatch,
  });
};
