import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {ChangesArrayItem} from '@services/git/status';
import {logService} from '../debug';
import {getRepoPath} from '@utils';
import {Platform} from 'react-native';
import {getFileStateChangesAndroid} from './getFileStateChanges.android';

export const getFileStateChanges = async (
  commitHash1: string,
  commitHash2: string,
  dir: string,
): Promise<ChangesArrayItem[]> => {
  logService && console.log('service - getFileStateChanges');

  if (Platform.OS === 'android') {
    return await getFileStateChangesAndroid(commitHash1, commitHash2, dir);
  }

  const repoPath = getRepoPath(dir);

  // TODO: Replace this with functioning code. This is horribly slow and horribly buggy
  return git.walk({
    fs,
    dir: repoPath,
    trees: [git.TREE({ref: commitHash1}), git.TREE({ref: commitHash2})],
    map: async function (filepath, walked) {
      const [A, B] = walked || [];

      if (!A || !B) return;

      // ignore directories
      if (filepath === '.') {
        return;
      }
      if ((await A.type()) === 'tree' || (await B.type()) === 'tree') {
        return;
      }

      // generate ids
      const Aoid = await A.oid();
      const Boid = await B.oid();

      // determine modification type
      let type: ChangesArrayItem['fileStatus'] = 'unmodified';
      if (Aoid !== Boid) {
        type = 'modified';
      }
      if (Aoid === undefined) {
        type = 'added';
      }
      if (Boid === undefined) {
        type = 'deleted';
      }
      if (Aoid === undefined && Boid === undefined) {
        console.log('Something weird happened:');
        console.log(A);
        console.log(B);
      }

      return {
        fileName: filepath,
        staged: false,
        unstagedChanges: false,
        fileStatus: type,
      } as ChangesArrayItem;
    },
  });
};
