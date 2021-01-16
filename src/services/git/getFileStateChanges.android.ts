import {ChangesArrayItem} from '@services/git/status';
import {NativeModules} from 'react-native';

export const getFileStateChangesAndroid = async (
  commitHash1: string,
  commitHash2: string,
  dir: string,
): Promise<ChangesArrayItem[]> => {
  return await NativeModules.GitModule.getFileStateChanges(
    dir,
    commitHash1,
    commitHash2,
  );
};
