import {Platform} from 'react-native';
import {currentBranchAndroid} from '@services/git/current-branch-android';
import {NotImplemented} from '@services/debug';

export interface CurrentBranchProps {
  path: string;
}

export const currentBranch = async (props: CurrentBranchProps) => {
  if (Platform.OS === 'android') {
    return await currentBranchAndroid(props);
  }

  throw new NotImplemented('currentBranch');
};
