import {TouchableRipple} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';
import * as React from 'react';
import {ExtendedFabBase} from './types';
import {textStyles} from '../../../constants/text-styles';

export const NewRepoFab = ({toggleAnimation}: ExtendedFabBase) => {
  return (
    <TouchableRipple
      style={fabStyles.fab}
      onPress={() => {
        toggleAnimation();
      }}>
      <Text style={fabStyles.fabActionText}>New repository</Text>
    </TouchableRipple>
  );
};

const fabStyles = StyleSheet.create({
  fab: {
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  fabActionText: {
    ...textStyles.callout,
    color: 'white',
    textAlign: 'center',
  },
});
