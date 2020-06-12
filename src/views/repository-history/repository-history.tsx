import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState, getGitLog, selectCommit} from '@store';
import {useThunkDispatch} from '@hooks';
import {GitLogCommit} from '@services';
import {useNavigation} from '@react-navigation/native';
import {RepositoryHistoryUI} from './repository-history.ui';
import {Branches} from '../branches';

export const RepositoryHistory = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {commits} = useSelector((state: RootState) => state.commits);
  const dispatch = useThunkDispatch();

  React.useEffect(() => {
    dispatch(getGitLog()).then(({error}: any) => {
      if (error) console.error(error);
    });
  }, [dispatch]);

  const history = useNavigation();

  const onCommitNavigate = (commit: GitLogCommit) => {
    // We should have a way to clean this up later, as-of now, there is no commit selected
    dispatch(selectCommit(commit));
    history.navigate('CommitDetails');
  };

  const topLayer = React.useMemo(() => <Branches />, []);

  return (
    <RepositoryHistoryUI
      commits={commits}
      onCommitNavigate={onCommitNavigate}
      topLayer={topLayer}
      repo={repo}
    />
  );
};
