import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {SharkIconButton} from '../shark-icon-button';
import {textStyles, theme} from '../../constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface AppBarProps {
  headline: string;
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

  const botttomBarStyle = hasBottomBorder ? styles.bottomBar : {};
  return (
    <View style={[styles.container, botttomBarStyle, style]}>
      {!!leftIcon && (
        <SharkIconButton iconName={leftIcon} onPress={onLeftSelect} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.headline}>{headline}</Text>
        {!!caption && <Text style={styles.caption}>{caption}</Text>}
      </View>
      {rightChild}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBar: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: 8,
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
