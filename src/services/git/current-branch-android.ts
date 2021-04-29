import {NativeModules} from 'react-native';
import type {CurrentBranchProps} from '@services/git/current-branch';

export const currentBranchAndroid = async ({path}: CurrentBranchProps) => {
  return await NativeModules.GitModule.currentBranch(path);
};
