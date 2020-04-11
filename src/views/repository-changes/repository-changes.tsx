import * as React from 'react';
import git from 'isomorphic-git/index.umd.min.js';
import {RepoContext} from '../../constants/repo-context';
import {ChangesArrayItem, getRepoStatus} from '../../services/git';
import {fs} from '../../constants/fs';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';
import {useNavigation} from '@react-navigation/native';
import {StageSplitView} from '../../components/stage-split-view/stage-split-view';
import {StageSheetView} from '../../components/stage-sheet-view/stage-sheet-view';
import {StyleOfStagingContext} from '../../constants/style-of-staging-context';

export const RepositoryChanges = () => {
  const history = useNavigation();

  const {styleOfStaging} = React.useContext(StyleOfStagingContext);

  const useSplitView = styleOfStaging === 'split';

  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const {repo} = React.useContext(RepoContext);
  const [stagedChanges, setStagedChanges] = React.useState<ChangesArrayItem[]>(
    [],
  );
  const [unstagedChanges, setUnstagedChanges] = React.useState<
    ChangesArrayItem[]
  >([]);
  const getUpdate = React.useCallback(() => {
    if (!repo) {
      return;
    }
    getRepoStatus(repo.path)
      .then(newFiles => {
        const onlyChangedFiles = newFiles.filter(
          file => file.fileStatus !== 'unmodified',
        );
        const [unstaged, staged] = onlyChangedFiles.reduce(
          (prev, change) => {
            if (!change.staged) {
              prev[0].push(change);
            } else {
              prev[1].push(change);
            }
            return prev;
          },
          [[], []] as ChangesArrayItem[][],
        );
        setStagedChanges(staged);
        setUnstagedChanges(unstaged);
      })
      .catch(e => console.error(e));
  }, [repo]);

  React.useEffect(() => {
    if (!isDBLoaded) return;
    getUpdate();
  }, [isDBLoaded, getUpdate]);

  const addToStaged = async (changes: ChangesArrayItem[]) => {
    const newUnstaged = unstagedChanges.filter(
      unChange =>
        !changes.find(change => unChange.fileName === change.fileName),
    );
    const newStaged = [...stagedChanges, ...changes];
    setUnstagedChanges(newUnstaged);
    setStagedChanges(newStaged);
    const changePromises = changes.map(change =>
      git.add({fs, dir: repo!.path, filepath: change.fileName}),
    );
    try {
      await Promise.all(changePromises);
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromStaged = async (changes: ChangesArrayItem[]) => {
    const newStaged = stagedChanges.filter(
      unChange =>
        !changes.find(change => unChange.fileName === change.fileName),
    );
    const newUnstaged = [...unstagedChanges, ...changes];
    setUnstagedChanges(newUnstaged);
    setStagedChanges(newStaged);
    const changePromises = changes.map(change =>
      git.remove({fs, dir: repo!.path, filepath: change.fileName}),
    );
    try {
      await Promise.all(changePromises);
    } catch (e) {
      console.error(e);
    }
  };

  const onCommit = React.useCallback(() => {
    history.navigate('Commit', {
      files: stagedChanges,
      updateFiles: getUpdate,
    });
  }, [history, stagedChanges, getUpdate]);

  return (
    <>
      {useSplitView ? (
        <StageSplitView
          addToStaged={addToStaged}
          unstagedChanges={unstagedChanges}
          removeFromStaged={removeFromStaged}
          stagedChanges={stagedChanges}
          onCommit={onCommit}
        />
      ) : (
        <StageSheetView
          addToStaged={addToStaged}
          unstagedChanges={unstagedChanges}
          removeFromStaged={removeFromStaged}
          stagedChanges={stagedChanges}
          onCommit={onCommit}
        />
      )}
    </>
  );
};
