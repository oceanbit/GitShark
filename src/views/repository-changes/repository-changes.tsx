import * as React from 'react';
import {StyleOfStagingContext} from '@constants';
import {ChangesArrayItem, resetFiles} from '@services';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
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
import {useTranslation} from 'react-i18next';
import {ErrorPrompt} from '@components/error-prompt';
import {useForegroundEffect} from '@hooks/use-foreground-effect';

export const RepositoryChanges = () => {
  const {t} = useTranslation();

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
    console.log('I AM GETTING STATAUS');
  }, [dispatch]);

  /**
   * Very common for the user to focus away from app, make changes to the filesystem
   * then focus back. This triggers new status request
   */
  useFocusEffect(getUpdate);
  /**
   * Likewise, on mobile, the user will multitask out of the app, make changes, then multitask back
   */
  useForegroundEffect(getUpdate);

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
          <ErrorPrompt explainMessage={t('changesErrStr')} {...changesError} />
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
        {t('ignoreNotImplemented')}
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
