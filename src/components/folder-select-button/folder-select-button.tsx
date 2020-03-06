import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import RNFileSelector from 'react-native-file-selector';

interface FolderSelectButtonProps {
  onFolderSelect: (path: string) => void;
  path: string;
}
export const FolderSelectButton = ({
  onFolderSelect,
  path,
}: FolderSelectButtonProps) => {
  const selectDirectory = () => {
    RNFileSelector.Show({
      title: 'Select File',
      chooseFolderMode: true,
      onDone: (selectedPath: string) => {
        console.log('file selected: ' + selectedPath);
        onFolderSelect(selectedPath);
      },
      onCancel: () => {
        console.log('cancelled');
      },
    });
  };

  return (
    <>
      {!path && (
        <TouchableRipple onPress={() => selectDirectory()}>
          <View style={styles.selectFolderBtn}>
            <Icon size={24} name="folder" color={theme.colors.accent} />
            <Text style={styles.selectFolderText}>Select folder...</Text>
          </View>
        </TouchableRipple>
      )}
      {!!path && (
        <TouchableRipple onPress={() => selectDirectory()}>
          <View style={styles.selectFolderBtn}>
            <Text
              numberOfLines={1}
              style={[styles.selectFolderText, styles.selectFolderBtnWithPath]}>
              {path}
            </Text>
            <Icon size={24} name="folder-outline" color={theme.colors.accent} />
          </View>
        </TouchableRipple>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  selectFolderBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.outlineColor,
    borderWidth: 2,
    borderRadius: theme.roundness,
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectFolderBtnWithPath: {
    flexGrow: 1,
    color: theme.colors.disabled,
    marginRight: 12,
  },
  selectFolderText: {
    color: theme.colors.accent,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
  },
});
