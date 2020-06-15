import * as React from 'react';
import {Menu} from 'react-native-paper';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {theme} from '@constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const SharkMenu = ({
  children,
  contentStyle = {},
  ...props
}: React.ComponentProps<typeof Menu>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const insets = useSafeAreaInsets();

  return (
    <Menu
      {...props}
      contentStyle={[styles.menu, contentStyle, {marginTop: insets.top}]}>
      {children}
    </Menu>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  menu: {
    backgroundColor: theme.colors.floating_surface,
  },
});
