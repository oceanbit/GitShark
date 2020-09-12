import git from 'isomorphic-git/index.umd.min.js';
import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import {getCommitRev, getGitStatus} from '@store';
import {ThunkDispatchType} from '@hooks';
import {logService} from '../debug';

interface commitProps {
  title?: string;
  description?: string;
  repo: ReduxRepo;
  name: string;
  email: string;
  dispatch: ThunkDispatchType;
}

export const commit = async ({
  title,
  description,
  repo,
  email,
  name,
  dispatch,
}: commitProps) => {
  logService && console.log('service - commit');

  const message = `${title}\n${description}`;

  await git.commit({
    fs,
    dir: repo.path,
    author: {
      name,
      email,
    },
    message,
  });

  /**
   * While these may have `.then`, they're not promises in themselves. As such, we cannot use `await`. This should fix that
   */
  const gitStatusProm = new Promise(resolve => {
    dispatch(getGitStatus()).then(() => {
      resolve();
    });
  });

  const gitRevProm = new Promise(resolve => {
    dispatch(getCommitRev({path: repo.path, repoId: repo.id})).then(() => {
      resolve();
    });
  });

  await Promise.all([gitStatusProm, gitRevProm]);
};
