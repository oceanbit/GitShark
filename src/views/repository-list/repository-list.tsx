import React from 'react';
import {StyleSheet, View, Alert, ScrollView, Text} from 'react-native';
import {Repo} from '../../entities';
import {getRepository} from 'typeorm';
import {reposMocks} from '../../components/repo-list/mock-data';
import {RepoCard} from '../../components/repo-list/repo-card/repo-card';
import {FAB, TouchableRipple} from 'react-native-paper';
import {theme} from '../../constants/theme';
import {ExtendedActionFab} from '../../components/extended-action-fab/extended-action-fab';

interface ExtendedFabBase {
  toggleAnimation: () => void;
}

export const NewRepoFab = ({toggleAnimation}: ExtendedFabBase) => {
  return (
    <FAB
      icon={''}
      label={'New repository'}
      style={fabStyles.fab}
      onPress={() => toggleAnimation()}
    />
  );
};

const fabStyles = StyleSheet.create({
  fab: {
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    borderRadius: theme.roundness * 2,
  },
});

export const FabActions = ({toggleAnimation}: ExtendedFabBase) => {
  return (
    <View style={fabActionsStyles.fabActions}>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => toggleAnimation()}>
        <Text style={fabActionsStyles.fabActionText}>Clone</Text>
      </TouchableRipple>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => toggleAnimation()}>
        <Text style={fabActionsStyles.fabActionText}>Create</Text>
      </TouchableRipple>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => toggleAnimation()}>
        <Text style={fabActionsStyles.fabActionText}>Add existing</Text>
      </TouchableRipple>
    </View>
  );
};

const fabActionsStyles = StyleSheet.create({
  fabActions: {
    borderRadius: 14,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: theme.colors.accent,
    top: 0,
  },
  fabActionBtn: {
    padding: 12,
    width: '100%',
  },
  fabActionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export const RepositoryList = () => {
  const [repos, setRepos] = React.useState<Repo[]>([]);

  const findRepos = React.useCallback(async () => {
    try {
      const repoRepository = getRepository(Repo);
      const repos = await repoRepository.find({});
      setRepos(repos);
      return true; // Indicates this works
    } catch (e) {
      console.error(e);
      Alert.alert('There was an error finding the repos!');
    }
  }, []);

  React.useEffect(() => {
    findRepos();
  }, [findRepos]);

  const newRepoFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      <NewRepoFab toggleAnimation={toggleAnimation} />
    ),
    [],
  );

  const actionFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      <FabActions toggleAnimation={toggleAnimation} />
    ),
    [],
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headingText}>Repositories</Text>
        <ScrollView>
          {reposMocks.map(repo => {
            return <RepoCard key={repo.id} repo={repo} />;
          })}
        </ScrollView>
      </View>
      <View style={styles.fabview}>
        <ExtendedActionFab fab={newRepoFabCB} fabActions={actionFabCB} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});
