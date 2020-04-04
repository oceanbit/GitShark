import * as React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SubheaderWithButton} from '../../../components/subheaders/subheader-with-button';
import {FileChangeListItemWithCheckbox} from '../../../components/file-change-list-item/file-change-list-item-with-checkbox';
import {ChangesArrayItem} from '../../../services/git';
import {theme} from '../../../constants/theme';
import {useNavigation} from '@react-navigation/native';

interface StagedChangesProps {
  removeFromStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  stagedChanges: ChangesArrayItem[];
}

export const StagedChanges = ({
  removeFromStaged,
  stagedChanges,
}: StagedChangesProps) => {
  const history = useNavigation();

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
    return () => {
      history.navigate('Commit');
    };
  }, [removeFromStaged, selectedStagedChanges, history]);

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

  return (
    <>
      <SubheaderWithButton
        buttonText={stagedBtnText}
        calloutText={'Staged'}
        onButtonClick={stagedBtnAction}
        style={showStagedDivider ? styles.underlineHeader : {}}
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

const styles = StyleSheet.create({
  changesList: {
    paddingHorizontal: 16,
  },
  underlineHeader: {
    borderBottomColor: theme.colors.outlineColor,
    borderBottomWidth: 1,
  },
});
