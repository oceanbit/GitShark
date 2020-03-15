import * as React from 'react';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';
import {AppDialog} from '../dialog/dialog';
import {fs} from '../../constants/fs';
import git from 'isomorphic-git/index.umd.min.js';
import {SharkTextInput} from '../shark-text-input/shark-text-input';
import {ErrorMessageBox} from '../error-message-box/error-message-box';
import {FolderSelectButton} from '../folder-select-button/folder-select-button';
import {createNewRepo} from '../../services/git/createRepo';

interface CloneRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}
export const CloneRepositoryDialog = ({
  onDismiss,
  visible,
}: CloneRepositoryDialogProps) => {
  const [path, setPath] = React.useState('');
  const [repoUrl, setRepoUrl] = React.useState('');
  const [repoName, setRepoName] = React.useState('');
  const [errorStr, setErrorStr] = React.useState('');

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
      onDismiss(true);
      return;
    }
    setErrorStr('The folder selected is not a git repository.');
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => onDismiss(false)}
      title={'Clone'}
      text={'Clone remote repository into a local folder.'}
      main={
        <>
          <SharkTextInput
            placeholder={'Repository URL'}
            value={repoUrl}
            onChangeText={val => setRepoUrl(val)}
            prefixIcon={'link'}
            postfixIcon={'clipboard-text'}
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
          <Button
            onPress={() => onDismiss(false)}
            mode="outlined"
            color={theme.colors.accent}
            style={styles.cancelBtn}>
            Cancel
          </Button>
          <Button
            onPress={() => checkAndCreateGitDirectory()}
            mode="contained"
            color={theme.colors.accent}>
            Create
          </Button>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    margin: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  dialogTitle: {
    fontWeight: '500',
    marginBottom: 4,
    ...textStyles.headline_03,
  },
  mainText: {
    color: '#142952',
    opacity: 0.6,
    marginBottom: 20,
    ...textStyles.body_02,
  },
  errorBox: {
    marginTop: 8,
  },
  folderSelect: {
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
    borderColor: theme.colors.outlineColor,
    borderWidth: 2,
    marginRight: 16,
  },
  dialogActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
