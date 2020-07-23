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
import {Remotes} from '@types';
import {OnFetchActionsDialog} from './components/on-fetch-action-dialog';
import {OnPushActionsDialog} from './components/on-push-action-dialog';
import {RemoteBranch} from '@types';

interface FetchDialogType {
  action: 'fetch';
  data: {
    remote: Remotes;
    fetchAll: boolean;
    prune: boolean;
  };
}

interface PushDialogType {
  action: 'push';
  data: {
    destination: RemoteBranch;
    forcePush: boolean;
    branch: string;
  };
}

type DialogType = FetchDialogType | PushDialogType | null;

export const Repository = () => {
  const [dialogType, setDialogType] = React.useState<DialogType>();

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
    <>
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
        onPush={data =>
          setDialogType({
            action: 'push',
            data,
          })
        }
        onFetch={data =>
          setDialogType({
            action: 'fetch',
            data,
          })
        }
      />
      <OnFetchActionsDialog
        visible={dialogType?.action === 'fetch'}
        data={dialogType?.data as FetchDialogType['data']}
        dispatch={dispatch}
        repo={repo}
        onDismiss={() => {
          setDialogType(null);
        }}
      />
      <OnPushActionsDialog
        visible={dialogType?.action === 'push'}
        data={dialogType?.data as PushDialogType['data']}
        dispatch={dispatch}
        repo={repo}
        onDismiss={() => {
          setDialogType(null);
        }}
      />
    </>
  );
};
