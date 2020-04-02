import * as React from 'react';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../../constants/theme';
import {AppDialog} from '../dialog/dialog';
import {fs} from '../../constants/fs';
import git from 'isomorphic-git/index.umd.min.js';
import {ErrorMessageBox} from '../error-message-box/error-message-box';
import {FolderSelectButton} from '../folder-select-button/folder-select-button';
import {createNewRepo} from '../../services/git/createRepo';
import {SharkButton} from '../shark-button/shark-button';

interface CreateRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}
export const CreateRepositoryDialog = ({
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
      console.log('Folder is a git directory, adding');
      return branchName;
    } catch (e) {
      console.log('Folder is not a git directory.', e);
      return false;
    }
  };

  const checkAndCreateGitDirectory = async () => {
    const isGitRepo = await getGitBranchName();
    if (isGitRepo) {
      setErrorStr('The folder selected is already a git repository.');
      return;
    }
    try {
      await git.init({
        fs,
        dir: path,
      });
      await createNewRepoLocal();
      parentOnDismiss(true);
    } catch (e) {
      console.error('There was an error initializing the git repo', e);
      Alert.alert(
        'There was an error initlizing a git repo at this path. Please restart the app and try again',
      );
      parentOnDismiss(false);
    }
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Create repository'}
      text={'The repository will be created from a local folder.'}
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
          <TextInput
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
