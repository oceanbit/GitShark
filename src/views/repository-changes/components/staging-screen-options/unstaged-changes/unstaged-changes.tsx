import * as React from 'react';
import {View, ScrollView} from 'react-native';
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
        unstagedChanges={unstagedChanges}
        selectedUnstagedChanges={selectedUnstagedChanges}
        setSelectedUnstagedChanges={setSelectedUnstagedChanges}
      />
      {!!unstagedChanges.length && <SharkDivider />}
      <ScrollView>
        {unstagedChanges.map((props, i, arr) => {
          const isChecked = !!selectedUnstagedChanges.find(
            change => change.fileName === props.fileName,
          );
          return (
            <React.Fragment key={props.fileName}>
              <View style={styles.changeItem}>
                <FileChangeListItemWithCheckbox
                  isChecked={isChecked}
                  onToggle={() => toggleSelected(props)}
                  {...props}
                />
              </View>
              {i !== arr.length - 1 && <SharkDivider />}
            </React.Fragment>
          );
        })}
      </ScrollView>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  changeItem: {},
});
