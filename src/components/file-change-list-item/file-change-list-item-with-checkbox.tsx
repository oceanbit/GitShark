import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {ChangesArrayItem} from '../../services/git';
import {FileChangeListItem} from './file-change-list-item';
import {Checkbox} from 'react-native-paper';

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
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.checkbox}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={onToggle}
        />
      </View>
      <FileChangeListItem
        fileName={fileName}
        onPress={onPress}
        fileStatus={fileStatus}
        style={styles.listItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 16,
    marginBottom: 8,
  },
  listItem: {
    flexGrow: 1,
  },
});
