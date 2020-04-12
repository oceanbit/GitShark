import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {DatabaseLoadedContext, RepoContext} from '../../constants';
import {CommitList} from '../../components/commit-list';
import {HistoryBranchDropdown} from '../../components/history-branch-dropdown';
import {gitLog, GitLogCommit} from '../../services';

export const RepositoryHistory = () => {
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const {repo} = React.useContext(RepoContext);

  const [commits, setCommits] = React.useState<GitLogCommit[]>([]);

  React.useEffect(() => {
    if (!isDBLoaded) {
      return;
    }
    gitLog({repo: repo!})
      .then(repoCommits => setCommits(repoCommits))
      .catch(console.error);
  }, [isDBLoaded, repo]);

  return (
    <>
      <View style={styles.container}>
        <HistoryBranchDropdown
          onFavorite={() => {}}
          favorite={false}
          branchName={'the_big_branch'}
        />
        <ScrollView>
          <CommitList commits={commits} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
