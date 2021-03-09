import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {SharkIconButton} from '../shark-icon-button';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkDivider} from '../shark-divider';

interface LeftIcon {
  leftIcon: string;
  leftIconLabel: string;
}

type LeftIconMaybe =
  | LeftIcon
  | {
      leftIcon: undefined;
      leftIconLabel: undefined;
    };

interface AppBarProps {
  headline?: string;
  caption?: string;
  rightChild?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLeftSelect?: () => void;
  hasBottomBorder?: boolean;
}

export const AppBar = ({
  leftIcon,
  leftIconLabel,
  onLeftSelect = () => {},
  headline,
  caption,
  rightChild = null,
  style = {},
  hasBottomBorder = true,
}: AppBarProps & LeftIconMaybe) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <>
      <View style={[styles.container, style]}>
        {!!leftIcon && (
          <SharkIconButton
            iconName={leftIcon}
            label={leftIconLabel || ''}
            onPress={onLeftSelect}
          />
        )}
        <View style={styles.textContainer}>
          {!!headline && (
            <Text accessibilityRole={'header'} style={styles.headline}>
              {headline}
            </Text>
          )}
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
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.m,
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
    marginLeft: theme.spacing.xs,
  },
  headline: {
    ...theme.textStyles.headline_06,
    color: theme.colors.label_high_emphasis,
  },
  caption: {
    ...theme.textStyles.caption_02,
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
  },
});
