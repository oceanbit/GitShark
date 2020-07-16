import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface PushPullArrowsProps {
  commitsToPull: string[];
  commitsToPush: string[];
  style?: StyleProp<ViewStyle>;
  primaryText?: boolean;
}

export const PushPullArrows = ({
  commitsToPull,
  commitsToPush,
  style = {},
  primaryText = true,
}: PushPullArrowsProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface = useDynamicValue(theme.colors.on_surface);
  if (!commitsToPull?.length && !commitsToPush?.length) {
    return null;
  }
  const color = primaryText ? accent : on_surface;
  return (
    <View style={[styles.arrowContainer, style]}>
      {!!commitsToPush?.length && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow_up" size={10} color={color} />
          <Text style={[styles.commitNumberText, {color}]}>
            {commitsToPush.length}
          </Text>
        </View>
      )}
      {!!commitsToPush?.length && !!commitsToPull?.length && (
        <View style={styles.middleLine} />
      )}
      {!!commitsToPull?.length && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow_down" size={10} color={color} />
          <Text style={[styles.commitNumberText, {color}]}>
            {commitsToPull.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export const dynamicStyles = new DynamicStyleSheet({
  arrowContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.tint_on_surface_16,
    borderRadius: theme.borderRadius.small,
    borderWidth: theme.borders.normal,
    flexDirection: 'row',
  },
  middleLine: {
    width: 1,
    backgroundColor: theme.colors.tint_on_surface_16,
  },
  commitNumberView: {
    padding: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commitNumberText: {
    marginLeft: 2,
    ...theme.textStyles.overline,
  },
  primaryText: {
    color: theme.colors.primary,
  },
});
