import {ReduxRepo} from '@entities';
import {getCommitRev, getGitStatus} from '@store';
import {ThunkDispatchType} from '@hooks';
import {logService, NotImplemented} from '../debug';
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
    throw new NotImplemented('commit');
  }

  /**
   * While these may have `.then`, they're not promises in themselves. As such, we cannot use `await`. This should fix that
   */
  const gitStatusProm = new Promise<void>(resolve => {
    dispatch(getGitStatus()).then(() => {
      resolve();
    });
  });

  const gitRevProm = new Promise<void>(resolve => {
    dispatch(getCommitRev({path: repoPath, repoId: repo.id})).then(() => {
      resolve();
    });
  });

  await Promise.all([gitStatusProm, gitRevProm]);
};
