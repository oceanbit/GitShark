import {NativeModules} from 'react-native';
import type {ListLocalBranchesProps} from './list-local-branches';

export const listLocalBranchesAndroid = async ({
  path,
}: ListLocalBranchesProps) => {
  return await NativeModules.GitModule.listLocalBranches(path);
};
