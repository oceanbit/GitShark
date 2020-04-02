import * as React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {theme} from '../../constants/theme';
import {AppDialog} from '../dialog/dialog';
import {fs} from '../../constants/fs';
import git from 'isomorphic-git/index.umd.min.js';
import {ErrorMessageBox} from '../error-message-box/error-message-box';
import {FolderSelectButton} from '../folder-select-button/folder-select-button';
import {createNewRepo} from '../../services/git/createRepo';
import {SharkButton} from '../shark-button/shark-button';
import {SharkTextInput} from '../shark-text-input/shark-text-input';

interface CreateRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}
export const AddExistingRepositoryDialog = ({
  onDismiss,
  visible,
}: CreateRepositoryDialogProps) => {
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
    } catch (e) {
      console.error("There was an error creating a repo in the app's cache", e);
      Alert.alert(
        "There was an error creating a repo in the app's cache. Please restart the app and try again",
      );
    }
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

  const checkAndCreateGitDirectory = async () => {
    const gitBranchName = await getGitBranchName();
    if (gitBranchName) {
      await createNewRepoLocal();
      parentOnDismiss(true);
      return;
    }
    setErrorStr('The folder selected is not a git repository.');
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Add existing repository'}
      text={
        "Select a local folder that contains a repository. We'll keep track of it from there."
      }
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
            text="Cancel"
          />
          <SharkButton
            onPress={() => checkAndCreateGitDirectory()}
            type="primary"
            text="Create"
          />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
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
    borderColor: theme.colors.outlineColor,
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
