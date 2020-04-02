import * as React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import RNFileSelector from 'react-native-file-selector';
import {textStyles} from '../../constants/text-styles';

interface FolderSelectButtonProps {
  onFolderSelect: (path: string) => void;
  path: string;
  style?: StyleProp<ViewStyle>;
}
export const FolderSelectButton = ({
  onFolderSelect,
  path,
  style,
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
        <TouchableRipple onPress={() => selectDirectory()} style={style}>
          <View style={styles.selectFolderBtn}>
            <Icon size={24} name="folder" color={theme.colors.accent} />
            <Text style={styles.selectFolderText}>Select folder...</Text>
          </View>
        </TouchableRipple>
      )}
      {!!path && (
        <TouchableRipple onPress={() => selectDirectory()} style={style}>
          <View style={styles.selectFolderBtn}>
            <Text
              ellipsizeMode="head"
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
    marginLeft: 8,
    ...textStyles.callout,
  },
});
