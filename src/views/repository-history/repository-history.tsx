import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {RepoContext} from '../../constants/repo-context';
import {CommitList} from '../../components/commit-list/commit-list';
import {HistoryBranchDropdown} from '../../components/history-branch-dropdown/history-branch-dropdown';
import {gitLog, GitLogCommit} from '../../services/git/gitLog';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';

export const RepositoryHistory = () => {
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const {repo} = React.useContext(RepoContext);

  const [commits, setCommits] = React.useState<GitLogCommit[]>([]);

  React.useEffect(() => {
    if (!isDBLoaded) return;
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
