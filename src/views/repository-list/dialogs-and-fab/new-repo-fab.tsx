import {TouchableRipple} from 'react-native-paper';
import {Text} from 'react-native';
import * as React from 'react';
import {ExtendedFabBase} from './types';
import {textStyles, theme} from '../../../constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

export const NewRepoFab = ({toggleAnimation}: ExtendedFabBase) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <TouchableRipple
      style={styles.fab}
      onPress={() => {
        toggleAnimation();
      }}>
      <Text style={styles.fabActionText}>New repository</Text>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  fab: {
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  fabActionText: {
    ...textStyles.callout,
    color: theme.colors.on_primary,
    textAlign: 'center',
  },
});
