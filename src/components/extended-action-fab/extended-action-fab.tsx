import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import * as React from 'react';

type ActionFabReactNode = (toggleAnimation: () => void) => React.ReactNode;

interface ExtendedActionFabProps {
  fab: ActionFabReactNode;
  fabActions: ActionFabReactNode;
}

export const ExtendedActionFab = ({
  fab,
  fabActions,
}: ExtendedActionFabProps) => {
  const [extended, setExtended] = React.useState(true);
  const [fabSize, setFabSize] = React.useState({height: 0, width: 0});
  const [fabActionSize, setFabActionSize] = React.useState({
    height: 0,
    width: 0,
  });
  const animationValue = React.useRef(new Animated.Value(190));
  const actionSizeOpacity = React.useRef(new Animated.Value(0));
  const fabOpacity = React.useRef(new Animated.Value(1));

  React.useEffect(() => {
    const height =
      fabSize.height > fabActionSize.height
        ? fabSize.height
        : fabActionSize.height;

    animationValue.current = new Animated.Value(height);
  }, [fabSize.height, fabActionSize.height]);

  const width =
    fabSize.width > fabActionSize.width ? fabSize.width : fabActionSize.width;

  const toggleAnimation = React.useCallback(() => {
    if (extended) {
      Animated.parallel([
        Animated.timing(animationValue.current, {
          toValue: fabActionSize.height,
          duration: 150,
        }),
        Animated.timing(actionSizeOpacity.current, {
          toValue: 1,
          duration: 150,
        }),
        Animated.timing(fabOpacity.current, {
          toValue: 0,
          duration: 300,
        }),
      ]).start(() => {
        setExtended(false);
      });
    } else {
      Animated.parallel([
        Animated.timing(animationValue.current, {
          toValue: fabSize.height,
          duration: 150,
        }),
        Animated.timing(actionSizeOpacity.current, {
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(fabOpacity.current, {
          toValue: 1,
          duration: 150,
        }),
      ]).start(() => {
        setExtended(true);
      });
    }
  }, [fabActionSize.height, fabSize.height, extended]);

  const animatedHeight = {
    width: width,
    height: animationValue.current,
  };

  const animatedFab = {
    opacity: fabOpacity.current,
  };

  const animatedFabActions = {
    opacity: actionSizeOpacity.current,
    width
  };

  const fabDisplay = React.useMemo(() => fab(toggleAnimation), [
    fab,
    toggleAnimation,
  ]);
  const fabActionDisplay = React.useMemo(() => fabActions(toggleAnimation), [
    fabActions,
    toggleAnimation,
  ]);

  return (
    <View style={styles.MainContainer}>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.parentHeightBox, animatedHeight]}>
          <Animated.View style={[styles.fabContents, animatedFab]}>
            <View
              onLayout={event => {
                const {height, width} = event.nativeEvent.layout;
                setFabSize({height, width});
              }}>
              {fabDisplay}
            </View>
          </Animated.View>
          <Animated.View style={[styles.fabContents, animatedFabActions]}>
            <View
              onLayout={event => {
                const {height, width} = event.nativeEvent.layout;
                setFabActionSize({height, width});
              }}>
              {fabActionDisplay}
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  parentHeightBox: {
    position: 'relative',
  },
  fabContents: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
