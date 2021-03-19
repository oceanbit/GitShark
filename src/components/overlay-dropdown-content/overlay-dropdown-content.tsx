import * as React from 'react';
import {Animated, View} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';

const animTiming = 150;

interface OverlayDropdownContentProps {
  topLayer: React.ReactNode;
  bottomLayer: React.ReactNode;
  header: React.ReactNode;
  expanded: boolean;
}

export const OverlayDropdownContent = ({
  topLayer,
  bottomLayer,
  header,
  expanded,
}: OverlayDropdownContentProps) => {
  const styles = useDynamicValue(dynamicStyles);

  /**
   * To make sure the top layer does not appear to shrink visually
   * when hiding, we are finding the height of the bottom layer
   * and setting that directly using onLayout
   */
  const [height, setHeight] = React.useState(0);
  const [showScrim, setShowScrim] = React.useState(false);

  const [animatedHeight] = React.useState(new Animated.Value(0));
  // The scrim, when a lower opacity, has issues with other items on screen's zIndex
  // So we manually set "scrim" to "true" while animations are running and then "false"
  // When those animations finish
  const [scrimOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    setShowScrim(true);
    if (expanded) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: height,
          duration: animTiming,
          useNativeDriver: false,
        }),
        Animated.timing(scrimOpacity, {
          toValue: 0.3,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowScrim(false);
      });
    } else {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: false,
        }),
        Animated.timing(scrimOpacity, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowScrim(false);
      });
    }
  }, [expanded, animatedHeight, height, scrimOpacity]);

  return (
    <View style={styles.container}>
      <View>{header}</View>
      <View
        onLayout={event => {
          const {height: eventHeight} = event.nativeEvent.layout;
          setHeight(eventHeight);
        }}
        style={styles.contentContainer}>
        <Animated.View
          importantForAccessibility={!expanded ? 'no-hide-descendants' : 'yes'}
          accessibilityElementsHidden={!expanded}
          style={[styles.topLayerContainer, {height: animatedHeight}]}>
          <View style={{height}}>{topLayer}</View>
        </Animated.View>
        <Animated.View
          style={[
            styles.scrim,
            {opacity: scrimOpacity, zIndex: showScrim ? 1 : -1},
          ]}
        />
        <View
          importantForAccessibility={expanded ? 'no-hide-descendants' : 'yes'}
          accessibilityElementsHidden={expanded}>
          {bottomLayer}
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
  },
  contentContainer: {
    flexGrow: 1,
    // Be smol, then grow to height. This fixes issues with header overlap
    height: 1,
    position: 'relative',
  },
  topLayerContainer: {
    flexGrow: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.colors.surface,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
});
