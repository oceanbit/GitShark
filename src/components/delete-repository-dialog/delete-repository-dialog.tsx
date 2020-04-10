import * as React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../../constants/theme';
import {AppDialog} from '../dialog/dialog';
import {ErrorMessageBox} from '../error-message-box/error-message-box';
import {Repo} from 'src/entities';
import {deleteRepo} from '../../services/git/deleteRepo';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {SharkButton} from '../shark-button/shark-button';

interface DeleteRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  repo: Repo;
}
export const DeleteRepositoryDialog = ({
  onDismiss,
  visible,
  repo,
}: DeleteRepositoryDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const change_removal = useDynamicValue(theme.colors.change_removal);
  const accent = useDynamicValue(theme.colors.primary);

  const [errorStr, setErrorStr] = React.useState('');

  const parentOnDismiss = (bool: boolean) => {
    setErrorStr('');
    onDismiss(bool);
  };

  const deleteRepoLocal = () => {
    deleteRepo(repo)
      .then(() => {
        setErrorStr('');
        parentOnDismiss(true);
      })
      .catch(e => {
        setErrorStr(e.message || e);
      });
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Delete repository?'}
      text={'Files will remain in your device.'}
      main={
        <>
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
        </>
      }
      actions={
        <View style={styles.buttonContainer}>
          <SharkButton
            onPress={() => deleteRepoLocal()}
            type="primary"
            backgroundColor={change_removal}
            style={styles.fullWidthBtn}
            text={'Delete'}
          />
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={[styles.cancelBtn, styles.fullWidthBtn]}
            text={'Cancel'}
          />
        </View>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: 8,
  },
  textInput: {
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness,
  },
  cancelBtn: {
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  fullWidthBtn: {
    width: '100%',
  },
});
