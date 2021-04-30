import {Repo, ReduxRepo} from '@entities';
import {getConnection} from 'typeorm';
import {logService} from '../debug';

export const deleteRepo = async (repo: ReduxRepo) => {
  logService && console.log('service - deleteRepo');

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Repo)
    .where('id = :id', {id: repo.id})
    .execute();
};
