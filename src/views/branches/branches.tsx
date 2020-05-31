/**
 * Keep in mind that despite being a "View", this is embedded inside of
 * "repository-history" as it's part of the dropdown component there
 */
import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState, getBranchData} from '@store';
import {useThunkDispatch} from '@hooks';
import {BranchesUI} from './branches.ui';

export const Branches = () => {
  const {localBranches, remoteBranches, remotes} = useSelector(
    (state: RootState) => state.branches,
  );
  const dispatch = useThunkDispatch();

  const {repo} = useSelector((state: RootState) => state.repository);

  React.useEffect(() => {
    if (!repo) return;
    dispatch(getBranchData(repo.path));
  }, [repo, dispatch]);

  if (!repo) return null;

  return (
    <BranchesUI
      localBranches={localBranches}
      repo={repo}
      remotes={remotes}
      remoteBranches={remoteBranches}
    />
  );
};
