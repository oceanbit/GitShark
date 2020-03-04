import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RepoMock} from '../mock-data';
import {RepoCardCommitMetadata} from './repo-card-commit-metadata';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RepoCardProps {
  repo: RepoMock;
}
export const RepoCard = ({repo}: RepoCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.topDisplayRow}>
        <Text style={styles.cardName}>{repo.name}</Text>
        <Text style={styles.lastUpdated}>Updated {repo.lastUpdated} ago</Text>
      </View>
      <View style={styles.displayRow}>
        <View style={styles.branchView}>
          <Icon name="check-circle" size={16} color="#002BFF" />
          <Text style={styles.branchName}>{repo.branchName}</Text>
        </View>
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
    padding: 16,
    marginBottom: 16,
  },
  topDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  displayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 28,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#142952',
  },
  branchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    color: '#002BFF',
    fontSize: 16,
    marginLeft: 4,
  },
});
