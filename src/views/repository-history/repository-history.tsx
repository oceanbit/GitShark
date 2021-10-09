import * as React from 'react';
import {useSelector} from 'react-redux';
import {getGitLog, RootState} from '@store';
import {useThunkDispatch} from '@hooks';
import {GitLogCommit} from '@services';
import {useNavigation} from '@react-navigation/native';
import {RepositoryHistoryUI} from './repository-history.ui';
import {Branches} from '../branches';
import {NavProps} from '@types';

export const RepositoryHistory = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {commits, error: commitsError} = useSelector(
    (state: RootState) => state.commits,
  );
  const dispatch = useThunkDispatch();

  React.useEffect(() => {
    dispatch(getGitLog()).then(({error}: any) => {
      if (error) console.error(error);
    });
  }, [dispatch]);

  const history = useNavigation<NavProps>();

  const onCommitNavigate = (commit: GitLogCommit) => {
    history.navigate('CommitDetails', {
      commitId: commit.oid,
    });
  };

  const topLayer = React.useMemo(() => <Branches />, []);

  return (
    <RepositoryHistoryUI
      commits={commits}
      error={commitsError}
      onCommitNavigate={onCommitNavigate}
      topLayer={topLayer}
      repo={repo}
      branchName={repo?.currentBranchName || ''}
    />
  );
};
