/**
 * Code adapted from `react-native-paper`'s dialog
 * @see https://github.com/callstack/react-native-paper/blob/e5c0c777f90b5b3ad06a58d03b3de60ffb200cbd/src/components/Modal.tsx#L103
 */
import * as React from 'react';
import {useTheme} from 'react-native-paper';
import {
  Animated,
  BackHandler,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

const DEFAULT_DURATION = 220;

interface ScrimProps {
  visible: boolean;
  /**
   * Accessibility label for the overlay. This is read by the screen reader when the user taps outside the modal.
   */
  overlayAccessibilityLabel?: string;
  dismissable?: boolean;
  /**
   * Callback that is called when the user dismisses the modal.
   */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  children: (opacity: Animated.Value) => React.ReactNode;
}

export const Scrim = ({
  visible,
  overlayAccessibilityLabel = 'Close bottom sheet',
  dismissable = true,
  onDismiss,
  children,
  style,
}: ScrimProps) => {
  const visibleRef = React.useRef(visible);

  visibleRef.current = visible;

  const {colors, animation} = useTheme();

  const [opacity] = React.useState(new Animated.Value(0));

  const [rendered, setRendered] = React.useState(visible);

  if (visible && !rendered) {
    setRendered(true);
  }

  /**
   * Must use `function` instead of `const` to make cyclical handleBack/hideModal reference work.
   * Utilizes function name hoisting
   */
  function handleBack() {
    if (dismissable) {
      hideModal();
    }
    return true;
  }

  /**
   * If we don't use a "ref" to keep track of the exact version of the handleBack function we're removing from the event
   * listener, what will happen is that `handleBack`'s reference in memory will change between `showModal` and `hideModal`
   * being called, leaving the event in-tact and not removing properly
   */
  const handleBackToRemove = React.useRef<() => boolean>(() => true);

  function showModal() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      handleBackToRemove.current,
    );
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    handleBackToRemove.current = handleBack;

    const {scale} = animation;

    Animated.timing(opacity, {
      toValue: 1,
      duration: scale * DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }

  function hideModal() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      handleBackToRemove.current,
    );
    handleBackToRemove.current = () => true;

    const {scale} = animation;

    Animated.timing(opacity, {
      toValue: 0,
      duration: scale * DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({finished}) => {
      if (!finished) {
        return;
      }

      if (visible && onDismiss) {
        onDismiss();
      }

      if (visibleRef.current) {
        showModal();
      } else {
        setRendered(false);
      }
    });
  }

  const prevVisible = React.useRef<boolean | null>(null);

  React.useEffect(() => {
    if (prevVisible.current !== visible) {
      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }
    prevVisible.current = visible;
  });

  if (!rendered) return null;

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityViewIsModal
      accessibilityLiveRegion="polite"
      style={StyleSheet.absoluteFill}
      onAccessibilityEscape={hideModal}>
      <TouchableWithoutFeedback
        accessibilityLabel={overlayAccessibilityLabel}
        accessibilityRole="button"
        disabled={!dismissable}
        onPress={dismissable ? hideModal : undefined}>
        <Animated.View
          style={[styles.backdrop, {backgroundColor: colors.backdrop, opacity}]}
        />
      </TouchableWithoutFeedback>
      <View style={[styles.wrapper, style]} pointerEvents="box-none">
        {children(opacity)}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
  },
});
