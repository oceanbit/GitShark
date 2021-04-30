import {NativeModules} from 'react-native';
import type {DeleteLocalBranchProps} from './delete-local-branch';

export const deleteLocalBranchAndroid = async ({
  repo,
  branchName,
}: DeleteLocalBranchProps) => {
  return await NativeModules.GitModule.deleteLocalBranch(repo.path, branchName);
};
