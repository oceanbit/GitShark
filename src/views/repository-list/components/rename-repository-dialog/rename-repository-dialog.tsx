import * as React from 'react';
import {theme} from '../../../../constants';
import {AppDialog} from '../../../../components/dialog';
import {ErrorMessageBox} from '../../../../components/error-message-box';
import {Repo} from '../../../../entities';
import {SharkTextInput} from '../../../../components/shark-text-input';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkButton} from '../../../../components/shark-button';

interface RenameRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  repo: Repo;
}

export const RenameRepositoryDialog = ({
  onDismiss,
  visible,
  repo,
}: RenameRepositoryDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [repoName, setRepoName] = React.useState('');
  const [errorStr, setErrorStr] = React.useState('');

  const renameRepo = async () => {
    if (!repoName) {
      setErrorStr('You must input a value for the repository name');
    }
    repo.name = repoName;
    await repo.save();
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
            onPress={() => renameRepo()}
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
    marginRight: 16,
  },
  dialogActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
