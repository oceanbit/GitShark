import {NativeModules} from 'react-native';
import type {CreateBranchProps} from './create-branch';

export const createBranchAndroid = async ({
  repo,
  branchName,
}: CreateBranchProps) => {
  return await NativeModules.GitModule.createBranch(repo.path, branchName);
};
