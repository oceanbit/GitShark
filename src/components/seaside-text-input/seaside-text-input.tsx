import * as React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewStyle,
  Text,
  Animated,
} from 'react-native';
import {theme, rubikRegular} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkIconButton} from '../shark-icon-button';

interface SeaTextInputProps {
  ellipsizeMode?: TextProps['ellipsizeMode'];
  value: TextInputProps['value'];
  onChangeText: TextInputProps['onChangeText'];
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  errorStr?: string;
  keyboardType?: TextInputProps['keyboardType'];
  postfixIcon?: string;
}

const animTiming = 150;

export const SeaTextInput = ({
  value,
  onChangeText,
  style = {},
  disabled,
  errorStr,
  keyboardType,
  postfixIcon,
}: SeaTextInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const styles = useDynamicValue(dynamicStyles);

  const primary = useDynamicValue(theme.colors.primary);
  const on_surface = useDynamicValue(theme.colors.on_surface);

  const [blueBgOpacity] = React.useState(new Animated.Value(0));
  const [grayBorderOpacity] = React.useState(new Animated.Value(1));
  const [blueBgHeight] = React.useState(new Animated.Value(0));
  const [textInputHeight, setInputHeight] = React.useState(0);
  const [labelInputContHeight, setLabelInputContHeight] = React.useState(0);
  const [labelLeft] = React.useState(new Animated.Value(theme.spacing.xxs));
  const [labelBottom] = React.useState(new Animated.Value(theme.spacing.xxs));

  React.useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.timing(blueBgOpacity, {
          toValue: 1,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(grayBorderOpacity, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(blueBgHeight, {
          toValue: labelInputContHeight,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelLeft, {
          toValue: theme.spacing.xs,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelBottom, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(blueBgOpacity, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(grayBorderOpacity, {
          toValue: theme.opacity.disabled,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(blueBgHeight, {
          toValue: textInputHeight,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelLeft, {
          toValue: theme.spacing.xxs,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelBottom, {
          toValue: theme.spacing.xxs,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    isFocused,
    grayBorderOpacity,
    blueBgOpacity,
    blueBgHeight,
    textInputHeight,
    labelInputContHeight,
    labelLeft,
    labelBottom,
  ]);

  const blueBackgroundStyle = {
    opacity: blueBgOpacity,
    height: blueBgHeight,
  };

  const greyBorderStyle = {
    opacity: grayBorderOpacity,
    height: blueBgHeight,
  };

  const blueBorderStyle = {
    opacity: blueBgOpacity,
  };

  const labelTextColor = blueBgOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [on_surface, primary],
  });

  const labelTextStyles = {
    color: labelTextColor,
  };

  const labelContainer = {
    paddingHorizontal: labelLeft,
    paddingTop: labelLeft,
    paddingBottom: labelBottom,
  };

  const inputStylingWithIcon = !!postfixIcon
    ? {paddingRight: theme.spacing.xxs}
    : {};

  return (
    <>
      <View
        style={styles.inputLabelContainer}
        onLayout={event => {
          const {height: eventHeight} = event.nativeEvent.layout;
          setLabelInputContHeight(eventHeight);
        }}>
        <Animated.View style={labelContainer}>
          <Animated.Text style={[styles.label, labelTextStyles]}>
            Label
          </Animated.Text>
        </Animated.View>
        <View
          style={styles.textInpContainer}
          onLayout={event => {
            const {height: eventHeight} = event.nativeEvent.layout;
            setInputHeight(eventHeight);
          }}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={''}
            style={[styles.textInput, inputStylingWithIcon]}
            numberOfLines={1}
            multiline={false}
            editable={!disabled}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {!!postfixIcon && (
            <SharkIconButton onPress={() => {}} iconName={postfixIcon} />
          )}
          {/* TODO: ICON HERE */}
        </View>
        <Animated.View
          pointerEvents="none"
          style={[styles.blueBackground, blueBackgroundStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.greyBorderContainer, greyBorderStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.blueBorder, blueBorderStyle]}
        />
      </View>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  inputLabelContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  label: {
    // Overline 2
    textTransform: 'uppercase',
    ...rubikRegular,
    fontSize: 10,
    lineHeight: 16,
  },
  textInpContainer: {
    padding: theme.spacing.xxs,
    display: 'flex',
    flexDirection: 'row',
  },
  textInput: {
    flexGrow: 1,
    padding: theme.spacing.xs,
    ...theme.textStyles.body_01,
    color: theme.colors.on_surface,
  },
  blueBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0,
    backgroundColor: theme.colors.tint_primary_10,
    borderRadius: theme.borderRadius.regular,
  },
  greyBorderContainer: {
    position: 'absolute',
    borderColor: theme.colors.on_surface,
    borderWidth: theme.borders.normal,
    width: '100%',
    bottom: 0,
    left: 0,
    borderRadius: theme.borderRadius.regular,
  },
  blueBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    // Arbitary height in order to enforce border-radius
    height: 100,
    borderBottomWidth: theme.borders.thick,
    borderBottomColor: theme.colors.primary,
    borderRadius: theme.borderRadius.regular,
  },
});
