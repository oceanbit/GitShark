import {Text, View} from 'react-native';
import * as React from 'react';
import {ChangesArrayItem} from '@services';
import {FileChangeListItem} from './file-change-list-item';
import {SharkCheckbox} from '../shark-checkbox';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {useTranslation} from 'react-i18next';

interface FileChangeListItemProps {
  fileName: string;
  onPress?: () => void;
  fileStatus: ChangesArrayItem['fileStatus'];
  onToggle?: () => void;
  isChecked: boolean;
}

export const FileChangeListItemWithCheckbox = ({
  fileName,
  onPress = () => {},
  fileStatus,
  onToggle = () => {},
  isChecked,
}: FileChangeListItemProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const checkboxLabel = isChecked
    ? `Unselect "${fileName}"`
    : `Select "${fileName}"`;

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.checkbox}>
        <SharkCheckbox
          checked={isChecked}
          onValueChange={onToggle}
          label={checkboxLabel}
        />
      </View>
      <FileChangeListItem
        fileName={fileName}
        onPress={onPress}
        label={t('openFile', {fileName})}
        fileStatus={fileStatus}
        style={styles.listItem}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  checkbox: {
    padding: theme.spacing.xs,
  },
  listItem: {
    flexGrow: 1,
    paddingLeft: 0,
  },
});
