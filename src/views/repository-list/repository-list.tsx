import React from 'react';
import {StyleSheet, View, Alert, ScrollView, Text} from 'react-native';
import {Repo} from '../../entities';
import {getRepository} from 'typeorm';
import {reposMocks} from '../../components/repo-list/mock-data';
import {RepoCard} from '../../components/repo-list/repo-card/repo-card';
import {FAB} from 'react-native-paper';

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
        <FAB
          icon={''}
          label={'New repository'}
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
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
  fab: {
    margin: 0,
    padding: 0,
    left: 0,
  },
});
