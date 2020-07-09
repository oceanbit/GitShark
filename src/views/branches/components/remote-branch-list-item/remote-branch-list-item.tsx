import * as React from 'react';
import {StyleProp, Text, ViewStyle} from 'react-native';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkIconButton} from '@components/shark-icon-button';
import {TouchableRipple} from 'react-native-paper';

interface BranchMock {
  name: string;
}

interface RemoteBranchListItemProps {
  branch: BranchMock;
  style?: StyleProp<ViewStyle>;
}

export const RemoteBranchListItem = ({
  branch,
  style = {},
}: RemoteBranchListItemProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <TouchableRipple style={[styles.container, style]} onPress={() => {}}>
      <>
        <Text style={styles.branchName}>{branch.name}</Text>
        <SharkIconButton
          iconName="history"
          primaryColor={false}
          onPress={() => {}}
        />
        <SharkIconButton
          iconName="menu"
          primaryColor={false}
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
    ...theme.textStyles.body_01,
    color: theme.colors.on_surface,
  },
});
