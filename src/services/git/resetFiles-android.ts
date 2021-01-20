import {getGitStatus} from '@store';
import type {ResetFilesProps} from './resetFiles';
import {NativeModules} from 'react-native';

export const resetFilesAndroid = async ({
  path,
  files,
  dispatch,
}: ResetFilesProps) => {
  await NativeModules.GitModule.resetPaths(path, files);

  dispatch(getGitStatus());
};
