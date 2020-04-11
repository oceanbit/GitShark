/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Animated,
  View,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaskedView from '@react-native-community/masked-view';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface ButtonToggleGroupProps {
  values: string[];
  onSelect: (val: string) => void;
  style?: StyleProp<ViewStyle>;
  highlightBackgroundColor: string;
  highlightTextColor: string;
  inactiveBackgroundColor: string;
  inactiveTextColor: string;
}
export const ButtonToggleGroup = ({
  values,
  onSelect,
  style,
  highlightBackgroundColor,
  highlightTextColor,
  inactiveBackgroundColor,
  inactiveTextColor,
}: ButtonToggleGroupProps) => {
  const [prevSelectedIndex, setPrevSelectedIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectedPanelLeft = React.useRef(new Animated.Value(0));

  const widthSize = 100 / values.length;

  const interpolatedValuesInput = values.map((_, i) => {
    return widthSize * i;
  });

  const interpolatedValuesOutput = values.map((_, i) => {
    return `${widthSize * i}%`;
  });

  React.useEffect(() => {
    const left = widthSize * selectedIndex;

    Animated.timing(selectedPanelLeft.current, {
      toValue: left,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setPrevSelectedIndex(selectedIndex);
    });
  }, [widthSize, selectedPanelLeft, selectedIndex]);

  const maxIndex =
    selectedIndex > prevSelectedIndex ? selectedIndex : prevSelectedIndex;
  const minIndex =
    selectedIndex > prevSelectedIndex ? prevSelectedIndex : selectedIndex;

  const highlightMask = {
    backgroundColor: highlightBackgroundColor,
  };

  const highlightText = {
    color: highlightTextColor,
  };

  const inactiveText = {
    color: inactiveTextColor,
  };

  return (
    <View style={[styles.container, style]}>
      <MaskedView
        key={selectedIndex}
        style={styles.maskViewContainer}
        maskElement={
          <Animated.View
            style={[
              styles.blueMaskContainer,
              {
                width: `${widthSize}%`,
                left: selectedPanelLeft.current.interpolate({
                  inputRange: interpolatedValuesInput,
                  outputRange: interpolatedValuesOutput,
                }),
              },
            ]}
          />
        }>
        <View style={[styles.baseButtonContainer, highlightMask]}>
          {values.map((value, i) => (
            <TouchableRipple
              key={i}
              onPress={() => {
                setSelectedIndex(i);
                onSelect(values[i]);
              }}
              style={styles.baseTouchableRipple}>
              <Text
                style={[
                  styles.baseButtonText,
                  styles.highlightText,
                  highlightText,
                ]}
                numberOfLines={1}>
                {value}
              </Text>
            </TouchableRipple>
          ))}
        </View>
      </MaskedView>
      <View style={[styles.baseButtonContainer, styles.whiteButtonContainer]}>
        {values.map((value, i) => (
          <TouchableRipple
            key={i}
            style={[
              styles.baseTouchableRipple,
              {
                zIndex: minIndex <= i && maxIndex >= i ? -1 : 0,
              },
            ]}
            onPress={() => {
              setSelectedIndex(i);
              onSelect(values[i]);
            }}>
            <Text
              style={[styles.baseButtonText, inactiveText]}
              numberOfLines={1}>
              {value}
            </Text>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    position: 'relative',
  },
  maskViewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  blueMaskContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: theme.lessRoundness,
    height: '100%',
    left: 0,
    top: 0,
  },
  baseButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  whiteButtonContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: '100%',
    height: '100%',
  },
  baseTouchableRipple: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseButtonText: {
    paddingHorizontal: 16,
    ...textStyles.callout,
  },
  highlightText: {
    zIndex: 1,
  },
});
