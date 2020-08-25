import * as React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import {theme} from '@constants';
import {Icon} from '@components/shark-icon';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {ErrorMessageBox} from '../error-message-box';

interface SharkTextInputProps {
  placeholder: string;
  prefixIcon?: string;
  postfixIcon?: string;
  ellipsizeMode?: TextProps['ellipsizeMode'];
  numberOfLines?: TextProps['numberOfLines'];
  value: TextInputProps['value'];
  onChangeText: TextInputProps['onChangeText'];
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  errorStr?: string;
  keyboardType?: TextInputProps['keyboardType'];
}

export const SharkTextInput = ({
  placeholder,
  prefixIcon,
  postfixIcon,
  numberOfLines,
  value,
  onChangeText,
  style = {},
  disabled,
  errorStr,
  keyboardType,
}: SharkTextInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const styles = useDynamicValue(dynamicStyles);
  const surfaceSecondary = useDynamicValue(theme.colors.on_surface_secondary);
  const accent = useDynamicValue(theme.colors.primary);

  const paddingLeft = !!prefixIcon ? 0 : 12;
  const paddingRight = !!postfixIcon ? 0 : 12;
  const paddingVert = !!prefixIcon || !!postfixIcon ? 8 : 16;

  const padding = {
    paddingLeft,
    paddingRight,
    paddingTop: paddingVert,
    paddingBottom: paddingVert,
  };

  const multiline = (numberOfLines || 1) > 1;

  const textAreaStyles = !multiline
    ? {}
    : ({
        textAlignVertical: 'top',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

  const errStyle = !!errorStr ? styles.errorField : {};

  const focusedStyle = !!isFocused ? styles.focused : {};

  const disableStyle = !!disabled ? styles.disableStyle : {};

  return (
    <>
      <View
        style={[
          styles.textInputContainer,
          padding,
          focusedStyle,
          errStyle,
          style,
        ]}>
        {!!prefixIcon && (
          <Icon
            size={24}
            name={prefixIcon}
            color={surfaceSecondary}
            style={[styles.icon, disableStyle]}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[styles.textInput, textAreaStyles, disableStyle]}
          placeholderTextColor={surfaceSecondary}
          numberOfLines={numberOfLines}
          multiline={multiline}
          editable={!disabled}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!!postfixIcon && (
          <Icon
            size={24}
            name={postfixIcon}
            color={accent}
            style={[styles.icon, disableStyle]}
          />
        )}
      </View>
      {!!errorStr && (
        <ErrorMessageBox message={errorStr} style={styles.errorBox} />
      )}
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  textInputContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderColor: theme.colors.tint_on_surface_16,
    borderWidth: theme.borders.normal,
    borderRadius: theme.borderRadius.regular,
    alignContent: 'center',
    overflow: 'hidden',
    margin: 1,
  },
  errorField: {
    borderColor: theme.colors.error,
  },
  errorBox: {
    marginTop: theme.spacing.xs,
  },
  icon: {
    marginHorizontal: theme.spacing.xxs,
    padding: theme.spacing.xs,
  },
  textInput: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    backgroundColor: 'transparent',
    padding: 0,
    ...theme.textStyles.body_01,
    color: theme.colors.on_surface,
  },
  disableStyle: {
    opacity: theme.opacity.disabled,
  },
  focused: {
    borderColor: theme.colors.primary,
    borderWidth: theme.borders.thick,
    margin: 0,
  },
});
