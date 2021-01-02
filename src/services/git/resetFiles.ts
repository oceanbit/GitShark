import {Platform} from 'react-native';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ThunkDispatchType} from '@hooks';
import {getGitStatus} from '@store';
import {logService} from '../debug';
import {resetFilesAndroid} from './resetFiles-android';
import {getRepoPath} from '@utils';

export interface ResetFilesProps {
  path: string;
  // Filepaths
  files: string[];
  dispatch: ThunkDispatchType;
}

export const resetFiles = async ({path, files, dispatch}: ResetFilesProps) => {
  logService && console.log('service - resetFiles');

  if (Platform.OS === 'android') {
    return await resetFilesAndroid({path, files, dispatch});
  }

  const repoPath = getRepoPath(path);

  await git.checkout({
    fs,
    dir: repoPath,
    filepaths: files,
    force: true,
  });

  dispatch(getGitStatus());
};
