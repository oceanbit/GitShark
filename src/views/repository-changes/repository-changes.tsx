import * as React from 'react';
import {StyleOfStagingContext} from '@constants';
import {ChangesArrayItem, resetFiles} from '@services';
import {useNavigation} from '@react-navigation/native';
import {
  StageSheetView,
  StageSplitView,
} from './components/staging-screen-options';
import {useSelector} from 'react-redux';
import {addToStaged, getGitStatus, removeFromStaged, RootState} from '@store';
import {useThunkDispatch} from '@hooks';
import {RepositoryHeader} from '@components/repository-header';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';

export const RepositoryChanges = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {staged, unstaged, error: changesError} = useSelector(
    (state: RootState) => state.changes,
  );
  const dispatch = useThunkDispatch();

  const history = useNavigation();

  const {styleOfStaging} = React.useContext(StyleOfStagingContext);

  const useSplitView = styleOfStaging === 'split';

  const getUpdate = React.useCallback(() => {
    dispatch(getGitStatus());
  }, [dispatch]);

  React.useEffect(() => {
    getUpdate();
  }, [getUpdate]);

  const [snackVisible, setSnackVisible] = React.useState(false);

  const addToStagedLocal = async (changes: ChangesArrayItem[]) => {
    dispatch(addToStaged(changes)).then(({error}: any) => {
      if (error) console.error(error);
    });
  };

  const removeFromStagedLocal = async (changes: ChangesArrayItem[]) => {
    dispatch(removeFromStaged(changes)).then(({error}: any) => {
      if (error) console.error(error);
    });
  };

  const onCommit = React.useCallback(() => {
    history.navigate('CommitAction', {
      files: staged,
      updateFiles: getUpdate,
    });
  }, [history, staged, getUpdate]);

  const onIgnore = () => {
    setSnackVisible(true);
  };

  const onDiscard = async (changes: ChangesArrayItem[]) => {
    const fileNames = changes.map(change => change.fileName);
    await resetFiles({path: repo!.path, dispatch, files: fileNames});
  };

  return (
    <>
      <View style={styles.container}>
        <RepositoryHeader repo={repo} />
        {!!changesError && (
          <View>
            <Text>
              There was an error that occurred while loading staged and unstaged
              files:
            </Text>
            <Text>{changesError}</Text>
          </View>
        )}
        {!changesError && (
          <>
            {useSplitView ? (
              <StageSplitView
                addToStaged={addToStagedLocal}
                unstagedChanges={unstaged}
                removeFromStaged={removeFromStagedLocal}
                stagedChanges={staged}
                onCommit={onCommit}
                onIgnore={onIgnore}
                onDiscard={onDiscard}
              />
            ) : (
              <StageSheetView
                addToStaged={addToStagedLocal}
                unstagedChanges={unstaged}
                removeFromStaged={removeFromStagedLocal}
                stagedChanges={staged}
                onCommit={onCommit}
                onIgnore={onIgnore}
                onDiscard={onDiscard}
              />
            )}
          </>
        )}
      </View>
      <Snackbar
        duration={Snackbar.DURATION_MEDIUM}
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}>
        "Ignore" feature is not yet implemented, but will be shortly
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
