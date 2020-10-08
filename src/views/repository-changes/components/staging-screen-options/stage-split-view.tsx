import {View} from 'react-native';
import {UnstagedChanges} from './unstaged-changes';
import {StagedChanges} from './staged-changes';
import * as React from 'react';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {ChangesArrayItem} from '@services';
import {SharkDivider} from '@components/shark-divider';
import {mediaQuery, useDimensions} from 'react-native-responsive-ui';
import {theme} from '@constants';

interface StageSplitViewProps {
  unstagedChanges: ChangesArrayItem[];
  stagedChanges: ChangesArrayItem[];
  addToStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  removeFromStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  onCommit: () => void;
  onDiscard: (selectedChanges: ChangesArrayItem[]) => void;
  onIgnore: (selectedChanges: ChangesArrayItem[]) => void;
}

export const StageSplitView = ({
  addToStaged,
  unstagedChanges,
  removeFromStaged,
  stagedChanges,
  onCommit,
  onDiscard,
  onIgnore,
}: StageSplitViewProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const tint_on_surface_01 = useDynamicValue(theme.colors.tint_on_surface_01);

  const {width, height} = useDimensions();

  const isTablet = mediaQuery(
    {minWidth: theme.breakpoints.tablet},
    width,
    height,
  );

  const containerTablet = isTablet
    ? {
        maxWidth: theme.breakpoints.singlePanelMaxWidth,
        marginHorizontal: 'auto',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: tint_on_surface_01,
      }
    : {};

  return (
    <>
      <View style={[styles.container, containerTablet]}>
        <View style={styles.halfSection}>
          <UnstagedChanges
            addToStaged={addToStaged}
            unstagedChanges={unstagedChanges}
            onDiscard={onDiscard}
            onIgnore={onIgnore}
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
