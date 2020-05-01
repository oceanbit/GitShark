import * as React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';

import {DatabaseLoadedContext, RepoContext} from '../../constants';
import {CommitList} from '../../components/commit-list';
import {HistoryBranchDropdown} from '../../components/history-branch-dropdown';
import {gitLog, GitLogCommit} from '../../services';
import {DropdownContent} from '../../components/dropdown-content';

export const RepositoryHistory = () => {
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const {repo} = React.useContext(RepoContext);
  const [showBranches, setShowBranches] = React.useState(false);

  const [commits, setCommits] = React.useState<GitLogCommit[]>([]);

  React.useEffect(() => {
    if (!isDBLoaded) {
      return;
    }
    gitLog({repo: repo!})
      .then(repoCommits => setCommits(repoCommits))
      .catch(console.error);
  }, [isDBLoaded, repo]);

  const bottomLayer = React.useMemo(
    () => (
      <ScrollView>
        <CommitList commits={commits} />
      </ScrollView>
    ),
    [commits],
  );

  return (
    <View style={styles.container}>
      <DropdownContent
        header={
          <HistoryBranchDropdown
            onFavorite={() => {}}
            setExpanded={setShowBranches}
            expanded={showBranches}
            favorite={false}
            branchName={'the_big_branch'}
          />
        }
        expanded={showBranches}
        topLayer={
          <View>
            <Text>Hello</Text>
          </View>
        }
        bottomLayer={bottomLayer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
