import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {FileChangeListItemWithCheckbox} from '@components/file-change-list-item';
import {ChangesArrayItem} from '@services';
import {SharkDivider} from '@components/shark-divider';
import {FileActionsBar} from '../../file-actions-bar';

interface UnstagedChangesProps {
  addToStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  unstagedChanges: ChangesArrayItem[];
  onDiscard: (selectedChanges: ChangesArrayItem[]) => void;
  onIgnore: (selectedChanges: ChangesArrayItem[]) => void;
}

export const UnstagedChanges = ({
  addToStaged,
  unstagedChanges,
  onDiscard,
  onIgnore,
}: UnstagedChangesProps) => {
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

  React.useEffect(() => {
    setSelectedUnstagedChanges([]);
  }, [unstagedChanges]);

  return (
    <>
      <FileActionsBar
        isItemSelected={!!selectedUnstagedChanges.length}
        onStage={onStage}
        onStageAll={onStageAll}
        onDiscard={() => onDiscard(selectedUnstagedChanges)}
        onIgnore={() => onIgnore(selectedUnstagedChanges)}
        unstagedChanges={unstagedChanges}
        selectedUnstagedChanges={selectedUnstagedChanges}
        setSelectedUnstagedChanges={setSelectedUnstagedChanges}
      />
      {!!unstagedChanges.length && <SharkDivider />}
      <ScrollView>
        {unstagedChanges.map(props => {
          const isChecked = !!selectedUnstagedChanges.find(
            change => change.fileName === props.fileName,
          );
          return (
            <React.Fragment key={props.fileName}>
              <View>
                <FileChangeListItemWithCheckbox
                  isChecked={isChecked}
                  onToggle={() => toggleSelected(props)}
                  {...props}
                />
              </View>
              <SharkDivider />
            </React.Fragment>
          );
        })}
      </ScrollView>
    </>
  );
};
