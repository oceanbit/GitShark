import type {RemoveFromStagedProps} from '@services';
import {NativeModules} from 'react-native';

export const removeFromStageAndroid = async ({
  changes,
  repo,
}: RemoveFromStagedProps) => {
  const fileNames = changes.map(c => c.fileName);
  console.log('remove from stage, ', fileNames);
  await NativeModules.GitModule.removeFromStage(repo.path, fileNames);
};
