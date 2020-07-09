import {View} from 'react-native';
import {UnstagedChanges} from './unstaged-changes';
import {StagedChanges} from './staged-changes';
import * as React from 'react';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {ChangesArrayItem} from '@services';
import {SharkDivider} from '@components/shark-divider';

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
        <View style={styles.halfSection}>
          <UnstagedChanges
            addToStaged={addToStaged}
            unstagedChanges={unstagedChanges}
          />
        </View>
        <SharkDivider />
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
    flex: 1,
  },
  halfSection: {
    height: '50%',
  },
});
