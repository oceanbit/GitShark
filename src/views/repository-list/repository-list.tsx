import * as React from 'react';
import {StyleSheet, View, Alert, ScrollView, Text} from 'react-native';
import {Repo} from '../../entities';
import {getRepository} from 'typeorm';
import {RepoCard} from '../../components/repo-list/repo-card/repo-card';
import {TouchableRipple} from 'react-native-paper';
import {textStyles} from '../../constants/text-styles';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';
import {RepoListLoading} from '../../components/repo-list-loading/repo-list-loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {reposMocks} from '../../components/repo-list/mock-data';
import {DialogsAndFab} from './dialogs-and-fab';

export const RepositoryList = () => {
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const [repos, setRepos] = React.useState<Repo[] | null>(null);

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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Repositories</Text>
          <TouchableRipple
            style={styles.cog}
            onPress={() => {
              repos?.length ? setRepos([]) : setRepos(reposMocks);
            }}>
            <Icon
              name="settings-outline"
              size={24}
              color={theme.colors.accent}
            />
          </TouchableRipple>
        </View>
        {isLoading && <RepoListLoading />}
        {!isLoading && !!repos?.length && (
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
      <DialogsAndFab
        isDBLoaded={isDBLoaded}
        isLoading={isLoading}
        repos={repos}
        findRepos={findRepos}
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
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: 16,
  },
  cog: {
    padding: 8,
  },
  headingText: {
    flexGrow: 1,
    ...textStyles.headline_01,
  },
  noRepos: {
    ...textStyles.headline_01,
    color: theme.colors.on_surface_light,
    opacity: 0.4,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    // Edgecase for parent padding
    left: 16,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
