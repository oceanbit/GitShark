import git from 'isomorphic-git/index.umd.min.js';
import {ReduxRepo} from '@entities';
import {fs} from '@constants';
import {getCommitRev, getGitStatus} from '@store';
import {ThunkDispatchType} from '@hooks';
import {logService} from '../debug';
import {getRepoPath} from '@utils';
import {commitAndroid} from '@services/git/commit-android';
import {Platform} from 'react-native';

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

  const repoPath = getRepoPath(repo.path);

  if (Platform.OS === 'android') {
    await commitAndroid({message, email, name, repo});
  } else {
    await git.commit({
      fs,
      dir: repoPath,
      author: {
        name,
        email,
      },
      message,
    });
  }

  /**
   * While these may have `.then`, they're not promises in themselves. As such, we cannot use `await`. This should fix that
   */
  const gitStatusProm = new Promise(resolve => {
    dispatch(getGitStatus()).then(() => {
      resolve();
    });
  });

  const gitRevProm = new Promise(resolve => {
    dispatch(getCommitRev({path: repoPath, repoId: repo.id})).then(() => {
      resolve();
    });
  });

  await Promise.all([gitStatusProm, gitRevProm]);
};
