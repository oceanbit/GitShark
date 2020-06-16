import * as React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import {SharkSubheader} from '@components/shark-subheader';
import {FileChangeListItemWithCheckbox} from '@components/file-change-list-item';
import {ChangesArrayItem} from '@services';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkDivider} from '@components/shark-divider';
import {SharkCheckbox} from '@components/shark-checkbox';

interface StagedChangesProps {
  removeFromStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  stagedChanges: ChangesArrayItem[];
  onCommit: () => void;
  inSheet?: boolean;
}

export const StagedChanges = ({
  removeFromStaged,
  stagedChanges,
  onCommit,
  inSheet,
}: StagedChangesProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [selectedStagedChanges, setSelectedStagedChanges] = React.useState<
    ChangesArrayItem[]
  >([]);

  const stagedBtnText = selectedStagedChanges.length ? 'Unstage' : 'Commit all';
  const buttonType = selectedStagedChanges.length ? 'outline' : 'primary';

  const stagedBtnAction = React.useMemo(() => {
    if (selectedStagedChanges.length) {
      return async () => {
        await removeFromStaged(selectedStagedChanges);
        setSelectedStagedChanges([]);
      };
    }
    return onCommit;
  }, [onCommit, removeFromStaged, selectedStagedChanges]);

  const toggleSelected = (change: ChangesArrayItem) => {
    const filteredUnstaged = selectedStagedChanges.filter(
      isChange => isChange.fileName !== change.fileName,
    );
    // The array does not contain the item
    if (filteredUnstaged.length !== selectedStagedChanges.length) {
      setSelectedStagedChanges(filteredUnstaged);
      return;
    }
    setSelectedStagedChanges([...selectedStagedChanges, change]);
  };

  const floatingStyle = inSheet ? styles.subheaderFloating : {};

  return (
    <>
      <SharkSubheader
        buttonText={stagedBtnText}
        calloutText={'Staged'}
        onButtonClick={stagedBtnAction}
        style={floatingStyle}
        buttonType={buttonType}
        buttonDisabled={!stagedChanges.length}
        leftChild={
          <SharkCheckbox
            checked={
              stagedChanges.length === selectedStagedChanges.length &&
              !!stagedChanges.length
            }
            indeterminate={!!selectedStagedChanges.length}
            onValueChange={() => {}}
          />
        }
      />
      {!!stagedChanges.length && <SharkDivider />}
      <ScrollView>
        {stagedChanges.map((props, i, arr) => {
          const isChecked = !!selectedStagedChanges.find(
            change => change.fileName === props.fileName,
          );
          return (
            <React.Fragment key={props.fileName}>
              <View style={styles.changeItem}>
                <FileChangeListItemWithCheckbox
                  isChecked={isChecked}
                  key={props.fileName}
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
  changeItem: {
    paddingHorizontal: 16,
  },
  subheaderFloating: {
    backgroundColor: theme.colors.floating_surface,
  },
});
