import * as React from 'react';
import {StyleProp, Animated, View, ViewStyle} from 'react-native';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkIconButton} from '@components/shark-icon-button';

interface FileActionsBarToggleButtonProps {
  style?: StyleProp<ViewStyle>;
  showMore: boolean;
  animDuration?: number;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileActionsBarToggleButton = ({
  style,
  showMore,
  animDuration = 150,
  setShowMore,
}: FileActionsBarToggleButtonProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [rotatevalue] = React.useState(new Animated.Value(0));
  const [closeOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (showMore) {
      Animated.parallel([
        Animated.timing(rotatevalue, {
          toValue: 1,
          duration: animDuration,
          useNativeDriver: true,
        }),
        Animated.timing(closeOpacity, {
          toValue: 1,
          duration: animDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(rotatevalue, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: true,
        }),
        Animated.timing(closeOpacity, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showMore, rotatevalue, animDuration, closeOpacity]);

  const rotation = rotatevalue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[styles.iconContainer, style]}>
      <SharkIconButton
        iconName="dots-horizontal"
        style={styles.iconButton}
        onPress={() => setShowMore(v => !v)}
        iconStyle={{
          transform: [{rotate: rotation}],
        }}
      />
      <Animated.View
        style={[styles.closeIconContainer, {opacity: closeOpacity}]}>
        <SharkIconButton
          iconName="close"
          style={styles.iconButton}
          onPress={() => setShowMore(v => !v)}
          iconStyle={{
            transform: [{rotate: rotation}],
          }}
        />
      </Animated.View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  iconContainer: {
    position: 'relative',
  },
  iconButton: {
    backgroundColor: theme.colors.floating_surface,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
