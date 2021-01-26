import git from 'isomorphic-git/index.umd.min';
import {fs} from '@constants';
import {ChangesArrayItem} from '@services';
import {ReduxRepo} from '@entities';
import {Platform} from 'react-native';
import {addToStagedAndroid} from './add-to-staged-android';

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

  return Promise.all(
    changes.map(change => {
      if (change.fileStatus === 'deleted') {
        // TODO: Remove when this is handled
        // https://github.com/isomorphic-git/isomorphic-git/issues/1099#issuecomment-653428486
        return git.remove({fs, dir: repo!.path, filepath: change.fileName});
      } else {
        return git.add({fs, dir: repo!.path, filepath: change.fileName});
      }
    }),
  );
};
