import * as React from 'react';
import {Animated, ScrollView, Text, View} from 'react-native';
import {ScrollView as GestureScrollView} from 'react-native-gesture-handler';
import {FileChangeListItemWithCheckbox} from '@components/file-change-list-item';
import {ChangesArrayItem} from '@services';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkDivider} from '@components/shark-divider';
import {SharkCheckbox} from '@components/shark-checkbox';
import {SharkButton} from '@components/shark-button';
import {useTranslation} from 'react-i18next';
import {SrOnly} from '@components/sr-only';

interface StagedChangesProps {
  removeFromStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  stagedChanges: ChangesArrayItem[];
  onCommit: () => void;
  inSheet?: boolean;
  selectedStagedChanges: ChangesArrayItem[];
  setSelectedStagedChanges: (v: ChangesArrayItem[]) => void;
  hideHeader?: boolean;
}

export const StagedChangesHeader = ({
  removeFromStaged,
  stagedChanges,
  onCommit,
  inSheet,
  selectedStagedChanges,
  setSelectedStagedChanges,
}: StagedChangesProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const stagedBtnText = selectedStagedChanges.length
    ? t('unstageAction')
    : t('commitAllAction');
  const buttonType = selectedStagedChanges.length ? 'outline' : 'primary';

  const stagedBtnAction = React.useMemo(() => {
    if (selectedStagedChanges.length) {
      return async () => {
        await removeFromStaged(selectedStagedChanges);
        setSelectedStagedChanges([]);
      };
    }
    return onCommit;
  }, [
    onCommit,
    removeFromStaged,
    selectedStagedChanges,
    setSelectedStagedChanges,
  ]);

  const floatingStyle = inSheet ? styles.subheaderFloating : {};

  const disabled = !stagedChanges.length;

  const disabledStyles = disabled ? styles.disabledStyling : {};

  return (
    <>
      <SrOnly>
        <Text accessibilityRole={'header'}>{t('stagedHeading')}</Text>
      </SrOnly>
      <View style={[styles.subheaderContainer, floatingStyle]}>
        <View style={styles.checkboxContainer}>
          <SharkCheckbox
            checked={
              stagedChanges.length === selectedStagedChanges.length &&
              !!stagedChanges.length
            }
            indeterminate={!!selectedStagedChanges.length}
            onValueChange={selectAll => {
              setSelectedStagedChanges(selectAll ? stagedChanges : []);
            }}
            disabled={disabled}>
            <Text
              style={[styles.subheaderText, disabledStyles]}
              accessible={true}
              accessibilityLabel={t('allStagedItemsSelected')}>
              {t('stagedHeading')}
            </Text>
          </SharkCheckbox>
        </View>
        <SharkButton
          onPress={stagedBtnAction}
          text={stagedBtnText}
          style={styles.calloutButton}
          type={buttonType}
          disabled={disabled}
        />
      </View>
      {!!stagedChanges.length && <SharkDivider />}
    </>
  );
};

export const StagedChanges = (props: StagedChangesProps) => {
  const {
    stagedChanges,
    selectedStagedChanges,
    setSelectedStagedChanges,
    hideHeader,
    inSheet,
  } = props;
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

  const itemList = stagedChanges.map(props => {
    const isChecked = !!selectedStagedChanges.find(
      change => change.fileName === props.fileName,
    );
    return (
      <React.Fragment key={props.fileName}>
        <View>
          <FileChangeListItemWithCheckbox
            isChecked={isChecked}
            key={props.fileName}
            onToggle={() => toggleSelected(props)}
            {...props}
          />
        </View>
        <SharkDivider />
      </React.Fragment>
    );
  });

  return (
    <>
      {!hideHeader && <StagedChangesHeader {...props} />}
      {!inSheet && <ScrollView>{itemList}</ScrollView>}
      {!!inSheet && <GestureScrollView>{itemList}</GestureScrollView>}
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  subheaderFloating: {
    backgroundColor: theme.colors.floating_surface,
  },
  subheaderContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.m,
    paddingRight: theme.spacing.m,
    paddingLeft: theme.spacing.xs,
    alignItems: 'center',
  },
  subheaderText: {
    marginLeft: theme.spacing.xs,
    ...theme.textStyles.callout_01,
    color: theme.colors.label_high_emphasis,
  },
  checkboxContainer: {
    flexGrow: 1,
  },
  calloutButton: {
    marginLeft: theme.spacing.m,
  },
  disabledStyling: {
    opacity: theme.opacity.disabled,
  },
});
