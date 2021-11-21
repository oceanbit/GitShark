import * as React from 'react';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {ErrorMessageBox} from '@components/error-message-box';
import {FolderSelectButton} from '@components/folder-select-button';
import {createNewRepo} from '@services';
import {SharkButton} from '@components/shark-button';
import {SharkTextInput} from '@components/shark-text-input';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useTranslation} from 'react-i18next';
import {currentBranch} from '@services/git/current-branch';
import {FullError, getSerializedErrorStr} from '@types';

interface CreateRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  setComponentError: (error: FullError) => void;
}

export const AddExistingRepositoryDialog = ({
  onDismiss,
  visible,
  setComponentError,
}: CreateRepositoryDialogProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const [path, setPath] = React.useState('');
  const [repoName, setRepoName] = React.useState('');
  const [errorStr, setErrorStr] = React.useState('');

  const parentOnDismiss = (bool: boolean) => {
    setPath('');
    setRepoName('');
    setErrorStr('');
    onDismiss(bool);
  };

  const createNewRepoLocal = async () => {
    try {
      await createNewRepo(path, repoName);
      return true;
    } catch (e) {
      setComponentError({
        ...getSerializedErrorStr(e as string),
        explainMessage: t('errorCreateRepoCache'),
      });
      return false;
    }
  };

  const getGitBranchName = async () => {
    try {
      const branchName = await currentBranch({
        path,
      });
      console.log('Folder is a git directory');
      return branchName;
    } catch (e) {
      console.log('Folder is not a git directory.', e);
      return false;
    }
  };

  const checkAndCreateGitDirectory = async () => {
    const gitBranchName = await getGitBranchName();
    if (gitBranchName) {
      const created = await createNewRepoLocal();
      if (!created) return;
      parentOnDismiss(true);
      return;
    }
    setErrorStr(t('folderNotGit'));
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={t('addExistRepoDialogTitle')}
      text={t('addExistRepoDialogText')}
      main={
        <>
          <FolderSelectButton
            path={path}
            onFolderSelect={folderPath => {
              setPath(folderPath);
              setErrorStr('');
            }}
          />
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
          <SharkTextInput
            value={repoName}
            onChangeText={setRepoName}
            placeholder={t('addExistRepoDialogInput')}
            style={styles.textInput}
          />
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text={t('cancelAction')}
          />
          <SharkButton
            onPress={() => checkAndCreateGitDirectory()}
            type="primary"
            text={t('createAction')}
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
