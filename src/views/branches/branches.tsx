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
} from '@services';
import {BranchesUI} from './branches.ui';
import {CreateBranchDialog} from './components/create-branch-dialog';

export const Branches = () => {
  const [createBranchDialog, setCreateBranchDialog] = React.useState(false);
  // For the branch dialog
  const [errorStr, setErrorStr] = React.useState('');
  const {localBranches, remoteBranches, remotes} = useSelector(
    (state: RootState) => state.branches,
  );
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

  const onCheckoutBranch = React.useCallback(
    async (branchName: string) => {
      await checkoutBranch({branchName, dispatch, repo: repo!});
    },
    [dispatch, repo],
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
    </>
  );
};
