import * as React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {View} from 'react-native';

export const SharkSafeTop: React.FC = ({children}) => {
  const insets = useSafeArea();

  return <View style={{paddingTop: insets.top, flexGrow: 1}}>{children}</View>;
};

interface SpacerViewProps {
  additionalSpacing?: number;
}

export const TopSpacerView = ({additionalSpacing = 0}) => {
  const insets = useSafeArea();

  return <View style={{height: insets.top + additionalSpacing}} />;
};

export const BottomSpacerView = ({additionalSpacing = 0}) => {
  const insets = useSafeArea();

  return <View style={{height: insets.bottom + additionalSpacing}} />;
};
