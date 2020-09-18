import * as React from 'react';
import {View, TouchableWithoutFeedback, Animated} from 'react-native';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

interface SeaSwitchProps {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
}

const animTiming = 150;

export const SeaSwitch = ({enabled, setEnabled}: SeaSwitchProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const primary = useDynamicValue(theme.colors.primary);
  const tint_on_surface_16 = useDynamicValue(theme.colors.tint_on_surface_16);

  const [switchLeft] = React.useState(new Animated.Value(0));

  const [switchPrimaryBG] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (enabled) {
      Animated.parallel([
        Animated.timing(switchLeft, {
          toValue: theme.spacing.m + theme.spacing.xxs, // Width of switch
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(switchPrimaryBG, {
          toValue: 1, // Width of switch
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(switchLeft, {
          toValue: 0 + theme.spacing.xxs,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(switchPrimaryBG, {
          toValue: 0, // Width of switch
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [switchLeft, enabled, switchPrimaryBG]);

  const switchTrackBGColor = switchPrimaryBG.interpolate({
    inputRange: [0, 1],
    outputRange: [tint_on_surface_16, primary],
  });

  const thumbLeft = {
    left: switchLeft,
  };

  const switchTrackBG = {
    backgroundColor: switchTrackBGColor,
  };

  return (
    <TouchableWithoutFeedback onPress={() => setEnabled(!enabled)}>
      <View style={styles.switchBox}>
        <Animated.View style={[styles.switchTrack, switchTrackBG]}>
          <Animated.View style={[styles.switchThumb, thumbLeft]} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  switchBox: {
    paddingHorizontal: theme.spacing.xxs,
    paddingVertical: theme.spacing.s,
    cursor: 'pointer',
  },
  switchTrack: {
    padding: theme.spacing.xxs,
    width: theme.spacing.m * 2,
    height: theme.spacing.m,
    position: 'relative',
    backgroundColor: theme.colors.tint_on_surface_16,
    boxSizing: 'content-box',
    borderRadius: theme.spacing.m,
  },
  switchThumb: {
    position: 'absolute',
    width: theme.spacing.m,
    height: theme.spacing.m,
    left: theme.spacing.xxs,
    top: theme.spacing.xxs,
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.m,
  },
});
