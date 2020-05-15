import * as React from 'react';
import {Text} from 'react-native';
import {theme, textStyles} from '../../../../constants';
import {
  DynamicStyleSheet,
  useDynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {PushPullArrows} from '../../../../components/push-pull-arrows';
import {SharkIconButton} from '../../../../components/shark-icon-button';
import {TouchableRipple} from 'react-native-paper';

interface BranchMock {
  name: string;
  up: number;
  down: number;
}

interface BranchListItemProps {
  branch: BranchMock;
  selected: boolean;
  isFavorite: boolean;
}

export const BranchListItem = ({
  branch,
  selected,
  isFavorite,
}: BranchListItemProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const selected_primary = useDynamicValue(theme.colors.selected_primary);

  const bgColor = selected ? {backgroundColor: selected_primary} : {};

  const branchNameSelected = selected
    ? styles.branchSelected
    : styles.branchNameNormal;

  return (
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
          iconName={isFavorite ? 'star' : 'star-outline'}
          primaryColor={selected}
          onPress={() => {}}
        />
        <SharkIconButton
          iconName="history"
          primaryColor={selected}
          onPress={() => {}}
        />
        <SharkIconButton
          iconName="dots-horizontal"
          primaryColor={selected}
          onPress={() => {}}
        />
      </>
    </TouchableRipple>
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
