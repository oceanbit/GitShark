import * as React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {AppDialog} from '@components/dialog';
import {SharkTextInput} from '@components/shark-text-input';
import {ErrorMessageBox} from '@components/error-message-box';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkCheckbox} from '@components/shark-checkbox';
import {theme} from '@constants';

interface AddRemoteDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  onRemoteCreate: (props: {remoteName: string; remoteURL: string}) => void;
  // The array of remote names, to validate user input against
  remotes: string[];
  errorStr: string;
}

export const AddRemoteDialog = ({
  onDismiss,
  visible,
  onRemoteCreate,
  remotes,
  errorStr,
}: AddRemoteDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  // const [branchName, setBranchName] = React.useState('');
  const [remoteName, setRemoteName] = React.useState('');
  const [remoteURL, setRemoteURL] = React.useState('');

  React.useEffect(() => {
    if (visible) return;
    // When dismissed via `visible=false`, reset the values within
    setRemoteName('');
  }, [visible]);

  const parentOnDismiss = (bool: boolean) => {
    setRemoteName('');
    setRemoteURL('');
    onDismiss(bool);
  };

  const isNameTaken = remotes.includes(remoteName);

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Add remote'}
      text={'Add a remote to your repository'}
      main={
        <>
          <SharkTextInput
            placeholder={'Remote URL'}
            value={remoteURL}
            onChangeText={val => setRemoteURL(val)}
            postfixIcon={'paste'}
          />
          <SharkTextInput
            placeholder={'Remote Name'}
            value={remoteName}
            onChangeText={val => setRemoteName(val)}
            errorStr={isNameTaken ? 'Remote name is already taken' : ''}
          />
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text={'Cancel'}
          />
          <SharkButton
            onPress={() => onRemoteCreate({remoteName, remoteURL})}
            type="primary"
            disabled={isNameTaken}
            text={'Create'}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: theme.spacing.xs,
  },
  cancelBtn: {
    borderColor: theme.colors.tint_on_surface_16,
    borderWidth: theme.borders.thick,
    marginRight: theme.spacing.m,
  },
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginTop: theme.spacing.xs,
  },
  checkoutText: {
    color: theme.colors.on_surface,
    ...theme.textStyles.body_01,
  },
});
