import * as React from 'react';
import {Platform, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {DialogSelection, ExtendedFabBase} from './types';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useTranslation} from 'react-i18next';

const iOS = Platform.OS === 'ios';

interface FabActionsProps extends ExtendedFabBase {
  onSelect: (selection: DialogSelection) => void;
}

export const FabActions = ({toggleAnimation, onSelect}: FabActionsProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.fabActions}>
      <TouchableRipple
        style={styles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('clone');
        }}>
        <Text style={styles.fabActionText}>{t('cloneFABAction')}</Text>
      </TouchableRipple>
      <TouchableRipple
        style={styles.fabActionBtn}
        onPress={() => {
          toggleAnimation();
          onSelect('create');
        }}>
        <Text style={styles.fabActionText}>{t('createFABAction')}</Text>
      </TouchableRipple>
      {!iOS && (
        <TouchableRipple
          style={styles.fabActionBtn}
          onPress={() => {
            toggleAnimation();
            onSelect('existing');
          }}>
          <Text style={styles.fabActionText}>{t('existFABAction')}</Text>
        </TouchableRipple>
      )}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  fabActions: {
    borderRadius: theme.spacing.s,
    paddingTop: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    top: 0,
  },
  fabActionBtn: {
    padding: theme.spacing.s,
    width: '100%',
  },
  fabActionText: {
    ...theme.textStyles.callout_01,
    color: theme.colors.on_primary,
    textAlign: 'center',
  },
});
