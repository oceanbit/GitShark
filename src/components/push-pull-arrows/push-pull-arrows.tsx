import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {Icon} from '@components/shark-icon';
import {theme, textStyles} from '@constants';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface PushPullArrowsProps {
  commitsToPull: number;
  commitsToPush: number;
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
  if (!commitsToPull && !commitsToPush) {
    return null;
  }
  const color = primaryText ? accent : on_surface;
  return (
    <View style={[styles.arrowContainer, style]}>
      {!!commitsToPush && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow_up" size={10} color={color} />
          <Text style={[styles.commitNumberText, {color}]}>
            {commitsToPush}
          </Text>
        </View>
      )}
      {!!commitsToPush && !!commitsToPull && <View style={styles.middleLine} />}
      {!!commitsToPull && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow_down" size={10} color={color} />
          <Text style={[styles.commitNumberText, {color}]}>
            {commitsToPull}
          </Text>
        </View>
      )}
    </View>
  );
};

export const dynamicStyles = new DynamicStyleSheet({
  arrowContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.divider,
    borderRadius: theme.lessRoundness,
    borderWidth: 1,
    flexDirection: 'row',
  },
  middleLine: {
    width: 1,
    backgroundColor: theme.colors.divider,
  },
  commitNumberView: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commitNumberText: {
    marginLeft: 2,
    ...textStyles.overline,
  },
  primaryText: {
    color: theme.colors.primary,
  },
});
