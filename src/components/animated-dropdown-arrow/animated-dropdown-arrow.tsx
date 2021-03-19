import {Animated, StyleProp, ViewStyle} from 'react-native';
import * as React from 'react';
import {SharkIconButton} from '../shark-icon-button';
import {SharkIcon} from '@components/shark-icon';

interface AnimatedDropdownArrowProps {
  expanded: boolean;
  animDuration?: number;
  style?: StyleProp<ViewStyle>;
}

export const AnimatedDropdownArrow = ({
  expanded,
  animDuration = 150,
  style,
}: AnimatedDropdownArrowProps) => {
  const [rotatevalue] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    if (expanded) {
      Animated.timing(rotatevalue, {
        toValue: 1,
        duration: animDuration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(rotatevalue, {
        toValue: 0,
        duration: animDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [expanded, rotatevalue, animDuration]);

  const rotation = rotatevalue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <SharkIcon
      iconName={'arrow_down'}
      style={[style, {transform: [{rotate: rotation}]}]}
    />
  );
};
