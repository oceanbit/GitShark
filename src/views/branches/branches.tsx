/**
 * Keep in mind that despite being a "View", this is embedded inside of
 * "repository-history" as it's part of the dropdown component there
 */
import * as React from 'react';
import {useSelector} from 'react-redux';
import {getBranchData, getLocalBranches, RootState} from '@store';
import {useThunkDispatch} from '@hooks';
import {
  checkoutBranch,
  createBranch,
  deleteLocalBranch,
  renameBranch,
  resetFiles,
} from '@services';
import {BranchesUI} from './branches.ui';
import {CreateBranchDialog} from './components/create-branch-dialog';
import {ConfirmCheckoutDialog} from './components/confirm-checkout-dialog';
import {OnCheckoutActionsDialog} from './components/on-checkout-action-dialog';
import {AddRemoteDialog} from './components/add-remote-dialog';
import {OnCreateRemoteActionDialog} from './components/on-create-remote-action-dialog';

export const Branches = () => {
  const [createBranchDialog, setCreateBranchDialog] = React.useState(false);
  // For the branch dialog
  const [createRemoteDialog, setCreateRemoteDialog] = React.useState(false);
  const [errorStr, setErrorStr] = React.useState('');
  const {localBranches, remoteBranches, remotes} = useSelector(
    (state: RootState) => state.branches,
  );
  const remoteNames = remotes.map(remote => remote.remote);
  const {unstaged, staged} = useSelector((state: RootState) => state.changes);
  const dispatch = useThunkDispatch();

  const {repo} = useSelector((state: RootState) => state.repository);

  React.useEffect(() => {
    if (!repo) return;
    dispatch(getBranchData(repo.path));
  }, [repo, dispatch]);

  const onBranchCreate = React.useCallback(
    ({
      branchName,
      checkAfterCreate,
    }: {
      branchName: string;
      checkAfterCreate: boolean;
    }) => {
      createBranch({branchName, checkAfterCreate, repo: repo!, dispatch})
        .then(() => {
          setCreateBranchDialog(false);
          setErrorStr('');
          dispatch(getLocalBranches(repo!.path));
        })
        .catch(e => setErrorStr(e));
    },
    [repo, dispatch],
  );

  const onLocalBranchDelete = React.useCallback(
    async (branchName: string) => {
      await deleteLocalBranch({branchName, dispatch, repo: repo!});
    },
    [dispatch, repo],
  );

  const [branchToCheckout, setBranchCheckout] = React.useState('');

  const resetAndCheckout = async (branchName: string) => {
    await resetFiles({
      path: repo!.path,
      dispatch,
      files: [...unstaged.map(f => f.fileName), ...staged.map(f => f.fileName)],
    });
    setBranchCheckout(branchName);
  };

  // The branch name of which to "confirm" the checkout
  const [showConfirmCheckout, setConfirmCheckout] = React.useState('');
  const [addRemoteMeta, setAddRemoteMeta] = React.useState<{
    remoteName?: string;
    remoteURL?: string;
  }>({});

  const onCheckoutBranch = React.useCallback(
    async (branchName: string) => {
      if (staged.length || unstaged.length) {
        // Warn the user that their files will be reset before checkout
        setConfirmCheckout(branchName);
        return;
      }
      setBranchCheckout(branchName);
    },
    [staged, unstaged],
  );

  const onBranchRename = React.useCallback(
    async ({
      branchName,
      selected,
      oldBranchName,
    }: {
      branchName: string;
      selected: boolean;
      oldBranchName: string;
    }) => {
      await renameBranch({
        branchName,
        checkout: selected,
        repo: repo!,
        oldBranchName,
        dispatch,
      });
    },
    [repo, dispatch],
  );

  if (!repo) return null;

  return (
    <>
      <BranchesUI
        localBranches={localBranches}
        repo={repo}
        remotes={remotes}
        remoteBranches={remoteBranches}
        onCreateBranch={() => setCreateBranchDialog(true)}
        onCreateRemote={() => setCreateRemoteDialog(true)}
        onDeleteLocalBranch={onLocalBranchDelete}
        onCheckoutBranch={onCheckoutBranch}
        onBranchRename={onBranchRename}
      />
      <CreateBranchDialog
        visible={createBranchDialog}
        onDismiss={() => {
          setCreateBranchDialog(false);
          setErrorStr('');
        }}
        onBranchCreate={onBranchCreate}
        branches={localBranches || []}
        errorStr={errorStr}
      />
      <AddRemoteDialog
        visible={createRemoteDialog}
        onDismiss={() => {
          setCreateRemoteDialog(false);
        }}
        onRemoteCreate={props => setAddRemoteMeta(props)}
        remotes={remoteNames}
        errorStr={''}
      />
      <OnCreateRemoteActionDialog
        onDismiss={() => setAddRemoteMeta({})}
        visible={!!addRemoteMeta.remoteName && !!addRemoteMeta.remoteURL}
        repo={repo}
        dispatch={dispatch}
        {...addRemoteMeta}
      />
      <ConfirmCheckoutDialog
        visible={!!showConfirmCheckout}
        onDismiss={async doCheckout => {
          setConfirmCheckout('');
          if (doCheckout) {
            resetAndCheckout(showConfirmCheckout);
          }
        }}
      />
      <OnCheckoutActionsDialog
        onDismiss={() => setBranchCheckout('')}
        visible={!!branchToCheckout}
        repo={repo}
        branchName={branchToCheckout}
        dispatch={dispatch}
      />
    </>
  );
};
