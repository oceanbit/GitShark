import {Platform} from 'react-native';
import {ThunkDispatchType} from '@hooks';
import {getGitStatus} from '@store';
import {logService, NotImplemented} from '../debug';
import {resetFilesAndroid} from './resetFiles-android';

export interface ResetFilesProps {
  path: string;
  // Filepaths
  files: string[];
  dispatch: ThunkDispatchType;
}

export const resetFiles = async ({path, files, dispatch}: ResetFilesProps) => {
  logService && console.log('service - resetFiles');

  if (Platform.OS === 'android') {
    await resetFilesAndroid({path, files, dispatch});
  } else {
    throw new NotImplemented('resetFiles');
  }

  dispatch(getGitStatus());
};
