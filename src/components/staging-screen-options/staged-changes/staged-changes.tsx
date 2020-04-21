import * as React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {SharkSubheader} from '../../shark-subheader';
import {FileChangeListItemWithCheckbox} from '../../file-change-list-item';
import {ChangesArrayItem} from '../../../services';
import {theme} from '../../../constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

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

  const [showStagedDivider, setShowStagedDivider] = React.useState(false);

  const onStagedScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event.nativeEvent.contentOffset.y) {
      setShowStagedDivider(false);
      return;
    }
    setShowStagedDivider(true);
  };

  const stagedBtnText = selectedStagedChanges.length ? 'Unstage' : 'Commit All';

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

  const underlineStyle = showStagedDivider ? styles.underlineHeader : {};
  const floatingStyle = inSheet ? styles.subheaderFloating : {};

  return (
    <>
      <SharkSubheader
        buttonText={stagedBtnText}
        calloutText={'Staged'}
        onButtonClick={stagedBtnAction}
        style={[underlineStyle, floatingStyle]}
      />
      <ScrollView style={styles.changesList} onScroll={onStagedScroll}>
        {stagedChanges.map(props => {
          const isChecked = !!selectedStagedChanges.find(
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
  underlineHeader: {
    borderBottomColor: theme.colors.divider,
    borderBottomWidth: 1,
  },
  subheaderFloating: {
    backgroundColor: theme.colors.floating_surface,
  },
});
