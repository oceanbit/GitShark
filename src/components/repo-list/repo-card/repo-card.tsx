import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {RepoCardCommitMetadata} from './repo-card-commit-metadata';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../constants/theme';
import {useHistory} from 'react-router-native';
import {TouchableRipple} from 'react-native-paper';
import {Repo} from '../../../entities';
import dayjs from 'dayjs';
import {textStyles} from '../../../constants/text-styles';

interface RepoCardProps {
  repo: Repo;
}
export const RepoCard = ({repo}: RepoCardProps) => {
  const history = useHistory();

  const updatedFromNow = dayjs(repo.lastUpdated).fromNow(true);

  return (
    <TouchableRipple
      style={styles.cardContainer}
      onPress={() => history.push(`/asdf`)}
      rippleColor={theme.colors.outlineColor}>
      <View>
        <View style={styles.topDisplayRow}>
          <Text numberOfLines={1} style={styles.cardName}>
            {repo.name}
          </Text>
          <Text style={styles.lastUpdated}>Updated {updatedFromNow} ago</Text>
        </View>
        <View style={styles.displayRow}>
          <View style={styles.branchView}>
            <Icon name="check-circle" size={16} color={theme.colors.accent} />
            <Text style={styles.branchName}>{repo.currentBranchName}</Text>
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
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 8,
    ...textStyles.headline_03,
  },
  lastUpdated: {
    color: theme.colors.on_surface_light,
    opacity: 0.6,
    ...textStyles.caption_02,
  },
  branchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    color: theme.colors.accent,
    marginLeft: 4,
    ...textStyles.caption_01,
  },
});
