import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import git from 'isomorphic-git/index.umd.min.js';

import {RepoContext} from '../../constants/repo-context';
import {ChangesArrayItem, getRepoStatus} from '../../services/git';
import {legacyTheme} from '../../constants/theme';
import {fs} from '../../constants/fs';
import {UnstagedChanges} from './unstaged-changes';
import {StagedChanges} from './staged-changes';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';
import {useRoute} from '@react-navigation/native';

export const RepositoryChanges = () => {
  const route = useRoute<any>();
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

  React.useEffect(() => {
    // The page may be fully loaded already but a commit was just queried
    // I also anticipate `shouldRequery` to be a boolean OR a string, hense the type casting
    console.log(route?.params?.shouldRequery);
    if (isDBLoaded && `${route?.params?.shouldRequery}` === 'true') {
      getUpdate();
    }
  }, [isDBLoaded, route?.params]);

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

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.halfSection, styles.firstSection]}>
          <UnstagedChanges
            addToStaged={addToStaged}
            unstagedChanges={unstagedChanges}
          />
        </View>
        <View style={styles.halfSection}>
          <StagedChanges
            removeFromStaged={removeFromStaged}
            stagedChanges={stagedChanges}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  headingText: {
    marginBottom: 16,
    fontSize: 48,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 16,
  },
  halfSection: {
    height: '50%',
  },
  firstSection: {
    borderBottomColor: legacyTheme.colors.outlineColor,
    borderBottomWidth: 1,
  },
  fab: {
    margin: 0,
    padding: 0,
    left: 0,
  },
});
