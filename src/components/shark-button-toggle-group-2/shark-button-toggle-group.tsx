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

export const SharkButtonToggleGroup = () => {
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

  return (
    <View style={styles.container}>
      <Text>Testing</Text>
      <MaskedView
        style={{flex: 1, flexDirection: 'row', height: '100%'}}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Basic Mask
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Basic Mask
            </Text>
          </View>
        }>
        <View style={{position: 'relative', flex: 1, height: 300}}>
          <View style={[styles.primary]} />
          <View style={styles.secondaryBG} />
        </View>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  secondaryBG: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.on_surface_secondary_light,
  },
  primary: {
    backgroundColor: theme.colors.accent,
    width: '33%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 20,
  },
});
