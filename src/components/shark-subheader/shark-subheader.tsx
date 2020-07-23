import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {theme} from '@constants';
import {SharkButton, SharkButtonProps} from '../shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

interface SharkSubheaderProps {
  calloutText: string;
  buttonText?: string;
  onButtonClick?: () => void;
  style?: StyleProp<ViewStyle>;
  buttonType?: SharkButtonProps['type'];
  buttonDisabled?: boolean;
  leftChild?: React.ReactNode;
}

export const SharkSubheader = ({
  calloutText,
  buttonText,
  onButtonClick = () => {},
  style = {},
  buttonType,
  buttonDisabled = false,
  leftChild = null,
}: SharkSubheaderProps) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={[styles.subheaderContainer, style]}>
      {leftChild}
      <Text style={styles.subheaderText}>{calloutText}</Text>
      {!!buttonText && (
        <SharkButton
          onPress={onButtonClick}
          text={buttonText}
          style={styles.calloutButton}
          type={buttonType}
          disabled={buttonDisabled}
        />
      )}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  subheaderContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  subheaderText: {
    ...theme.textStyles.callout,
    flexGrow: 1,
    color: theme.colors.on_surface,
  },
  calloutButton: {
    marginLeft: theme.spacing.m,
  },
});
