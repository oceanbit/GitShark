import * as React from 'react';
import {View, Animated} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

const animTiming = 150;

interface DropdownContentProps {
  children: React.ReactNode;
  expanded: boolean;
}
export const DropdownContent = ({children, expanded}: DropdownContentProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  /**
   * To make sure the content does not appear to shrink visually
   * when hiding, we are finding the height of the bottom layer
   * and setting that directly using onLayout
   */
  const [height, setHeight] = React.useState(0);

  const [animatedHeight] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (expanded) {
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: animTiming,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: animTiming,
        useNativeDriver: false,
      }).start();
    }
  }, [expanded, animatedHeight, height]);

  return (
    <>
      <Animated.View style={{height: animatedHeight, overflow: 'hidden'}}>
        {children}
      </Animated.View>
      {/* Unrender the children once the height is calcuated */}
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
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  offscreenView: {
    position: 'absolute',
    right: '5000%',
  },
});
