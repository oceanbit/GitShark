import {Repo} from '@entities';
import {getConnection} from 'typeorm';

export const renameRepo = async (repoId: string | number, name: string) => {
  await getConnection()
    .createQueryBuilder()
    .update(Repo)
    .set({
      name,
    })
    .where('id = :id', {id: repoId})
    .execute();
};
