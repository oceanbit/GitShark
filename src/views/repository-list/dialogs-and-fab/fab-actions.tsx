import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {DialogSelection, ExtendedFabBase} from './types';
import {textStyles} from '../../../constants/text-styles';

interface FabActionsProps extends ExtendedFabBase {
  onSelect: (selection: DialogSelection) => void;
}
export const FabActions = ({toggleAnimation, onSelect}: FabActionsProps) => {
  return (
    <View style={fabActionsStyles.fabActions}>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('clone');
        }}>
        <Text style={fabActionsStyles.fabActionText}>Clone</Text>
      </TouchableRipple>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('create');
        }}>
        <Text style={fabActionsStyles.fabActionText}>Create</Text>
      </TouchableRipple>
      <TouchableRipple
        style={fabActionsStyles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('existing');
        }}>
        <Text style={fabActionsStyles.fabActionText}>Add existing</Text>
      </TouchableRipple>
    </View>
  );
};

const fabActionsStyles = StyleSheet.create({
  fabActions: {
    borderRadius: 14,
    paddingTop: 12,
    paddingBottom: 12,
    top: 0,
  },
  fabActionBtn: {
    padding: 12,
    width: '100%',
  },
  fabActionText: {
    ...textStyles.callout,
    color: 'white',
    textAlign: 'center',
  },
});
