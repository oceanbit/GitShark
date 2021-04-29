/**
 * This is an implementation of:
 * `git rev-list --count main ^asdf`
 *
 * It's meant to report the difference between two branches (one remote)
 * so that we can easily report "needs to push" and "needs to pull"
 *
 */
import {Platform} from 'react-native';
import {revListAndroid} from './revList-android';
import {logService, NotImplemented} from '../debug';

export interface RevListProps {
  dir: string;
  branchName1: string;
  branchName2: string;
}

export const revList = async ({
  dir,
  branchName1,
  branchName2,
}: RevListProps) => {
  logService && console.log('service - revList');

  if (Platform.OS === 'android') {
    return await revListAndroid({dir, branchName1, branchName2});
  }

  throw new NotImplemented('revList');
};
