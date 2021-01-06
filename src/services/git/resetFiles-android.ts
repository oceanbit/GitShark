import {getGitStatus} from '@store';
import {logService} from '../debug';
import type {ResetFilesProps} from './resetFiles';
import {NativeModules} from 'react-native';

export const resetFilesAndroid = async ({
  path,
  files,
  dispatch,
}: ResetFilesProps) => {
  logService && console.log('service - resetFiles');

  await NativeModules.GitModule.resetPaths(path, files);

  dispatch(getGitStatus());
};
