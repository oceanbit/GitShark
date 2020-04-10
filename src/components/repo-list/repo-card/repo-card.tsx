import {Text, View} from 'react-native';
import * as React from 'react';
import {RepoCardCommitMetadata} from './repo-card-commit-metadata';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {legacyTheme} from '../../../constants/theme';
import {TouchableRipple, Menu} from 'react-native-paper';
import {Repo} from '../../../entities';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {RenameRepositoryDialog} from '../../rename-repository-dialog/rename-repository-dialog';
import {DeleteRepositoryDialog} from '../../delete-repository-dialog/delete-repository-dialog';
import {styles} from './repo-card.styles';

type DialogActionsType = '' | 'rename' | 'delete';
interface RepoCardProps {
  repo: Repo;
  onUpdate: () => void;
}
export const RepoCard = ({repo, onUpdate}: RepoCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState<DialogActionsType>('');
  const history = useNavigation();

  const updatedFromNow = dayjs(repo.lastUpdated).fromNow(true);

  return (
    <>
      <TouchableRipple
        style={styles.cardContainer}
        onPress={() => {
          history.navigate(`RepoDetails`, {
            repoId: repo.id,
          });
        }}
        rippleColor={legacyTheme.colors.outlineColor}>
        <View>
          <View style={styles.topDisplayRow}>
            <View style={styles.repoNameAndDate}>
              <Text numberOfLines={1} style={styles.cardName}>
                {repo.name}
              </Text>
              <Text style={styles.lastUpdated}>
                Updated {updatedFromNow} ago
              </Text>
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
                    color={legacyTheme.colors.accent}
                  />
                </TouchableRipple>
              }>
              <Menu.Item
                onPress={() => {
                  setOpenDialog('rename');
                  setIsMenuOpen(false);
                }}
                title="Rename"
              />
              <Menu.Item
                onPress={() => {
                  setOpenDialog('delete');
                  setIsMenuOpen(false);
                }}
                title="Delete"
              />
            </Menu>
          </View>
          <View style={styles.displayRow}>
            <View style={styles.branchView}>
              <Icon name="check-circle" size={16} color={legacyTheme.colors.accent} />
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
      <RenameRepositoryDialog
        repo={repo}
        visible={openDialog === 'rename'}
        onDismiss={didUpdate => {
          setOpenDialog('');
          if (didUpdate) {
            onUpdate();
          }
        }}
      />
      <DeleteRepositoryDialog
        repo={repo}
        visible={openDialog === 'delete'}
        onDismiss={didUpdate => {
          setOpenDialog('');
          if (didUpdate) {
            onUpdate();
          }
        }}
      />
    </>
  );
};
