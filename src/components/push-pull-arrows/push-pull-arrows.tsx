import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme, textStyles} from '../../constants';
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
  if (!commitsToPull && !commitsToPush) {
    return null;
  }
  const primaryStyle = primaryText ? styles.primaryText : {};
  return (
    <View style={[styles.arrowContainer, style]}>
      {!!commitsToPush && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-up" size={10} color={accent} />
          <Text style={[styles.commitNumberText, primaryStyle]}>
            {commitsToPush}
          </Text>
        </View>
      )}
      {!!commitsToPush && commitsToPull && <View style={styles.middleLine} />}
      {!!commitsToPull && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-down" size={10} color={accent} />
          <Text style={[styles.commitNumberText, primaryStyle]}>
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
    fontSize: 10,
    marginLeft: 2,
    ...textStyles.overline,
  },
  primaryText: {
    color: theme.colors.primary,
  },
});
