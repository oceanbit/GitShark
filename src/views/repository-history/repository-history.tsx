import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommitList} from '@components/commit-list';
import {HistoryBranchDropdown} from './components/history-branch-dropdown';
import {OverlayDropdownContent} from '@components/overlay-dropdown-content';
import {Branches} from '../branches';
import {useSelector} from 'react-redux';
import {RootState, getGitLog} from '@store';
import {useThunkDispatch} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {RepositoryHeader} from '@components/repository-header';

export const RepositoryHistory = () => {
  const {commits} = useSelector((state: RootState) => state.commits);
  const dispatch = useThunkDispatch();

  const [showBranches, setShowBranches] = React.useState(false);

  React.useEffect(() => {
    dispatch(getGitLog()).then(({error}: any) => {
      if (error) console.error(error);
    });
  }, [dispatch]);

  const history = useNavigation();

  const bottomLayer = React.useMemo(
    () => (
      <CommitList
        commits={commits}
        onPress={() => {
          history.navigate('CommitDetails');
        }}
      />
    ),
    [commits, history],
  );

  const topLayer = React.useMemo(() => <Branches />, []);

  const header = React.useMemo(
    () => (
      <HistoryBranchDropdown
        onFavorite={() => {}}
        setExpanded={setShowBranches}
        expanded={showBranches}
        favorite={false}
        branchName={'the_big_branch'}
      />
    ),
    [setShowBranches, showBranches],
  );

  return (
    <>
      <RepositoryHeader />
      <View style={styles.container}>
        <OverlayDropdownContent
          header={header}
          expanded={showBranches}
          topLayer={topLayer}
          bottomLayer={bottomLayer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
