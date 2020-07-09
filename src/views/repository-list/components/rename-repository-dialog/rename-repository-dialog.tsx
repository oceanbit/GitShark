import * as React from 'react';
import {AppDialog} from '@components/dialog';
import {ErrorMessageBox} from '@components/error-message-box';
import {ReduxRepo} from '@entities';
import {renameRepo} from '@services';
import {SharkTextInput} from '@components/shark-text-input';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkButton} from '@components/shark-button';
import {theme} from '@constants';

interface RenameRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  repo: ReduxRepo;
}

export const RenameRepositoryDialog = ({
  onDismiss,
  visible,
  repo,
}: RenameRepositoryDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [repoName, setRepoName] = React.useState('');
  const [errorStr, setErrorStr] = React.useState('');

  const renameRepoLocal = async () => {
    if (!repoName) {
      setErrorStr('You must input a value for the repository name');
    }
    await renameRepo(repo.id, repoName);
    onDismiss(true);
    setRepoName('');
    setErrorStr('');
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => onDismiss(false)}
      title={'Rename repository'}
      text={'Enter the new name for the repository.'}
      main={
        <>
          <SharkTextInput
            value={repoName}
            onChangeText={setRepoName}
            placeholder={'Repository name'}
            style={styles.textInput}
          />
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => onDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text={'Cancel'}
          />
          <SharkButton
            onPress={() => renameRepoLocal()}
            type="primary"
            text={'Rename'}
          />
        </>
      }
    />
  );
};

export const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: theme.spacing.xs,
  },
  textInput: {
    marginTop: theme.spacing.xs,
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
