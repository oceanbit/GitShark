import * as React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {clearRepo, findRepo, RootState} from '@store';
import {useThunkDispatch} from '@hooks';
import {RepositoryUI} from './repository.ui';
import {RepositoryChanges} from '../repository-changes/repository-changes';
import {RepositoryHistory} from '../repository-history/repository-history';
import {CommitAction} from '../commit-action/commit-action';
import {CommitDetails} from '../commit-details/commit-details';
import {renameRepo} from '@services';

export const Repository = () => {
  const {repo, toPushPull} = useSelector(
    (state: RootState) => state.repository,
  );
  const {remotes, localBranches, remoteBranches} = useSelector(
    (state: RootState) => state.branches,
  );
  const dispatch = useThunkDispatch();

  const {params} = useRoute();
  const {repoId} = params! as Record<string, string>;

  React.useEffect(() => {
    dispatch(findRepo(repoId)).then(console.log);

    return () => {
      // When repo is exited, we need to dispatch a clearing of the repo data
      dispatch(clearRepo());
    };
  }, [repoId, dispatch]);

  if (!repo) return null;

  return (
    <RepositoryUI
      remotes={remotes}
      localBranches={localBranches}
      remoteBranches={remoteBranches}
      repoChanges={RepositoryChanges}
      repoHistory={RepositoryHistory}
      commitActions={CommitAction}
      commitDetails={CommitDetails}
      pushPull={toPushPull}
      onRename={newName =>
        renameRepo({repoId: repo.id, name: newName, dispatch}).then(() =>
          findRepo(repoId),
        )
      }
    />
  );
};
