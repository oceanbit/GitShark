import {View} from 'react-native';
import {UnstagedChanges} from './unstaged-changes';
import {StagedChanges} from './staged-changes';
import * as React from 'react';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {theme} from '../../constants';
import {ChangesArrayItem} from '../../services';

interface StageSplitViewProps {
  unstagedChanges: ChangesArrayItem[];
  stagedChanges: ChangesArrayItem[];
  addToStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  removeFromStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  onCommit: () => void;
}

export const StageSplitView = ({
  addToStaged,
  unstagedChanges,
  removeFromStaged,
  stagedChanges,
  onCommit,
}: StageSplitViewProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.halfSection, styles.firstSection]}>
          <UnstagedChanges
            addToStaged={addToStaged}
            unstagedChanges={unstagedChanges}
          />
        </View>
        <View style={styles.halfSection}>
          <StagedChanges
            removeFromStaged={removeFromStaged}
            stagedChanges={stagedChanges}
            onCommit={onCommit}
          />
        </View>
      </View>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: '100%',
  },
  headingText: {
    marginBottom: 16,
    fontSize: 48,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 16,
  },
  halfSection: {
    height: '50%',
  },
  firstSection: {
    borderBottomColor: theme.colors.divider,
    borderBottomWidth: 1,
  },
  fab: {
    margin: 0,
    padding: 0,
    left: 0,
  },
});
