import * as React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {TouchableRipple, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';
import {AppDialog} from '../dialog/dialog';
import RNFileSelector from 'react-native-file-selector';

export const CreateRepositoryDialog = () => {
  const [path, setPath] = React.useState('');

  const selectDirectory = () => {
    RNFileSelector.Show({
      title: 'Select File',
      chooseFolderMode: true,
      onDone: (selectedPath: string) => {
        console.log('file selected: ' + selectedPath);
        setPath(selectedPath);
      },
      onCancel: () => {
        console.log('cancelled');
      },
    });
  };

  return (
    <AppDialog
      title={'Create repository'}
      text={'The repository will be created from a local folder.'}
      main={
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
                  style={[
                    styles.selectFolderText,
                    styles.selectFolderBtnWithPath,
                  ]}>
                  {path}
                </Text>
                <Icon
                  size={24}
                  name="folder-outline"
                  color={theme.colors.accent}
                />
              </View>
            </TouchableRipple>
          )}
          <TextInput placeholder={'Repository name'} style={styles.textInput} />
        </>
      }
      actions={
        <>
          <Button
            onPress={() => {}}
            mode="outlined"
            color={theme.colors.accent}
            style={styles.cancelBtn}>
            Cancel
          </Button>
          <Button
            onPress={() => {}}
            mode="contained"
            color={theme.colors.accent}>
            Create
          </Button>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    margin: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  dialogTitle: {
    fontWeight: '500',
    marginBottom: 4,
    ...textStyles.headline_03,
  },
  mainText: {
    color: '#142952',
    opacity: 0.6,
    marginBottom: 20,
    ...textStyles.body_02,
  },
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
  textInput: {
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: theme.colors.outlineColor,
    borderRadius: theme.roundness,
  },
  cancelBtn: {
    borderColor: theme.colors.outlineColor,
    borderWidth: 2,
    marginRight: 16,
  },
  dialogActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
