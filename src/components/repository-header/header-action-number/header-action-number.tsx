import * as React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {Text, View} from 'react-native';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

interface HeaderActionNumberProps {
  iconName: string;
  val?: number;
  onPress?: () => void;
  label: string;
}

export const HeaderActionNumber = ({
  iconName,
  val,
  onPress,
  label,
}: HeaderActionNumberProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const accent = useDynamicValue(theme.colors.primary);

  return (
    <TouchableRipple
      onPress={onPress || (() => {})}
      style={!!val ? styles.outlineContainer : styles.container}
      accessible={true}
      accessibilityLabel={label}>
      <View style={styles.repoHeader}>
        <Icon name={iconName} size={24} color={accent} />
        {!!val && <Text style={styles.valText}>{val}</Text>}
      </View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  repoHeader: {
    padding: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginRight: theme.spacing.xs,
  },
  outlineContainer: {
    borderWidth: theme.borders.thick,
    borderColor: theme.colors.tint_on_surface_01,
    borderRadius: theme.borderRadius.regular,
    marginRight: theme.spacing.xs,
  },
  backBtn: {
    padding: theme.spacing.xs,
    borderRadius: 50,
  },
  valText: {
    ...theme.textStyles.callout_01,
    marginLeft: theme.spacing.xs,
    marginRight: 2,
    color: theme.colors.primary,
  },
});
