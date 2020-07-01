import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {SharkIconButton} from '../shark-icon-button';
import {spacing, textStyles, theme} from '@constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkDivider} from '../shark-divider';

interface AppBarProps {
  headline?: string;
  caption?: string;
  rightChild?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  leftIcon?: string;
  onLeftSelect?: () => void;
  hasBottomBorder?: boolean;
}

export const AppBar = ({
  leftIcon,
  onLeftSelect = () => {},
  headline,
  caption,
  rightChild = null,
  style = {},
  hasBottomBorder = true,
}: AppBarProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <>
      <View style={[styles.container, style]}>
        {!!leftIcon && (
          <SharkIconButton iconName={leftIcon} onPress={onLeftSelect} />
        )}
        <View style={styles.textContainer}>
          {!!headline && <Text style={styles.headline}>{headline}</Text>}
          {!!caption && <Text style={styles.caption}>{caption}</Text>}
        </View>
        {rightChild}
      </View>
      {hasBottomBorder && <SharkDivider />}
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.m,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.floating_surface,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: 1,
    marginLeft: spacing.xs,
  },
  headline: {
    ...textStyles.headline_03,
    color: theme.colors.on_surface,
  },
  caption: {
    ...textStyles.caption_02,
    color: theme.colors.on_surface_secondary,
  },
});
