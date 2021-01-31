/**
 * Keep in mind that despite being a "View", this is embedded inside of
 * "repository-history" as it's part of the dropdown component there
 */
import * as React from 'react';
import {useSelector} from 'react-redux';
import {getBranchData, getLocalBranches, RootState} from '@store';
import {useThunkDispatch} from '@hooks';
import {
  createBranch,
  deleteLocalBranch,
  renameBranch,
  resetFiles,
} from '@services';
import {BranchesUI} from './branches.ui';
import {CreateBranchDialog} from './components/create-branch-dialog';
import {ConfirmCheckoutDialog} from './components/confirm-checkout-dialog';
import {OnCheckoutActionsDialog} from './components/on-checkout-action-dialog';
import {CreateRemoteDialog} from './components/create-remote-dialog';
import {OnCreateRemoteActionDialog} from './components/on-create-remote-action-dialog';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

interface InitBranchCheckoutType {
  branchName: string;
  remote: false | string;
  // If `false`, show the `confirm checkout` dialog
  // If `true`, start the `checkout` dialog and start checkout
  // If `null`, don't show any dialog
  confirmed: boolean | null;
}

const initialBranchCheckout: InitBranchCheckoutType = {
  branchName: '',
  remote: false,
  confirmed: null,
};

export const Branches = () => {
  const {t} = useTranslation();

  const [createBranchDialog, setCreateBranchDialog] = React.useState(false);
  // For the branch dialog
  const [createRemoteDialog, setCreateRemoteDialog] = React.useState(false);
  const [errorStr, setErrorStr] = React.useState('');
  const {
    localBranches,
    remoteBranches,
    remotes,
    error: branchError,
  } = useSelector((state: RootState) => state.branches);
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

  const [
    branchToCheckout,
    setBranchCheckout,
  ] = React.useState<InitBranchCheckoutType>(initialBranchCheckout);

  const resetAndCheckout = async () => {
    const files = [
      ...unstaged.map(f => f.fileName),
      ...staged.map(f => f.fileName),
    ];

    await resetFiles({
      path: repo!.path,
      dispatch,
      files,
    });
    setBranchCheckout(v => ({...v, confirmed: true}));
  };

  const [addRemoteMeta, setAddRemoteMeta] = React.useState<{
    remoteName?: string;
    remoteURL?: string;
  }>({});

  const onCheckoutBranch = React.useCallback(
    async (branchName: string, remote: string | false = false) => {
      if (staged.length || unstaged.length) {
        // Warn the user that their files will be reset before checkout
        setBranchCheckout({
          branchName,
          confirmed: false,
          remote: remote,
        });
        return;
      }
      setBranchCheckout({
        branchName,
        confirmed: true,
        remote: remote,
      });
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

  if (branchError)
    return (
      <View>
        <Text>{t('branchesErrStr')}</Text>
        <Text>{branchError}</Text>
      </View>
    );

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
        onCheckoutRemoteBranch={onCheckoutBranch}
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
      <CreateRemoteDialog
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
        visible={branchToCheckout.confirmed === false}
        onDismiss={async doCheckout => {
          // Close the dialog
          setBranchCheckout(v => ({...v, confirmed: null}));
          // Do the reset and enable work to open actual dialog
          if (doCheckout) {
            resetAndCheckout();
          }
        }}
      />
      <OnCheckoutActionsDialog
        onDismiss={() => setBranchCheckout(initialBranchCheckout)}
        visible={branchToCheckout.confirmed === true}
        repo={repo}
        remote={branchToCheckout.remote}
        branchName={branchToCheckout.branchName}
        dispatch={dispatch}
      />
    </>
  );
};
