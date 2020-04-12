import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Portal} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';

export const NavigationAwarePortal: React.FC = ({children}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [open, setOpen] = React.useState(false);
  const opacity = React.useRef(new Animated.Value(0));

  const _show = React.useCallback(() => {
    setOpen(true);

    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const _hide = React.useCallback(() => {
    setOpen(false);

    Animated.timing(opacity.current, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    navigation.addListener('focus', _show);
    navigation.addListener('blur', _hide);

    if (isFocused) {
      _show();
    }

    return () => {
      navigation.removeListener('focus', _show);
      navigation.removeListener('blur', _hide);
    };
  }, [_hide, _show, isFocused, navigation]);

  return (
    <Portal>
      <Animated.View
        pointerEvents={open ? 'box-none' : 'none'}
        style={[styles.container, {opacity: opacity.current}]}>
        {children}
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
