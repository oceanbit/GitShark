import * as React from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {Repo} from '../../entities';
import {getRepository} from 'typeorm';
import {RepoCard} from '../../components/repo-card';
import {DatabaseLoadedContext, textStyles, theme} from '../../constants';
import {RepoListLoading} from '../../components/repo-list-loading';
import {DialogsAndFab} from './dialogs-and-fab';
import {SharkIconButton} from '../../components/shark-icon-button';
import {useNavigation} from '@react-navigation/native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

export const RepositoryList = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const history = useNavigation();
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const [repos, setRepos] = React.useState<Repo[] | null>(null);

  const isLoading = !isDBLoaded || !repos;

  const findRepos = React.useCallback(async () => {
    try {
      const repoRepository = getRepository(Repo);
      const foundRepos = await repoRepository.find({});
      setRepos(foundRepos);
      return true; // Indicates this works
    } catch (e) {
      console.error(e);
      Alert.alert('There was an error finding the repos!');
    }
  }, []);

  React.useEffect(() => {
    if (!isDBLoaded) {
      return;
    }
    findRepos();
  }, [findRepos, isDBLoaded]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Repositories</Text>
          <SharkIconButton
            onPress={() => {
              history.navigate('Settings');
            }}
            iconName={'settings-outline'}
          />
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

const dynamicStyles = new DynamicStyleSheet({
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
  headingText: {
    flexGrow: 1,
    ...textStyles.headline_01,
    color: theme.colors.on_surface,
  },
  noRepos: {
    ...textStyles.headline_01,
    color: theme.colors.on_surface,
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
