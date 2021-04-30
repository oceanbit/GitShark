import * as React from 'react';
import {Text} from 'react-native';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {PushPullArrows} from '@components/push-pull-arrows';
import {SharkIconButton} from '@components/shark-icon-button';
import {Divider, Menu, TouchableRipple} from 'react-native-paper';
import {SharkMenu} from '@components/shark-menu';
import {DeleteBranchDialog} from '../delete-branch-dialog';
import {RenameBranchDialog} from '../rename-branch-dialog';
import {useTranslation} from 'react-i18next';

interface BranchMock {
  name: string;
  up: number;
  down: number;
}

interface BranchListItemProps {
  branch: BranchMock;
  localBranches: string[];
  selected: boolean;
  isFavorite: boolean;
  onDeleteLocalBranch: (branchName: string) => Promise<void>;
  onCheckoutBranch: (branchName: string) => Promise<void>;
  onBranchMerge: (branchName: string) => void;
  onBranchRename: (props: {
    branchName: string;
    selected: boolean;
    oldBranchName: string;
  }) => Promise<void>;
}

type BranchListItemDialogTypes = 'delete' | 'rename' | '';

export const BranchListItem = ({
  branch,
  localBranches,
  selected,
  isFavorite,
  onBranchMerge,
  onDeleteLocalBranch,
  onCheckoutBranch,
  onBranchRename,
}: BranchListItemProps) => {
  const {t} = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState<BranchListItemDialogTypes>(
    '',
  );

  const styles = useDynamicValue(dynamicStyles);

  const onSurfaceColor = useDynamicValue(theme.colors.label_high_emphasis);
  const tint_primary_02 = useDynamicValue(theme.colors.tint_primary_02);

  const bgColor = selected ? {backgroundColor: tint_primary_02} : {};

  const branchNameSelected = selected
    ? styles.branchSelected
    : styles.branchNameNormal;

  return (
    <>
      <TouchableRipple
        style={[styles.container, bgColor]}
        onPress={() => {
          onCheckoutBranch(branch.name);
        }}>
        <>
          <Text style={[styles.branchName, branchNameSelected]}>
            {branch.name}
          </Text>
          <PushPullArrows
            primaryText={selected}
            commitsToPull={[]}
            commitsToPush={[]}
            style={styles.arrowStyles}
          />
          {/*<SharkIconButton*/}
          {/*  iconName={isFavorite ? 'favorite_selected' : 'favorite'}*/}
          {/*  primaryColor={selected}*/}
          {/*  onPress={() => {}}*/}
          {/*/>*/}
          {/*<SharkIconButton*/}
          {/*  iconName="history"*/}
          {/*  primaryColor={selected}*/}
          {/*  onPress={() => {}}*/}
          {/*/>*/}
          <SharkMenu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <SharkIconButton
                label={t('repoMenuLabel', {repoName: branch.name})}
                iconName="menu"
                color={selected ? undefined : onSurfaceColor}
                onPress={() => setIsMenuOpen(true)}
              />
            }>
            <Menu.Item
              onPress={() => {
                onCheckoutBranch(branch.name);
              }}
              title={t('checkoutNamedBranch', {branchName: branch.name})}
            />
            <Menu.Item
              onPress={() => {
                onBranchMerge(branch.name);
              }}
              title={t('mergeNamedBranch', {branchName: branch.name})}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setDialogOpen('rename');
                setIsMenuOpen(false);
              }}
              title={t('renameAction')}
            />
            <Menu.Item
              onPress={() => {
                setDialogOpen('delete');
                setIsMenuOpen(false);
              }}
              title={t('deleteAction')}
              disabled={selected}
            />
          </SharkMenu>
        </>
      </TouchableRipple>
      <DeleteBranchDialog
        onDismiss={shouldDelete => {
          setDialogOpen('');
          if (shouldDelete) onDeleteLocalBranch(branch.name);
        }}
        visible={dialogOpen === 'delete'}
      />
      <RenameBranchDialog
        onDismiss={() => {
          setDialogOpen('');
        }}
        onBranchRename={({branchName}) => {
          setDialogOpen('');
          onBranchRename({branchName, selected, oldBranchName: branch.name});
        }}
        visible={dialogOpen === 'rename'}
        branches={localBranches}
      />
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingVertical: theme.spacing.xs,
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.xs,
    alignItems: 'center',
  },
  arrowStyles: {
    marginLeft: theme.spacing.m,
    marginRight: theme.spacing.xs,
  },
  branchName: {
    flexGrow: 1,
    width: 1,
  },
  branchSelected: {
    ...theme.textStyles.callout_01,
    color: theme.colors.primary,
  },
  branchNameNormal: {
    ...theme.textStyles.body_01,
    color: theme.colors.label_high_emphasis,
  },
});
