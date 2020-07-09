import * as React from 'react';
import {Alert} from 'react-native';
import {fs, spacing} from '@constants';
import {AppDialog} from '@components/dialog';
import git from 'isomorphic-git/index.umd.min.js';
import {ErrorMessageBox} from '@components/error-message-box';
import {FolderSelectButton} from '@components/folder-select-button';
import {createNewRepo} from '@services';
import {SharkButton} from '@components/shark-button';
import {SharkTextInput} from '@components/shark-text-input';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface CreateRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const CreateRepositoryDialog = ({
  onDismiss,
  visible,
}: CreateRepositoryDialogProps) => {
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

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: spacing.xs,
  },
  textInput: {
    marginTop: spacing.xs,
  },
  cancelBtn: {
    marginRight: spacing.m,
  },
  dialogActions: {
    marginTop: spacing.m,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
