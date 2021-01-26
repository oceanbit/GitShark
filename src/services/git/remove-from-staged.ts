import git from 'isomorphic-git/index.umd.min';
import {fs} from '@constants';
import {ChangesArrayItem} from '@services';
import {ReduxRepo} from '@entities';
import {Platform} from 'react-native';
import {removeFromStageAndroid} from './remove-from-staged-android';

export interface RemoveFromStagedProps {
  changes: ChangesArrayItem[];
  repo: ReduxRepo;
}

export const removeFromStaged = ({changes, repo}: RemoveFromStagedProps) => {
  if (Platform.OS === 'android') {
    return removeFromStageAndroid({changes, repo});
  }

  return Promise.all(
    changes.map(change => {
      if (change.fileStatus === 'deleted') {
        // TODO: Remove when this is handled
        // https://github.com/isomorphic-git/isomorphic-git/issues/1099#issuecomment-653428486
        return git.resetIndex({
          fs,
          dir: repo!.path,
          filepath: change.fileName,
        });
      } else {
        return git.remove({fs, dir: repo!.path, filepath: change.fileName});
      }
    }),
  );
};
