import {Platform} from 'react-native';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {getRepoStatusAndroid} from './status-android';

export interface ChangesArrayItem {
  fileName: string;
  staged: boolean;
  unstagedChanges: boolean;
  fileStatus: 'unmodified' | 'added' | 'deleted' | 'modified' | 'conflicted';
}

export const getRepoStatus = async (path: string) => {
  if (Platform.OS === 'android') {
    return getRepoStatusAndroid(path);
  }

  const statusArrArr = await git.statusMatrix({
    fs,
    dir: `${path}`,
  });

  const changesArray: ChangesArrayItem[] = statusArrArr.map(statusArr => {
    const [fileName, headStatus, workdirStatus, stageStatus] = statusArr;
    switch (`${headStatus} ${workdirStatus} ${stageStatus}`) {
      // Added/new
      case '0 2 0': // new, untracked
      case '0 2 1': // new, unstaged
        return {
          fileName,
          staged: false,
          unstagedChanges: false,
          fileStatus: 'added',
        };
      case '0 2 2': // added, staged
        return {
          fileName,
          staged: true,
          unstagedChanges: false,
          fileStatus: 'added',
        };
      case '0 2 3': // added, staged, with unstaged changes
        return {
          fileName,
          staged: true,
          unstagedChanges: true,
          fileStatus: 'added',
        };
      // Modified in some way
      case '1 2 0':
      case '1 2 1': // modified, unstaged
        return {
          fileName,
          staged: false,
          unstagedChanges: false,
          fileStatus: 'modified',
        };
      case '1 2 2': // modified, staged
        return {
          fileName,
          staged: true,
          unstagedChanges: false,
          fileStatus: 'modified',
        };
      case '1 2 3': // modified, staged, with unstaged changes
        return {
          fileName,
          staged: true,
          unstagedChanges: true,
          fileStatus: 'modified',
        };
      // Removed in some way
      case '1 0 1': // deleted, unstaged
        return {
          fileName,
          staged: false,
          unstagedChanges: false,
          fileStatus: 'deleted',
        };
      case '1 0 0': // deleted, staged
        return {
          fileName,
          staged: true,
          unstagedChanges: false,
          fileStatus: 'deleted',
        };
      // unmodified
      case '1 1 1':
      default:
        return {
          fileName,
          staged: false,
          unstagedChanges: false,
          fileStatus: 'unmodified',
        };
    }
  });

  return changesArray;
};
