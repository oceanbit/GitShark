/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Animated,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaskedView from '@react-native-community/masked-view';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

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
  const styles = useDynamicStyleSheet(dynamicStyles);

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

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: 48,
    position: 'relative',
    borderRadius: theme.roundness,
    borderColor: theme.colors.divider,
    borderWidth: 1,
    overflow: 'hidden',
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
    borderRadius: theme.lessRoundness,
    height: '100%',
    left: 0,
    top: 0,
  },
  blueMask: {
    backgroundColor: theme.colors.primary,
  },
  secondaryBG: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.on_surface_secondary,
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
    color: theme.colors.on_primary,
    zIndex: 1,
  },
  secondaryText: {
    color: theme.colors.on_surface_secondary,
  },
});
