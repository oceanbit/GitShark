import * as React from 'react';
import {StyleSheet, View, Alert, ScrollView, Text} from 'react-native';
import {Repo} from '../../entities';
import {getRepository} from 'typeorm';
import {reposMocks} from '../../components/repo-list/mock-data';
import {RepoCard} from '../../components/repo-list/repo-card/repo-card';
import {TouchableRipple} from 'react-native-paper';
import {ExtendedActionFab} from '../../components/extended-action-fab/extended-action-fab';
import {CreateRepositoryDialog} from '../../components/create-repository-dialog/create-repository-dialog';
import {AddExistingRepositoryDialog} from '../../components/add-existing-repository-dialog/add-existing-repository-dialog';
import {CloneRepositoryDialog} from '../../components/clone-repository-dialog/clone-repository-dialog';
import {textStyles} from '../../constants/text-styles';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';
import {RepoListLoading} from '../../components/repo-list-loading/repo-list-loading';

interface ExtendedFabBase {
  toggleAnimation: () => void;
}

export const NewRepoFab = ({toggleAnimation}: ExtendedFabBase) => {
  return (
    <TouchableRipple
      style={fabStyles.fab}
      onPress={() => {
        toggleAnimation();
      }}>
      <Text style={fabActionsStyles.fabActionText}>New repository</Text>
    </TouchableRipple>
  );
};

const fabStyles = StyleSheet.create({
  fab: {
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  fabActionText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    fontFamily: 'Rubik',
    textAlign: 'center',
  },
});

type DialogSelection = 'clone' | 'create' | 'existing';
interface FabActionsProps extends ExtendedFabBase {
  onSelect: (selection: DialogSelection) => void;
}
export const FabActions = ({toggleAnimation, onSelect}: FabActionsProps) => {
  return (
    <View style={fabActionsStyles.fabActions}>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('clone');
        }}>
        <Text style={fabActionsStyles.fabActionText}>Clone</Text>
      </TouchableRipple>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('create');
        }}>
        <Text style={fabActionsStyles.fabActionText}>Create</Text>
      </TouchableRipple>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('existing');
        }}>
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
    top: 0,
  },
  fabActionBtn: {
    padding: 12,
    width: '100%',
  },
  fabActionText: {
    fontSize: 16,
    fontFamily: 'Rubik',
    color: 'white',
    textAlign: 'center',
  },
});

export const RepositoryList = () => {
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const [repos, setRepos] = React.useState<Repo[] | null>(null);
  const [selectedAction, setSelectedAction] = React.useState<
    DialogSelection | ''
  >('');

  const isLoading = !isDBLoaded || !repos;

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
    if (!isDBLoaded) return;
    findRepos();
  }, [findRepos, isDBLoaded]);

  const newRepoFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      <NewRepoFab toggleAnimation={toggleAnimation} />
    ),
    [],
  );

  const actionFabCB = React.useCallback(
    (toggleAnimation: ExtendedFabBase['toggleAnimation']) => (
      <FabActions
        toggleAnimation={toggleAnimation}
        onSelect={val => setSelectedAction(val)}
      />
    ),
    [],
  );

  const onDismiss = React.useCallback(
    (didUpdate: boolean) => {
      if (didUpdate) findRepos();
      setSelectedAction('');
    },
    [findRepos],
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headingText}>Repositories</Text>
        {isLoading && <RepoListLoading />}
        {!isLoading && (
          <ScrollView>
            {repos!.map(repo => {
              return (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  onUpdate={() => findRepos()}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <View style={styles.fabview}>
        <ExtendedActionFab fab={newRepoFabCB} fabActions={actionFabCB} />
      </View>
      <CreateRepositoryDialog
        visible={selectedAction === 'create'}
        onDismiss={onDismiss}
      />
      <AddExistingRepositoryDialog
        visible={selectedAction === 'existing'}
        onDismiss={onDismiss}
      />
      <CloneRepositoryDialog
        visible={selectedAction === 'clone'}
        onDismiss={onDismiss}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headingText: {
    marginBottom: 16,
    ...textStyles.headline_01,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 16,
  },
});
