import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Repo} from '../../entities';
import {getRepository} from 'typeorm';
import {reposMocks} from '../../components/repo-list/mock-data';
import {RepoCard} from '../../components/repo-list/repo-card/repo-card';

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
    <View style={styles.container}>
      {reposMocks.map(repo => {
        return <RepoCard key={repo.id} repo={repo} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
