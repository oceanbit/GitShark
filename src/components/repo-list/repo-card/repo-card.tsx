import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RepoMock} from '../mock-data';
import {RepoCardCommitMetadata} from './repo-card-commit-metadata';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../constants/theme';
import {Link, useHistory} from 'react-router-native';
import {TouchableRipple} from 'react-native-paper';

interface RepoCardProps {
  repo: RepoMock;
}
export const RepoCard = ({repo}: RepoCardProps) => {
  const history = useHistory();

  return (
    <TouchableRipple
      style={styles.cardContainer}
      onPress={() => history.push(`/asdf`)}
      rippleColor={theme.colors.outlineColor}>
      <View>
        <View style={styles.topDisplayRow}>
          <Text style={styles.cardName}>{repo.name}</Text>
          <Text style={styles.lastUpdated}>Updated {repo.lastUpdated} ago</Text>
        </View>
        <View style={styles.displayRow}>
          <View style={styles.branchView}>
            <Icon name="check-circle" size={16} color={theme.colors.accent} />
            <Text style={styles.branchName}>{repo.branchName}</Text>
          </View>
          <RepoCardCommitMetadata
            commitsToPull={repo.commitsToPull}
            commitsToPush={repo.commitsToPush}
          />
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.outlineColor,
    borderRadius: theme.roundness,
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
    color: theme.colors.fadedGrey,
  },
  branchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    color: theme.colors.accent,
    fontSize: 16,
    marginLeft: 4,
  },
});
