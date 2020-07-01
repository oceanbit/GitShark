import * as React from 'react';
import {borders, fs, spacing, theme} from '@constants';
import {AppDialog} from '@components/dialog';
import git from 'isomorphic-git/index.umd.min.js';
import {SharkTextInput} from '@components/shark-text-input';
import {ErrorMessageBox} from '@components/error-message-box';
import {FolderSelectButton} from '@components/folder-select-button';
import {CloneRepositoryProgressDialog} from '../clone-repository-progress-dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface CloneRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const CloneRepositoryDialog = ({
  onDismiss,
  visible,
}: CloneRepositoryDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [path, setPath] = React.useState('');
  const [repoUrl, setRepoUrl] = React.useState('');
  const [repoName, setRepoName] = React.useState('');
  const [errorStr, setErrorStr] = React.useState('');
  const [isCloning, setIsCloning] = React.useState(false);

  const parentOnDismiss = (bool: boolean) => {
    setPath('');
    setRepoUrl('');
    setRepoName('');
    setErrorStr('');
    setIsCloning(false);
    onDismiss(bool);
  };

  const getGitBranchName = async () => {
    try {
      const branchName = await git.currentBranch({
        fs,
        dir: path,
      });
      console.log('Folder is a git directory');
      return branchName;
    } catch (e) {
      console.log('Folder is not a git directory.', e);
      return false;
    }
  };

  const checkAndClone = async () => {
    const gitBranchName = await getGitBranchName();
    if (gitBranchName) {
      setErrorStr('The folder selected is already a git repository.');
      return;
    }
    setIsCloning(true);
  };

  return (
    <>
      <AppDialog
        visible={visible && !isCloning}
        onDismiss={() => parentOnDismiss(false)}
        title={'Clone'}
        text={'Clone remote repository into a local folder.'}
        main={
          <>
            <SharkTextInput
              placeholder={'Repository URL'}
              value={repoUrl}
              onChangeText={val => setRepoUrl(val)}
              prefixIcon={'link'}
              postfixIcon={'copy'}
            />
            <FolderSelectButton
              path={path}
              onFolderSelect={folderPath => {
                setPath(folderPath);
                setErrorStr('');
              }}
              style={styles.folderSelect}
            />
            {!!errorStr && (
              <ErrorMessageBox style={styles.errorBox} message={errorStr} />
            )}
            <SharkTextInput
              value={repoName}
              onChangeText={setRepoName}
              placeholder={'Repository name'}
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
              text={'Cancel'}
            />
            <SharkButton
              onPress={() => checkAndClone()}
              type="primary"
              text={'Create'}
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
    marginTop: spacing.xs,
  },
  folderSelect: {
    marginTop: spacing.xs,
  },
  textInput: {
    marginTop: spacing.xs,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
    // TODO: FIXME WITH TEXT STYLING
    fontSize: 16,
    lineHeight: 24,
    borderWidth: borders.normal,
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness,
  },
  cancelBtn: {
    borderColor: theme.colors.divider,
    borderWidth: borders.thick,
    marginRight: spacing.m,
  },
  dialogActions: {
    marginTop: spacing.m,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
