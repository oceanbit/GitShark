import * as React from 'react';
// TODO: This WAS importing from `react-native-gesture-handler`. Still may be needed, double check
import {View} from 'react-native';
import {theme} from '@constants';
import {StagedChanges, StagedChangesHeader} from './staged-changes';
import {ChangesArrayItem} from '@services';
import {UnstagedChanges} from './unstaged-changes';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkBottomSheet} from '@components/shark-bottom-sheet';

const minSheetHeight = 100;

interface StageSheetViewProps {
  unstagedChanges: ChangesArrayItem[];
  stagedChanges: ChangesArrayItem[];
  addToStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  removeFromStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  onDiscard: (selectedChanges: ChangesArrayItem[]) => void;
  onIgnore: (selectedChanges: ChangesArrayItem[]) => void;
  onCommit: () => void;
}

export const StageSheetView = ({
  unstagedChanges,
  stagedChanges,
  addToStaged,
  removeFromStaged,
  onCommit,
  onDiscard,
  onIgnore,
}: StageSheetViewProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const [parentHeight, setParentHeight] = React.useState(0);

  // + 2 because of the height of the top border
  const maxSheetHeight = parentHeight + 2;

  const maxUnstagedHeight = parentHeight - minSheetHeight;

  const [selectedStagedChanges, setSelectedStagedChanges] = React.useState<
    ChangesArrayItem[]
  >([]);

  const stagedProps = {
    onCommit: onCommit,
    removeFromStaged: removeFromStaged,
    stagedChanges: stagedChanges,
    inSheet: true,
    selectedStagedChanges: selectedStagedChanges,
    setSelectedStagedChanges: setSelectedStagedChanges,
    hideHeader: true,
  };

  return (
    <View
      style={styles.container}
      onLayout={event => {
        const {height} = event.nativeEvent.layout;
        setParentHeight(height);
      }}>
      <View style={{maxHeight: parentHeight ? maxUnstagedHeight : '100%'}}>
        <UnstagedChanges
          addToStaged={addToStaged}
          unstagedChanges={unstagedChanges}
          onDiscard={onDiscard}
          onIgnore={onIgnore}
        />
      </View>
      <SharkBottomSheet
        minSheetHeight={minSheetHeight}
        maxSheetHeight={maxSheetHeight}
        parentHeight={parentHeight}
        header={<StagedChangesHeader {...stagedProps} />}
        contents={<StagedChanges {...stagedProps} />}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
});
