import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommitList} from '@components/commit-list';
import {HistoryBranchDropdown} from './components/history-branch-dropdown';
import {OverlayDropdownContent} from '@components/overlay-dropdown-content';
import {RepositoryHeader} from '@components/repository-header';

interface RepositoryHistoryUIProps {
  commits: any[];
  onCommitNavigate: () => void;
  topLayer: React.ReactNode;
}
export const RepositoryHistoryUI = ({
  commits,
  onCommitNavigate,
  topLayer,
}: RepositoryHistoryUIProps) => {
  const [showBranches, setShowBranches] = React.useState(false);

  const bottomLayer = React.useMemo(
    () => <CommitList commits={commits} onPress={onCommitNavigate} />,
    [commits, onCommitNavigate],
  );

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
