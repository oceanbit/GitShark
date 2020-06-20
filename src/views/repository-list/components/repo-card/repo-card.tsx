import {Text, View} from 'react-native';
import * as React from 'react';
import {PushPullArrows} from '@components/push-pull-arrows';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {Menu, TouchableRipple} from 'react-native-paper';
import {ReduxRepo} from '@entities';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {RenameRepositoryDialog} from '../rename-repository-dialog';
import {DeleteRepositoryDialog} from '../delete-repository-dialog';
import {dynamicStyles} from './repo-card.styles';
import {useDynamicStyleSheet, useDynamicValue} from 'react-native-dark-mode';
import {SharkMenu} from '@components/shark-menu';

type DialogActionsType = '' | 'rename' | 'delete';

interface RepoCardProps {
  repo: ReduxRepo;
  onUpdate: () => void;
}

export const RepoCard = ({repo, onUpdate}: RepoCardProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState<DialogActionsType>('');
  const history = useNavigation();

  const updatedFromNow = dayjs(repo.lastUpdated).fromNow(true);

  const accent = useDynamicValue(theme.colors.primary);
  const ripplePrimary = useDynamicValue(theme.colors.ripple_surface);

  return (
    <>
      <TouchableRipple
        style={styles.cardContainer}
        onPress={() => {
          history.navigate('RepoDetails', {
            repoId: repo.id,
          });
        }}
        rippleColor={ripplePrimary}>
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
            <SharkMenu
              visible={isMenuOpen}
              onDismiss={() => setIsMenuOpen(false)}
              anchor={
                <TouchableRipple
                  style={styles.moreButtonContainer}
                  onPress={() => setIsMenuOpen(true)}>
                  <Icon name="menu" size={24} color={accent} />
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
            </SharkMenu>
          </View>
          <View style={styles.displayRow}>
            <View style={styles.branchView}>
              <Icon name="radio_selected" size={16} color={accent} />
              <Text style={styles.branchName}>{repo.currentBranchName}</Text>
            </View>
            <PushPullArrows
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
