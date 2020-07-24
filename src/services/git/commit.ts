import git from 'isomorphic-git/index.umd.min.js';
import {ReduxRepo} from '@entities';
import {fs} from '@constants';

interface commitProps {
  title?: string;
  description?: string;
  repo: ReduxRepo;
  name: string;
  email: string;
}

export const commit = async ({
  title,
  description,
  repo,
  email,
  name,
}: commitProps) => {
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
};
