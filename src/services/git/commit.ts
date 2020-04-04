import git from 'isomorphic-git/index.umd.min.js';
import {Repo} from '../../entities';
import {fs} from '../../constants/fs';

interface commitProps {
  title?: string;
  description?: string;
  repo: Repo;
}

export const commit = async ({title, description, repo}: commitProps) => {
  const message = `${title}\n${description}`;
  await git.commit({
    fs,
    dir: repo.path,
    author: {
      name: 'Corbin Crutchley',
      email: 'crutchcorn@gmail.com',
    },
    message,
  });
};
