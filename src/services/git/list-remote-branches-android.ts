import {NativeModules} from 'react-native';
import type {ListRemoteBranchesProps} from './list-remote-branches';

export const listRemoteBranchesAndroid = async ({
  path,
  remote,
}: ListRemoteBranchesProps) => {
  return await NativeModules.GitModule.listRemoteBranches(path, remote);
};
