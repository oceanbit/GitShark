import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState, getGitLog} from '@store';
import {useThunkDispatch} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {RepositoryHistoryUI} from './repository-history.ui';
import {Branches} from '../branches';

export const RepositoryHistory = () => {
  const {commits} = useSelector((state: RootState) => state.commits);
  const dispatch = useThunkDispatch();

  React.useEffect(() => {
    dispatch(getGitLog()).then(({error}: any) => {
      if (error) console.error(error);
    });
  }, [dispatch]);

  const history = useNavigation();

  const onCommitNavigate = () => {
    history.navigate('CommitDetails');
  };

  const topLayer = React.useMemo(() => <Branches />, []);

  return (
    <RepositoryHistoryUI
      commits={commits}
      onCommitNavigate={onCommitNavigate}
      topLayer={topLayer}
    />
  );
};
