import {Repo} from '../../entities/Repo';

export const deleteRepo = async (repo: Repo) => {
  await repo.remove();
};
