import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {reposMocks} from '../../components/repo-list/mock-data';
import {RepoCard} from '../../components/repo-list/repo-card/repo-card';
import {FAB} from 'react-native-paper';

export const RepositoryChanges = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {reposMocks.map(repo => {
            return <RepoCard key={repo.id} repo={repo} />;
          })}
        </ScrollView>
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
