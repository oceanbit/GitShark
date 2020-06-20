import {Repo, ReduxRepo} from '@entities';
import {getConnection} from 'typeorm';

export const deleteRepo = async (repo: ReduxRepo) => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Repo)
    .where('id = :id', {id: repo.id})
    .execute();
};
