import * as React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {Text, View} from 'react-native';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

export const HeaderActionNumber = ({
  iconName,
  val,
  onPress,
}: {
  iconName: string;
  val?: number;
  onPress?: () => void;
}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const accent = useDynamicValue(theme.colors.primary);

  return (
    <TouchableRipple
      onPress={onPress || (() => {})}
      style={!!val ? styles.outlineContainer : styles.container}>
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
    borderColor: theme.colors.tint_on_surface_16,
    borderRadius: theme.borderRadius.regular,
    marginRight: theme.spacing.xs,
  },
  backBtn: {
    padding: theme.spacing.xs,
    borderRadius: 50,
  },
  valText: {
    ...theme.textStyles.callout,
    marginLeft: theme.spacing.xs,
    marginRight: 2,
    color: theme.colors.primary,
  },
});
