import {getRepoNameFromUri} from '@utils';
import {Platform} from 'react-native';
import {cloneRepoAndroid} from '@services/git/clone-repo-android';
import {cloneRepoIOS} from '@services/git/clone-repo-ios';
import {logService, NotImplemented} from '../debug';
import {ProgressCallback} from '@types';

export interface CloneRepoProps {
  path: string;
  name?: string;
  uri: string;
  onProgress: ProgressCallback;
}

export const cloneRepo = ({path, name, uri, onProgress}: CloneRepoProps) => {
  logService && console.log('service - cloneRepo');
  const newFolderName = getRepoNameFromUri(uri);
  const repoName = name || newFolderName;
  const repoDir = `${path}/${repoName}`;

  if (Platform.OS === 'android') {
    return cloneRepoAndroid({path, name, uri, onProgress});
  }

  if (Platform.OS === 'ios') {
    return cloneRepoIOS({path, name, uri, onProgress});
  }

  throw new NotImplemented('cloneRepo');
};
