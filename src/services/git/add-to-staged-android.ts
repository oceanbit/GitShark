import type {AddToStagedProps} from '@services';
import {NativeModules} from 'react-native';

export const addToStagedAndroid = async ({changes, repo}: AddToStagedProps) => {
  const fileNames = changes.map(c => c.fileName);
  console.log('add to stage, ', fileNames);
  await NativeModules.GitModule.addToStage(repo.path, fileNames);
};
