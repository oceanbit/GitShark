import {TouchableRipple} from 'react-native-paper';
import {Text} from 'react-native';
import * as React from 'react';
import {ExtendedFabBase} from './types';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useTranslation} from 'react-i18next';

export const NewRepoFab = ({toggleAnimation}: ExtendedFabBase) => {
  const styles = useDynamicValue(dynamicStyles);

  const {t} = useTranslation();

  return (
    <TouchableRipple
      style={styles.fab}
      onPress={() => {
        toggleAnimation();
      }}>
      <Text style={styles.fabActionText}>{t('newFABAction')}</Text>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  fab: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: 28,
  },
  fabActionText: {
    ...theme.textStyles.callout_01,
    color: theme.colors.on_primary,
    textAlign: 'center',
  },
});
