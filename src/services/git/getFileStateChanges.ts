import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';

export async function getFileStateChanges(
  commitHash1: string,
  commitHash2: string,
  dir: string,
) {
  return git.walk({
    fs,
    dir,
    trees: [git.TREE({ref: commitHash1}), git.TREE({ref: commitHash2})],
    map: async function(filepath, walked) {
      const [A, B] = walked || [];

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
      let type = 'equal';
      if (Aoid !== Boid) {
        type = 'modify';
      }
      if (Aoid === undefined) {
        type = 'add';
      }
      if (Boid === undefined) {
        type = 'remove';
      }
      if (Aoid === undefined && Boid === undefined) {
        console.log('Something weird happened:');
        console.log(A);
        console.log(B);
      }

      return {
        path: `/${filepath}`,
        type: type,
      };
    },
  });
}
