import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {TouchableRipple} from 'react-native-paper';

interface BranchMock {
  name: string;
}

interface RemoteBranchListItemProps {
  branch: BranchMock;
  style?: StyleProp<ViewStyle>;
  onSelect: () => void;
}

export const RemoteBranchListItem = ({
  branch,
  style = {},
  onSelect,
}: RemoteBranchListItemProps) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <TouchableRipple style={[styles.container, style]} onPress={onSelect}>
      <>
        <Text style={styles.branchName}>{branch.name}</Text>
        {/*<SharkIconButton*/}
        {/*  iconName="history"*/}
        {/*  primaryColor={false}*/}
        {/*  onPress={() => {}}*/}
        {/*/>*/}
        {/*<SharkIconButton*/}
        {/*  iconName="menu"*/}
        {/*  primaryColor={false}*/}
        {/*  onPress={() => {}}*/}
        {/*/>*/}
        <View style={{height: 40}} />
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
    color: theme.colors.label_high_emphasis,
  },
});
