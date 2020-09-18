import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {Icon} from '@components/shark-icon';

interface CommitPillProps {
  isGitHub?: boolean;
  name: string;
  color: string;
  style?: StyleProp<ViewStyle>;
}

export const CommitPill = ({isGitHub, name, color, style}: CommitPillProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const label_high_emphasis = useDynamicValue(theme.colors.label_high_emphasis);

  return (
    <View style={[styles.container, {borderColor: color}, style]}>
      <View style={styles.paddingContainer}>
        {isGitHub && (
          <Icon
            size={16}
            name={'github'}
            color={label_high_emphasis}
            style={{textAlign: 'center'}}
          />
        )}
        <Text style={styles.tagName}>{name}</Text>
      </View>
      <View
        style={[
          styles.background,
          {
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    borderWidth: theme.borders.normal,
    position: 'relative',
    borderRadius: theme.borderRadius.small,
  },
  paddingContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingLeft: theme.spacing.xxs,
    paddingRight: theme.spacing.xs,
    paddingVertical: 2,
  },
  tagName: {
    marginLeft: theme.spacing.xxs,
    ...theme.textStyles.caption_02,
    color: theme.colors.label_high_emphasis,
  },
  background: {
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
});
