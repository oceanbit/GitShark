import {TouchableRipple} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';
import * as React from 'react';
import {ExtendedFabBase} from './types';

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
    fontSize: 16,
    fontFamily: 'Rubik',
    color: 'white',
    textAlign: 'center',
  },
});
