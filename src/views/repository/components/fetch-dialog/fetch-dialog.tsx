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

interface FetchDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const FetchDialog = ({onDismiss, visible}: FetchDialogProps) => {
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
      title={'Fetch'}
      text={'Fetch latest changes from a remote repository.'}
      main={
        <>
          <Text style={styles.pickerLabel}>Remote</Text>

          {/* TODO: REPLACE WITH REAL SEASIDE SELECT COMPONENT */}
          <View style={styles.pickerView}>
            <Picker
              selectedValue={'origin'}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item label="origin" value="origin" />
              <Picker.Item label="upstream" value="upstream" />
            </Picker>
          </View>

          <View style={styles.checkbox}>
            <SharkCheckbox checked={false} />
            <Text style={styles.checkboxText}>Fetch all remotes</Text>
          </View>

          <View style={styles.checkbox}>
            <SharkCheckbox checked={false} />
            <Text style={styles.checkboxText}>Exclude deleted branches</Text>
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
          <SharkButton onPress={() => {}} type="primary" text="Fetch" />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  pickerLabel: {
    marginBottom: theme.spacing.xs,
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
