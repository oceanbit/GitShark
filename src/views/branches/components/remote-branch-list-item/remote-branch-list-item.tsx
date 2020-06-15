import * as React from 'react';
import {Text, StyleProp, ViewStyle} from 'react-native';
import {theme, textStyles} from '@constants';
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
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
});
