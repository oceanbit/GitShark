import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {reposMocks} from './mock-data';
import {RepoCard} from './repo-card/repo-card';

export const RepoList = () => {
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
    padding: 20,
  },
});
