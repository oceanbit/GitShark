import * as React from 'react';
import {View, Animated} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

const animTiming = 150;

interface DropdownContentProps {
  children: React.ReactNode;
  expanded: boolean;
}
export const DropdownContent = React.forwardRef(
  ({children, expanded}: DropdownContentProps, ref) => {
    const styles = useDynamicStyleSheet(dynamicStyles);

    /**
     * To make sure the content does not appear to shrink visually
     * when hiding, we are finding the height of the bottom layer
     * and setting that directly using onLayout
     */
    const [height, setHeight] = React.useState(0);

    React.useImperativeHandle(
      ref,
      () => ({
        height,
      }),
      [height],
    );

    const [animatedHeight] = React.useState(new Animated.Value(0));
    const [animatedOpacity] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
      if (expanded) {
        Animated.parallel([
          Animated.timing(animatedHeight, {
            toValue: height,
            duration: animTiming,
            useNativeDriver: false,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: animTiming,
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(animatedHeight, {
            toValue: 0,
            duration: animTiming,
            useNativeDriver: false,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: animTiming,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }, [expanded, animatedHeight, animatedOpacity, height]);

    return (
      <>
        <Animated.View
          style={{
            opacity: animatedOpacity,
            height: animatedHeight,
            overflow: 'hidden',
          }}>
          {children}
        </Animated.View>
        {/* Unrender the children once the height is calcuated */}
        {/* This is the children to grab the height from. It's rendered */}
        {/* Offscreen, then we unrender it. This is because the `animatedHeight` is */}
        {/* Set to `0` and the children are set to `0` as a result. This fixes that */}
        {!height && (
          <View
            style={styles.offscreenView}
            onLayout={event => {
              const {height: eventHeight} = event.nativeEvent.layout;
              setHeight(eventHeight);
            }}>
            {children}
          </View>
        )}
      </>
    );
  },
);

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  offscreenView: {
    position: 'absolute',
    right: '5000%',
  },
});
