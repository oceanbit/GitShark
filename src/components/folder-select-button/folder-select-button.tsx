import * as React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {legacyTheme} from '../../constants/theme';
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
            <Icon size={24} name="folder" color={legacyTheme.colors.accent} />
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
            <Icon size={24} name="folder-outline" color={legacyTheme.colors.accent} />
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
    borderColor: legacyTheme.colors.outlineColor,
    borderWidth: 2,
    borderRadius: legacyTheme.roundness,
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectFolderBtnWithPath: {
    flexGrow: 1,
    color: legacyTheme.colors.disabled,
    marginRight: 12,
  },
  selectFolderText: {
    color: legacyTheme.colors.accent,
    marginLeft: 8,
    ...textStyles.callout,
  },
});
