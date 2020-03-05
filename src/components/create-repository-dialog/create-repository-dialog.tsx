import * as React from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import {TouchableRipple, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';
import {AppDialog} from '../dialog/dialog';
import RNFileSelector from 'react-native-file-selector';
import {fs} from '../../constants/fs';
import git from 'isomorphic-git/index.umd.min.js';
import {Repo} from '../../entities';
import {getNameFromPath} from '../../utils';

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

  const createNewRepo = async (branchName: string) => {
    const newRepo = new Repo();
    newRepo.name = repoName || getNameFromPath(path);
    newRepo.path = path;
    newRepo.lastUpdated = new Date(Date.now());
    newRepo.currentBranchName = branchName;
    try {
      await newRepo.save();
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
    const gitBranchName = await getGitBranchName();
    if (gitBranchName) {
      await createNewRepo(gitBranchName);
      onDismiss(true);
      return;
    }
    try {
      await git.init({
        fs,
        dir: path,
      });
      await createNewRepo('master');
      onDismiss(true);
    } catch (e) {
      console.error('There was an error initializing the git repo', e);
      Alert.alert(
        'There was an error initlizing a git repo at this path. Please restart the app and try again',
      );
      onDismiss(false);
    }
  };

  const selectDirectory = () => {
    RNFileSelector.Show({
      title: 'Select File',
      chooseFolderMode: true,
      onDone: (selectedPath: string) => {
        console.log('file selected: ' + selectedPath);
        setPath(selectedPath);
      },
      onCancel: () => {
        console.log('cancelled');
      },
    });
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => onDismiss(false)}
      title={'Create repository'}
      text={'The repository will be created from a local folder.'}
      main={
        <>
          {!path && (
            <TouchableRipple onPress={() => selectDirectory()}>
              <View style={styles.selectFolderBtn}>
                <Icon size={24} name="folder" color={theme.colors.accent} />
                <Text style={styles.selectFolderText}>Select folder...</Text>
              </View>
            </TouchableRipple>
          )}
          {!!path && (
            <TouchableRipple onPress={() => selectDirectory()}>
              <View style={styles.selectFolderBtn}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.selectFolderText,
                    styles.selectFolderBtnWithPath,
                  ]}>
                  {path}
                </Text>
                <Icon
                  size={24}
                  name="folder-outline"
                  color={theme.colors.accent}
                />
              </View>
            </TouchableRipple>
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
  selectFolderBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.outlineColor,
    borderWidth: 2,
    borderRadius: theme.roundness,
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectFolderBtnWithPath: {
    flexGrow: 1,
    color: theme.colors.disabled,
    marginRight: 12,
  },
  selectFolderText: {
    color: theme.colors.accent,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
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
