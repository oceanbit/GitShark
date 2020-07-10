import * as React from 'react';
import {Alert, View, Text} from 'react-native';
import {fs, theme} from '@constants';
import {AppDialog} from '@components/dialog';
import git from 'isomorphic-git/index.umd.min.js';
import {ErrorMessageBox} from '@components/error-message-box';
import {FolderSelectButton} from '@components/folder-select-button';
import {createNewRepo} from '@services';
import {SharkButton} from '@components/shark-button';
import {SharkTextInput} from '@components/shark-text-input';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {Picker} from '@react-native-community/picker';
import {SharkCheckbox} from '@components/shark-checkbox';

interface PushDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const PushDialog = ({onDismiss, visible}: PushDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [path, setPath] = React.useState('');
  const [repoName, setRepoName] = React.useState('');
  const [errorStr, setErrorStr] = React.useState('');

  const parentOnDismiss = (bool: boolean) => {
    setPath('');
    setRepoName('');
    setErrorStr('');
    onDismiss(bool);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Push'}
      text={'Push local changes to a remote repository.'}
      main={
        <>
          <Text style={styles.pickerLabel}>Branch</Text>

          {/* TODO: REPLACE WITH REAL SEASIDE SELECT COMPONENT */}
          <View style={styles.pickerView}>
            <Picker
              selectedValue={'main'}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item label="main" value="main" />
              <Picker.Item label="javascript" value="js" />
            </Picker>
          </View>

          <Text style={styles.pickerLabel}>Destination</Text>

          <View style={styles.pickerView}>
            <Picker
              selectedValue={'main'}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item label="origin/main" value="main" />
              <Picker.Item label="origin/develop" value="js" />
            </Picker>
          </View>

          <View style={styles.checkbox}>
            <SharkCheckbox checked={false} />
            <Text>Force Push</Text>
          </View>
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text="Cancel"
          />
          <SharkButton onPress={() => {}} type="primary" text="Go Do" />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  pickerLabel: {
    marginBottom: theme.spacing.xs,
    ...theme.textStyles.overline_02,
  },
  pickerView: {
    borderWidth: theme.borders.normal,
    borderColor: theme.colors.on_surface_secondary,
    borderRadius: theme.borderRadius.regular,
    marginBottom: theme.spacing.m,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: theme.colors.on_surface,
    ...theme.textStyles.body_02,
  },
  cancelBtn: {
    marginRight: theme.spacing.m,
  },
  dialogActions: {
    marginTop: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
