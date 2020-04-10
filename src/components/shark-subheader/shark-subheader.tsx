import * as React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import {textStyles} from '../../constants/text-styles';
import {SharkButton} from '../shark-button/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {theme} from '../../constants/theme';

interface SharkSubheaderProps {
  calloutText: string;
  buttonText?: string;
  onButtonClick?: () => void;
  style?: StyleProp<ViewStyle>;
}
export const SharkSubheader = ({
  calloutText,
  buttonText,
  onButtonClick = () => {},
  style = {},
}: SharkSubheaderProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={[styles.subheaderContainer, style]}>
      <Text style={styles.subheaderText}>{calloutText}</Text>
      {!!buttonText && (
        <SharkButton
          onPress={onButtonClick}
          text={buttonText}
          style={styles.calloutButton}
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
    padding: 16,
    alignItems: 'center',
  },
  subheaderText: {
    ...textStyles.callout,
    flexGrow: 1,
    color: theme.colors.on_surface,
  },
  calloutButton: {
    marginLeft: 16,
  },
});
