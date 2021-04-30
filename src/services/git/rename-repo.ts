import {Repo} from '@entities';
import {getConnection} from 'typeorm';
import {ThunkDispatchType} from '@hooks';
import {findRepoList} from '@store';
import {logService} from '../debug';

interface RenameRepoProps {
  repoId: string | number;
  name: string;
  dispatch: ThunkDispatchType;
}

export const renameRepo = async ({repoId, name, dispatch}: RenameRepoProps) => {
  logService && console.log('service - renameRepo');

  await getConnection()
    .createQueryBuilder()
    .update(Repo)
    .set({
      name,
    })
    .where('id = :id', {id: repoId})
    .execute();

  dispatch(findRepoList());
};
