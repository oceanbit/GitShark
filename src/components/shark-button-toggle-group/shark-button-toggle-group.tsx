/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaskedView from '@react-native-community/masked-view';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';

const values = ['Auto', 'Light', 'Dark'];

export const SharkButtonToggleGroup = () => {
  const [prevSelectedIndex, setPrevSelectedIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectedPanelLeft = React.useRef(new Animated.Value(0));

  const widthSize = Math.floor(100 / values.length);

  const interpolatedValuesInput = values.map((_, i) => {
    return widthSize * i;
  });

  const interpolatedValuesOutput = values.map((_, i) => {
    return `${widthSize * i}%`;
  });

  console.log(interpolatedValuesOutput);

  React.useEffect(() => {
    const left = widthSize * selectedIndex;

    Animated.timing(selectedPanelLeft.current, {
      toValue: left,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setPrevSelectedIndex(selectedIndex);
    });
  }, [widthSize, selectedPanelLeft, selectedIndex]);

  const maxIndex = selectedIndex > prevSelectedIndex ? selectedIndex : prevSelectedIndex;
  const minIndex = selectedIndex > prevSelectedIndex ? prevSelectedIndex : selectedIndex;

  return (
    <View style={styles.container}>
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
    height: 300,
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
    borderRadius: 8,
    height: '100%',
    left: 0,
    top: 0,
  },
  blueMask: {
    backgroundColor: theme.colors.accent,
  },
  secondaryBG: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.on_surface_secondary_light,
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
    top: 0,
    left: 0,
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
    color: theme.colors.on_surface_secondary_light,
  },
});
