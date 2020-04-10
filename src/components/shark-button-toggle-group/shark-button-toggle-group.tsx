/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaskedView from '@react-native-community/masked-view';
import {legacyTheme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';

interface SharkButtonToggleGroupProps {
  values: string[];
  onSelect: (val: string) => void;
  style?: StyleProp<ViewStyle>;
}
export const SharkButtonToggleGroup = ({
  values,
  onSelect,
  style,
}: SharkButtonToggleGroupProps) => {
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
        <View style={[styles.baseButtonContainer, styles.blueMask]}>
          {values.map((value, i) => (
            <TouchableRipple
              key={i}
              onPress={() => {
                setSelectedIndex(i);
                onSelect(values[i]);
              }}
              style={styles.baseTouchableRipple}>
              <Text style={[styles.baseButtonText, styles.whiteText]}>
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
            <Text style={[styles.baseButtonText, styles.secondaryText]}>
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
    borderRadius: legacyTheme.roundness,
    borderColor: legacyTheme.colors.border,
    borderWidth: 1,
    overflow: "hidden",
    padding: 4,
  },
  maskViewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  blueMaskContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: legacyTheme.lessRoundness,
    height: '100%',
    left: 0,
    top: 0,
  },
  blueMask: {
    backgroundColor: legacyTheme.colors.accent,
  },
  secondaryBG: {
    width: '100%',
    height: '100%',
    backgroundColor: legacyTheme.colors.on_surface_secondary_light,
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
    ...textStyles.callout,
  },
  whiteText: {
    color: 'white',
    zIndex: 1,
  },
  secondaryText: {
    color: legacyTheme.colors.on_surface_secondary_light,
  },
});
