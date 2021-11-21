import * as React from 'react';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {SharkTextInput} from '@components/shark-text-input';
import {ErrorMessageBox} from '@components/error-message-box';
import {FolderSelectButton} from '@components/folder-select-button';
import {CloneRepositoryProgressDialog} from '../clone-repository-progress-dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useTranslation} from 'react-i18next';
import {currentBranch} from '@services/git/current-branch';
import {iOS, iOSPath} from '@utils';

interface CloneRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const CloneRepositoryDialog = ({
  onDismiss,
  visible,
}: CloneRepositoryDialogProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const [repoUrl, setRepoUrl] = React.useState('');
  const [repoName, setRepoName] = React.useState('');

  const [nonIOSpath, setNonIOSPath] = React.useState('');
  const path = iOS ? iOSPath : nonIOSpath;

  const [errorStr, setErrorStr] = React.useState('');
  const [isCloning, setIsCloning] = React.useState(false);

  const parentOnDismiss = (bool: boolean) => {
    setNonIOSPath('');
    setRepoUrl('');
    setRepoName('');
    setErrorStr('');
    setIsCloning(false);
    onDismiss(bool);
  };

  const getGitBranchName = async () => {
    try {
      // TODO: Don't check the parent path, check the child path
      // EG: Check `path/name`, not just `path`
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

  const checkAndClone = async () => {
    if (!repoUrl) {
      setErrorStr(t('noURIClone'));
      return;
    }
    const gitBranchName = await getGitBranchName();
    if (gitBranchName) {
      setErrorStr(t('alreadyGitRepo'));
      return;
    }
    setIsCloning(true);
  };

  return (
    <>
      <AppDialog
        visible={visible && !isCloning}
        onDismiss={() => parentOnDismiss(false)}
        title={t('cloneRepoDialogTitle')}
        text={t('cloneRepoDialogText')}
        main={
          <>
            <SharkTextInput
              placeholder={t('repoURLInput')}
              value={repoUrl}
              onChangeText={val => setRepoUrl(val)}
              prefixIcon={'link'}
              postfixIcon={'copy'}
            />
            {!iOS && (
              <FolderSelectButton
                path={nonIOSpath}
                onFolderSelect={folderPath => {
                  setNonIOSPath(folderPath);
                  setErrorStr('');
                }}
                style={styles.folderSelect}
              />
            )}
            {!!errorStr && (
              <ErrorMessageBox style={styles.errorBox} message={errorStr} />
            )}
            {/*TODO: Add input validation to disallow `/` and `\`*/}
            <SharkTextInput
              value={repoName}
              onChangeText={setRepoName}
              placeholder={t('repoNameInput')}
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
              onPress={() => checkAndClone()}
              type="primary"
              text={t('createAction')}
            />
          </>
        }
      />
      <CloneRepositoryProgressDialog
        onDismiss={parentOnDismiss}
        visible={visible && isCloning}
        uri={repoUrl}
        path={path}
        name={repoName}
      />
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: theme.spacing.xs,
  },
  folderSelect: {
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
