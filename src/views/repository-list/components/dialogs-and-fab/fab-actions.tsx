import * as React from 'react';
import {Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {DialogSelection, ExtendedFabBase} from './types';
import {spacing, textStyles, theme} from '@constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface FabActionsProps extends ExtendedFabBase {
  onSelect: (selection: DialogSelection) => void;
}

export const FabActions = ({toggleAnimation, onSelect}: FabActionsProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <View style={styles.fabActions}>
      <TouchableRipple
        style={styles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('clone');
        }}>
        <Text style={styles.fabActionText}>Clone</Text>
      </TouchableRipple>
      <TouchableRipple
        style={styles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('create');
        }}>
        <Text style={styles.fabActionText}>Create</Text>
      </TouchableRipple>
      <TouchableRipple
        style={styles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('existing');
        }}>
        <Text style={styles.fabActionText}>Add existing</Text>
      </TouchableRipple>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  fabActions: {
    borderRadius: spacing.s,
    paddingTop: spacing.s,
    paddingBottom: spacing.s,
    top: 0,
  },
  fabActionBtn: {
    padding: spacing.s,
    width: '100%',
  },
  fabActionText: {
    ...textStyles.callout,
    color: theme.colors.on_primary,
    textAlign: 'center',
  },
});
