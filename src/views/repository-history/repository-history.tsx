import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {RepoContext} from '../../constants/repo-context';
import {CommitList} from '../../components/commit-list/commit-list';
import {HistoryBranchDropdown} from '../../components/history-branch-dropdown/history-branch-dropdown';

export const RepositoryHistory = () => {
  const {repo} = React.useContext(RepoContext);

  return (
    <>
      <View style={styles.container}>
        <HistoryBranchDropdown
          onFavorite={() => {}}
          favorite={false}
          branchName={'the_big_branch'}
        />
        <ScrollView>
          <CommitList />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
