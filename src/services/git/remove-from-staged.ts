import {ChangesArrayItem} from '@services';
import {ReduxRepo} from '@entities';
import {Platform} from 'react-native';
import {removeFromStageAndroid} from './remove-from-staged-android';
import {NotImplemented} from '@services/debug';

export interface RemoveFromStagedProps {
  changes: ChangesArrayItem[];
  repo: ReduxRepo;
}

export const removeFromStaged = ({changes, repo}: RemoveFromStagedProps) => {
  if (Platform.OS === 'android') {
    return removeFromStageAndroid({changes, repo});
  }

  throw new NotImplemented('removeFromStaged');
};
