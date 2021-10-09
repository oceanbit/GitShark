import {Text, View} from 'react-native';
import * as React from 'react';
import {PushPullArrows} from '@components/push-pull-arrows';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {Menu, TouchableRipple} from 'react-native-paper';
import {ReduxRepo} from '@entities';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {RenameRepositoryDialog} from '@components/rename-repository-dialog';
import {DeleteRepositoryDialog} from '../delete-repository-dialog';
import {dynamicStyles} from './repo-card.styles';
import {useDynamicValue} from 'react-native-dynamic';
import {SharkMenu} from '@components/shark-menu';
import {useTranslation} from 'react-i18next';
import {NavProps} from '@types';

type DialogActionsType = '' | 'rename' | 'delete';

interface RepoCardProps {
  repo: ReduxRepo;
  onDelete: () => void;
  onRename: (name: string) => void;
}

export const RepoCard = ({repo, onDelete, onRename}: RepoCardProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState<DialogActionsType>('');
  const history = useNavigation<NavProps>();

  const updatedFromNow = dayjs(repo.lastUpdated).fromNow(true);

  const accent = useDynamicValue(theme.colors.primary);
  const ripplePrimary = useDynamicValue(theme.colors.ripple_neutral);

  const updatedStr = t('updatedAgo', {time: updatedFromNow});

  let accessibilityLabel = t('repoCardLabel', {
    repoName: repo.name,
    updated: updatedStr,
    branchName: repo.currentBranchName,
  });

  if (repo.commitsToPull?.length) {
    accessibilityLabel += t('needsToPull', {num: repo.commitsToPull.length});
  }
  if (repo.commitsToPush?.length) {
    accessibilityLabel += t('needsToPush', {num: repo.commitsToPush.length});
  }

  return (
    <>
      <TouchableRipple
        style={styles.cardContainer}
        onPress={() => {
          history.navigate('RepoDetails', {
            repoId: repo.id,
          });
        }}
        accessible={true}
        accessibilityRole={'button'}
        accessibilityLabel={accessibilityLabel}
        rippleColor={ripplePrimary}>
        <View>
          <View style={styles.topDisplayRow}>
            <View style={styles.repoNameAndDate}>
              <Text numberOfLines={1} style={styles.cardName}>
                {repo.name}
              </Text>
              <Text style={styles.lastUpdated}>{updatedStr}</Text>
            </View>
            <SharkMenu
              visible={isMenuOpen}
              onDismiss={() => setIsMenuOpen(false)}
              anchor={
                <TouchableRipple
                  accessibilityLabel={t('repoMenuLabel', {repoName: repo.name})}
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
                title={t('renameAction')}
              />
              <Menu.Item
                onPress={() => {
                  setOpenDialog('delete');
                  setIsMenuOpen(false);
                }}
                title={t('deleteAction')}
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
        visible={openDialog === 'rename'}
        onDismiss={newName => {
          setOpenDialog('');
          if (newName) {
            onRename(newName);
          }
        }}
      />
      <DeleteRepositoryDialog
        visible={openDialog === 'delete'}
        onDismiss={didDelete => {
          setOpenDialog('');
          if (didDelete) {
            onDelete();
          }
        }}
      />
    </>
  );
};
