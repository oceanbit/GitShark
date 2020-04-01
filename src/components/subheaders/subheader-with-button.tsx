import * as React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import {textStyles} from '../../constants/text-styles';
import {SharkButton} from '../shark-button/shark-button';

interface SharkTextInputProps {
  calloutText: string;
  buttonText: string;
  onButtonClick: () => void;
  style?: StyleProp<ViewStyle>;
}
export const SubheaderWithButton = ({
  calloutText,
  buttonText,
  onButtonClick,
  style = {},
}: SharkTextInputProps) => {
  return (
    <View style={[styles.subheaderContainer, style]}>
      <Text style={styles.subheaderText}>{calloutText}</Text>
      <SharkButton
        onPress={onButtonClick}
        text={buttonText}
        style={styles.calloutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subheaderContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
  },
  subheaderText: {
    ...textStyles.callout,
    flexGrow: 1,
  },
  calloutButton: {
    marginLeft: 16,
  },
});
