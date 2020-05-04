import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {DatabaseLoadedContext, RepoContext} from '../../constants';
import {CommitList} from '../../components/commit-list';
import {HistoryBranchDropdown} from '../../components/history-branch-dropdown';
import {gitLog, GitLogCommit} from '../../services';
import {OverlayDropdownContent} from '../../components/overlay-dropdown-content';
import {Branches} from '../branches';

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

  const bottomLayer = React.useMemo(() => <CommitList commits={commits} />, [
    commits,
  ]);

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
    <View style={styles.container}>
      <OverlayDropdownContent
        header={header}
        expanded={showBranches}
        topLayer={topLayer}
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
