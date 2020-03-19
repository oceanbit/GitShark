import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {RepoCardCommitMetadata} from './repo-card-commit-metadata';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../constants/theme';
import {TouchableRipple, Menu} from 'react-native-paper';
import {Repo} from '../../../entities';
import dayjs from 'dayjs';
import {textStyles} from '../../../constants/text-styles';
import {useNavigation} from '@react-navigation/native';

interface RepoCardProps {
  repo: Repo;
}
export const RepoCard = ({repo}: RepoCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const history = useNavigation();

  const updatedFromNow = dayjs(repo.lastUpdated).fromNow(true);

  return (
    <TouchableRipple
      style={styles.cardContainer}
      onPress={() => {
        history.navigate(`RepoDetails`, {
          repoId: repo.id,
        });
      }}
      rippleColor={theme.colors.outlineColor}>
      <View>
        <View style={styles.topDisplayRow}>
          <View style={styles.repoNameAndDate}>
            <Text numberOfLines={1} style={styles.cardName}>
              {repo.name}
            </Text>
            <Text style={styles.lastUpdated}>Updated {updatedFromNow} ago</Text>
          </View>
          <Menu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <TouchableRipple
                style={styles.moreButtonContainer}
                onPress={() => setIsMenuOpen(true)}>
                <Icon
                  name="dots-horizontal"
                  size={24}
                  color={theme.colors.accent}
                />
              </TouchableRipple>
            }>
            <Menu.Item onPress={() => {}} title="Rename" />
            <Menu.Item onPress={() => {}} title="Delete" />
          </Menu>
        </View>
        <View style={styles.displayRow}>
          <View style={styles.branchView}>
            <Icon name="check-circle" size={16} color={theme.colors.accent} />
            <Text style={styles.branchName}>{repo.currentBranchName}</Text>
          </View>
          <RepoCardCommitMetadata
            commitsToPull={repo.commitsToPull}
            commitsToPush={repo.commitsToPush}
            style={styles.statusComponent}
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
    paddingTop: 8,
    paddingBottom: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
  topDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  repoNameAndDate: {
    paddingTop: 8,
    flexDirection: 'column',
  },
  moreButtonContainer: {
    height: 56,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: theme.colors.on_surface_secondary_light,
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
  statusComponent: {
    marginRight: 16,
  }
});
