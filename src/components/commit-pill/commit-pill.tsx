import * as React from 'react';
import {View, Text, StyleProp, ViewStyle} from 'react-native';
import {
  DynamicStyleSheet,
  useDynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {textStyles, theme} from '@constants';
import {Icon} from '@components/shark-icon';

interface CommitPillProps {
  isGitHub?: boolean;
  name: string;
  color: string;
  style?: StyleProp<ViewStyle>;
}
export const CommitPill = ({isGitHub, name, color, style}: CommitPillProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const on_surface = useDynamicValue(theme.colors.on_surface);

  return (
    <View style={[styles.container, {borderColor: color}, style]}>
      <View style={styles.paddingContainer}>
        {isGitHub && (
          <Icon
            size={16}
            name={'github'}
            color={on_surface}
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
    borderWidth: 1,
    position: 'relative',
    borderRadius: theme.lessRoundness,
  },
  paddingContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingLeft: 4,
    paddingRight: 8,
    paddingVertical: 2,
  },
  tagName: {
    marginLeft: 4,
    ...textStyles.caption_02,
    color: theme.colors.on_surface,
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
