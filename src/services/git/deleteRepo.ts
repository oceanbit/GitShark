import {Repo} from '@entities';

export const deleteRepo = async (repo: Repo) => {
  await repo.remove();
};
