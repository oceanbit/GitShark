import * as React from 'react';
import {RepoContext, StyleOfStagingContext} from '../../constants';
import {ChangesArrayItem} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {
  StageSheetView,
  StageSplitView,
} from '../../components/staging-screen-options';
import {useSelector} from 'react-redux';
import {
  RootState,
  getGitStatus,
  addToStaged,
  removeFromStaged,
} from '../../store';
import {useThunkDispatch} from '../../hooks';

export const RepositoryChanges = () => {
  const {staged, unstaged} = useSelector((state: RootState) => state.changes);
  const dispatch = useThunkDispatch();

  const history = useNavigation();

  const {styleOfStaging} = React.useContext(StyleOfStagingContext);

  const useSplitView = styleOfStaging === 'split';
  const {repo} = React.useContext(RepoContext);

  const getUpdate = React.useCallback(() => {
    if (!repo) {
      return;
    }
    dispatch(getGitStatus(repo.path));
  }, [repo, dispatch]);

  React.useEffect(() => {
    getUpdate();
  }, [getUpdate]);

  const addToStagedLocal = async (changes: ChangesArrayItem[]) => {
    dispatch(addToStaged({repo: repo!, changes})).then(({error}: any) => {
      if (error) console.error(error);
    });
  };

  const removeFromStagedLocal = async (changes: ChangesArrayItem[]) => {
    dispatch(removeFromStaged({repo: repo!, changes})).then(({error}: any) => {
      if (error) console.error(error);
    });
  };

  const onCommit = React.useCallback(() => {
    history.navigate('Commit', {
      files: staged,
      updateFiles: getUpdate,
    });
  }, [history, staged, getUpdate]);

  return (
    <>
      {useSplitView ? (
        <StageSplitView
          addToStaged={addToStagedLocal}
          unstagedChanges={unstaged}
          removeFromStaged={removeFromStagedLocal}
          stagedChanges={staged}
          onCommit={onCommit}
        />
      ) : (
        <StageSheetView
          addToStaged={addToStagedLocal}
          unstagedChanges={unstaged}
          removeFromStaged={removeFromStagedLocal}
          stagedChanges={staged}
          onCommit={onCommit}
        />
      )}
    </>
  );
};
