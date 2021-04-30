import {NativeModules} from 'react-native';
import type {RenameBranchProps} from './rename-branch';

export const renameBranchAndroid = async ({
  repo,
  oldBranchName,
  branchName,
}: RenameBranchProps) => {
  return await NativeModules.GitModule.renameBranch(
    repo.path,
    oldBranchName,
    branchName,
  );
};
