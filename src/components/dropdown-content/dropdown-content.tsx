import * as React from 'react';
import {View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {theme} from '../../constants';

interface DropdownContentProps {
  topLayer: React.ReactNode;
  bottomLayer: React.ReactNode;
  header: React.ReactNode;
  expanded: boolean;
}
export const DropdownContent = ({
  topLayer,
  bottomLayer,
  header,
  expanded,
}: DropdownContentProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  /**
   * To make sure the top layer does not appear to shrink visually
   * when hiding, we are finding the height of the bottom layer
   * and setting that directly using onLayout
   */
  const [height, setHeight] = React.useState(0);
  return (
    <View style={styles.container}>
      <View>{header}</View>
      <View
        onLayout={event => {
          const {height: eventHeight} = event.nativeEvent.layout;
          setHeight(eventHeight);
        }}
        style={styles.contentContainer}>
        <View
          style={[styles.topLayerContainer, {height: expanded ? height : 0}]}>
          <View style={{height}}>{topLayer}</View>
        </View>
        {bottomLayer}
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
  bottomLayerContainer: {
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
    zIndex: 1,
    backgroundColor: theme.colors.surface,
  },
});
