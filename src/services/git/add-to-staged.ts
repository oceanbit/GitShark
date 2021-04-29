import {ChangesArrayItem} from '@services';
import {ReduxRepo} from '@entities';
import {Platform} from 'react-native';
import {addToStagedAndroid} from './add-to-staged-android';
import {NotImplemented} from '@services/debug';

export interface AddToStagedProps {
  changes: ChangesArrayItem[];
  repo: ReduxRepo;
}

export const addToStaged = ({
  changes,
  repo,
}: AddToStagedProps): Promise<any> => {
  if (Platform.OS === 'android') {
    return addToStagedAndroid({changes, repo});
  }

  throw new NotImplemented('addToStaged');
};
