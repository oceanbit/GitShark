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
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
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
}

export const Scrim: React.FC<ScrimProps> = ({
  visible,
  overlayAccessibilityLabel = 'Close bottom sheet',
  dismissable = true,
  onDismiss,
  children,
}) => {
  const {colors, animation} = useTheme();

  const [opacity] = React.useState(new Animated.Value(0));

  const [rendered, setRendered] = React.useState(visible);

  React.useLayoutEffect(() => {
    if (visible && !rendered) {
      setRendered(true);
    }
  }, [visible, rendered]);

  // Must be done like this in order to handle cyclical function reference
  // Must be () => () => due to functional API
  const [handleBack, setHandleBack] = React.useState<() => boolean>(() => () =>
    false,
  );

  const showModal = React.useCallback(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);

    const {scale} = animation;

    Animated.timing(opacity, {
      toValue: 1,
      duration: scale * DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
  }, [animation, handleBack, opacity]);

  // Cyclical dep requires me to lazily initialize/call this otherwise we get stuck
  // in infinate loop
  const hideModalRef = React.useRef(() => () => {});

  const hideModal = React.useCallback(() => {
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

      if (visible) {
        showModal();
      } else {
        setRendered(false);
      }
    });

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
  }, [animation, visible, handleBack, onDismiss, opacity, showModal]);

  hideModalRef.current = hideModal;

  // Handle before initial render to avoid re-rendering issues
  React.useLayoutEffect(() => {
    // Must be () => () => due to functional API
    setHandleBack(() => () => {
      if (dismissable) {
        hideModalRef.current();
      }
      return true;
    });
  }, [dismissable, hideModalRef]);

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
  }, [prevVisible, visible, showModal, hideModal]);

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
      <View style={[styles.wrapper]} pointerEvents="box-none">
        {children}
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
