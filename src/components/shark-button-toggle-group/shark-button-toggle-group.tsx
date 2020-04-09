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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const fabPanelHeight = React.useRef(new Animated.Value(190));

  //  React.useEffect(() => {
  //     Animated.timing(
  //       fadeAnim,
  //       {
  //         toValue: 1,
  //         duration: 10000,
  //       }
  //     ).start();
  //   }, [])

  const widthSize = Math.floor(100 / values.length);
  const left = widthSize * selectedIndex;

  return (
    <View style={styles.container}>
      <MaskedView
        key={selectedIndex}
        style={styles.maskViewContainer}
        maskElement={
          <View
            style={[
              styles.blueMaskContainer,
              {
                width: `${widthSize}%`,
                left: `${left}%`,
              },
            ]}
          />
        }>
        <View style={[styles.baseButtonContainer, styles.blueMask]}>
          {values.map((value, i) => (
            <TouchableRipple
              key={i}
              onPress={() => {
                console.log('PRESSED ' + i + ' BLUE');
                setSelectedIndex(i);
              }}
              style={{
                zIndex: 1,
              }}>
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
            style={styles.baseTouchableRipple}
            onPress={() => {
              console.log('PRESSED ' + i + ' WHITE');
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
    zIndex: -1,
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
