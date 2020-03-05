import React from 'react';
import {BottomNavigation, TouchableRipple} from 'react-native-paper';
import {RepositoryChanges} from '../repository-changes/repository-changes';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {RepositoryHeader} from '../../components/repository-header/repository-header';

const routes = [
  {
    key: 'changes',
    icon: 'file-multiple',
    title: 'Changes',
  },
  {
    key: 'history',
    icon: 'history',
    title: 'History',
  },
];

export const Repository = () => {
  const [index, setIndex] = React.useState(0);

  const _handleIndexChange = React.useCallback(
    (index: number) => setIndex(index),
    [],
  );

  const state = React.useMemo(() => ({index, routes}), [index]);

  const _renderScene = React.useMemo(
    () =>
      BottomNavigation.SceneMap({
        history: RepositoryChanges,
        changes: RepositoryChanges,
      }),
    [],
  );

  return (
    <>
      <RepositoryHeader />
      <BottomNavigation
        labeled={true}
        shifting={false}
        navigationState={state}
        onIndexChange={_handleIndexChange}
        renderScene={_renderScene}
        barStyle={styles.bottomNav}
        inactiveColor={theme.colors.disabled}
        activeColor={theme.colors.accent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineColor,
  },
});
