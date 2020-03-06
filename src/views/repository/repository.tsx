import * as React from 'react';
import {BottomNavigation, TouchableRipple} from 'react-native-paper';
import {RepositoryChanges} from '../repository-changes/repository-changes';
import {StyleSheet, View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {RepositoryHeader} from '../../components/repository-header/repository-header';
import {RepoContext} from '../../constants/repo-context';
import {useParams} from 'react-router-native';
import {getRepository} from 'typeorm';
import {Repo} from '../../entities';

const routes = [
  {
    key: 'changes',
    icon: 'file-multiple',
    title: 'Changes',
  },
  {
    key: 'history',
    icon: 'history',
    title: 'History',
  },
];

export const Repository = () => {
  let {repoId} = useParams();
  const [repo, setRepo] = React.useState<Repo | null>(null);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const repoRepository = getRepository(Repo);
    repoRepository
      .findOne(repoId)
      .then(newRepo => {
        if (!newRepo) {
          Alert.alert(
            'There was an issue loading that repository. Please restart the app and try again',
          );
          return;
        }
        setRepo(newRepo!);
        console.log(newRepo);
      })
      .catch(e => {
        console.error(e);
        Alert.alert(
          'There was an issue loading that repository. Please restart the app and try again',
        );
      });
  }, [repoId, setRepo]);

  const _handleIndexChange = React.useCallback(
    (index: number) => setIndex(index),
    [],
  );

  const state = React.useMemo(() => ({index, routes}), [index]);

  const _renderScene = React.useMemo(
    () =>
      BottomNavigation.SceneMap({
        history: RepositoryChanges,
        changes: RepositoryChanges,
      }),
    [],
  );

  const contextValue = React.useMemo(
    () => ({
      repo,
      setRepo,
    }),
    [repo, setRepo],
  );

  return (
    <RepoContext.Provider value={contextValue}>
      <RepositoryHeader />
      <BottomNavigation
        labeled={true}
        shifting={false}
        navigationState={state}
        onIndexChange={_handleIndexChange}
        renderScene={_renderScene}
        barStyle={styles.bottomNav}
        inactiveColor={theme.colors.disabled}
        activeColor={theme.colors.accent}
      />
    </RepoContext.Provider>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineColor,
  },
});
