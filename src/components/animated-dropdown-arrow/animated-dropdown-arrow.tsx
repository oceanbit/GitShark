import {Animated} from 'react-native';
import * as React from 'react';
import {SharkIconButton} from '../shark-icon-button';

interface AnimatedDropdownArrowProps {
  setExpanded: (val: boolean) => void;
  expanded: boolean;
  animDuration?: number;
}
export const AnimatedDropdownArrow = ({
  expanded,
  setExpanded,
  animDuration = 150,
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
    <SharkIconButton
      iconName={'chevron-down'}
      onPress={() => setExpanded(!expanded)}
      iconStyle={{transform: [{rotate: rotation}]}}
    />
  );
};
