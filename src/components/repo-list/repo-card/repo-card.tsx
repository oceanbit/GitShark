import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RepoMock} from '../mock-data';
import {RepoCardCommitMetadata} from './repo-card-commit-metadata';

interface RepoCardProps {
  repo: RepoMock;
}
export const RepoCard = ({repo}: RepoCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.displayRow}>
        <Text style={styles.cardName}>{repo.name}</Text>
        <Text style={styles.lastUpdated}>Updated {repo.lastUpdated} ago</Text>
      </View>
      <View style={styles.displayRow}>
        <Text style={styles.branchName}>{repo.branchName}</Text>
        <RepoCardCommitMetadata
          commitsToPull={repo.commitsToPull}
          commitsToPush={repo.commitsToPush}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderStyle: 'solid',
    borderColor: 'rgba(0, 51, 153, 0.2);',
    borderRadius: 6,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  displayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 20,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#142952',
  },
  branchName: {
    color: '#002BFF',
    fontSize: 12,
  },
});
