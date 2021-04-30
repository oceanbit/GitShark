import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {listRemoteBranchesAndroid} from './list-remote-branches-android';

export interface ListRemoteBranchesProps {
  path: string;
  remote: string;
}
export const listRemoteBranches = async ({
  path,
  remote,
}: ListRemoteBranchesProps): Promise<string[]> => {
  logService && console.log('service - listRemoteBranches');

  if (Platform.OS === 'android') {
    return await listRemoteBranchesAndroid({
      path,
      remote,
    });
  }

  throw new NotImplemented('listRemoteBranches');
};
