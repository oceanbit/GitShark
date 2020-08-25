import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';

interface SharkSafeTopProps {
  isFloating?: boolean;
}

export const SharkSafeTop: React.FC<SharkSafeTopProps> = ({
  children,
  isFloating,
}) => {
  const floating = useDynamicValue(theme.colors.floating_surface);
  const insets = useSafeAreaInsets();

  const floatingStyle = isFloating ? {backgroundColor: floating} : {};

  return (
    <View style={[{paddingTop: insets.top, flexGrow: 1}, floatingStyle]}>
      {children}
    </View>
  );
};

interface SpacerViewProps {
  additionalSpacing?: number;
  isFloating?: boolean;
}

export const TopSpacerView = ({
  additionalSpacing = 0,
  isFloating,
}: SpacerViewProps) => {
  const floating = useDynamicValue(theme.colors.floating_surface);
  const insets = useSafeAreaInsets();

  const floatingStyle = isFloating ? {backgroundColor: floating} : {};

  return (
    <View style={[{height: insets.top + additionalSpacing}, floatingStyle]} />
  );
};

export const BottomSpacerView = ({additionalSpacing = 0}) => {
  const insets = useSafeAreaInsets();

  return <View style={{height: insets.bottom + additionalSpacing}} />;
};
