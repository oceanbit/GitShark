import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {RepoContext} from '../../constants/repo-context';
import {CommitList} from '../../components/commit-list/commit-list';
import {HistoryBranchDropdown} from '../../components/history-branch-dropdown/history-branch-dropdown';
import {gitLog, GitLogCommit} from '../../services/git/gitLog';

export const RepositoryHistory = () => {
  const {repo} = React.useContext(RepoContext);

  const [commits, setCommits] = React.useState<GitLogCommit[]>([]);

  React.useEffect(() => {
    gitLog({repo: repo!})
      .then(repoCommits => setCommits(repoCommits))
      .catch(console.error);
  }, [repo]);

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
