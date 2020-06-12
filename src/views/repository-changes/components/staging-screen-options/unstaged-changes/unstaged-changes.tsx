import * as React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {FileChangeListItemWithCheckbox} from '@components/file-change-list-item';
import {ChangesArrayItem} from '@services';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkDivider} from '@components/shark-divider';
import {FileActionsBar} from '../../file-actions-bar';

interface UnstagedChangesProps {
  addToStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  unstagedChanges: ChangesArrayItem[];
}

export const UnstagedChanges = ({
  addToStaged,
  unstagedChanges,
}: UnstagedChangesProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [selectedUnstagedChanges, setSelectedUnstagedChanges] = React.useState<
    ChangesArrayItem[]
  >([]);
  const [showUnstagedDivider, setShowUnstagedDivider] = React.useState(false);

  const onUnstagedScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event.nativeEvent.contentOffset.y) {
      setShowUnstagedDivider(false);
      return;
    }
    setShowUnstagedDivider(true);
  };

  const onStage = React.useCallback(async () => {
    await addToStaged(selectedUnstagedChanges);
    setSelectedUnstagedChanges([]);
  }, [addToStaged, selectedUnstagedChanges]);

  const onStageAll = React.useCallback(async () => {
    await addToStaged(unstagedChanges);
  }, [addToStaged, unstagedChanges]);

  const toggleSelected = (change: ChangesArrayItem) => {
    const filteredUnstaged = selectedUnstagedChanges.filter(
      unChange => unChange.fileName !== change.fileName,
    );
    // The array does not contain the item
    if (filteredUnstaged.length !== selectedUnstagedChanges.length) {
      setSelectedUnstagedChanges(filteredUnstaged);
      return;
    }
    setSelectedUnstagedChanges([...selectedUnstagedChanges, change]);
  };

  return (
    <>
      <FileActionsBar
        isItemSelected={!!selectedUnstagedChanges.length}
        onStage={onStage}
        onStageAll={onStageAll}
      />
      {showUnstagedDivider && <SharkDivider />}
      <ScrollView style={styles.changesList} onScroll={onUnstagedScroll}>
        {unstagedChanges.map(props => {
          const isChecked = !!selectedUnstagedChanges.find(
            change => change.fileName === props.fileName,
          );
          return (
            <FileChangeListItemWithCheckbox
              isChecked={isChecked}
              key={props.fileName}
              onToggle={() => toggleSelected(props)}
              {...props}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  changesList: {
    paddingHorizontal: 16,
  },
});