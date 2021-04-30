import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {listLocalBranchesAndroid} from './list-local-branches-android';

export interface ListLocalBranchesProps {
  path: string;
}
export const listLocalBranches = async ({path}: ListLocalBranchesProps) => {
  logService && console.log('service - listLocalBranches');

  if (Platform.OS === 'android') {
    return await listLocalBranchesAndroid({
      path,
    });
  }

  throw new NotImplemented('listLocalBranches');
};
