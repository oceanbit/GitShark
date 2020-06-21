import * as React from 'react';
import {Text} from 'react-native';
import {theme, textStyles} from '@constants';
import {
  DynamicStyleSheet,
  useDynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {PushPullArrows} from '@components/push-pull-arrows';
import {SharkIconButton} from '@components/shark-icon-button';
import {TouchableRipple} from 'react-native-paper';
import {Divider, Menu} from 'react-native-paper';
import {SharkMenu} from '@components/shark-menu';
import {DeleteBranchDialog} from '../delete-branch-dialog';
import {RenameBranchDialog} from '../rename-branch-dialog';

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
}

type BranchListItemDialogTypes = 'delete' | 'rename' | '';

export const BranchListItem = ({
  branch,
  localBranches,
  selected,
  isFavorite,
  onDeleteLocalBranch,
  onCheckoutBranch,
}: BranchListItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState<BranchListItemDialogTypes>(
    '',
  );

  const styles = useDynamicStyleSheet(dynamicStyles);

  const selected_primary = useDynamicValue(theme.colors.selected_primary);

  const bgColor = selected ? {backgroundColor: selected_primary} : {};

  const branchNameSelected = selected
    ? styles.branchSelected
    : styles.branchNameNormal;

  return (
    <>
      <TouchableRipple style={[styles.container, bgColor]} onPress={() => {}}>
        <>
          <Text style={[styles.branchName, branchNameSelected]}>
            {branch.name}
          </Text>
          <PushPullArrows
            primaryText={selected}
            commitsToPull={branch.down}
            commitsToPush={branch.up}
            style={styles.arrowStyles}
          />
          <SharkIconButton
            iconName={isFavorite ? 'favorite_selected' : 'favorite'}
            primaryColor={selected}
            onPress={() => {}}
          />
          <SharkIconButton
            iconName="history"
            primaryColor={selected}
            onPress={() => {}}
          />
          <SharkMenu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <SharkIconButton
                iconName="menu"
                primaryColor={selected}
                onPress={() => setIsMenuOpen(true)}
              />
            }>
            <Menu.Item
              onPress={() => {
                onCheckoutBranch(branch.name);
              }}
              title={`Checkout ${branch.name}`}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setDialogOpen('rename');
                setIsMenuOpen(false);
              }}
              title="Rename"
            />
            <Menu.Item
              onPress={() => {
                setDialogOpen('delete');
                setIsMenuOpen(false);
              }}
              title="Delete"
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
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: 'center',
  },
  arrowStyles: {
    marginLeft: 16,
    marginRight: 8,
  },
  branchName: {
    flexGrow: 1,
    width: 1,
  },
  branchSelected: {
    ...textStyles.callout,
    color: theme.colors.primary,
  },
  branchNameNormal: {
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
});
