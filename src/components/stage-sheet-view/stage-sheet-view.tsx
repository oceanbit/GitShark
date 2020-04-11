import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {colors} from '../../constants/theme';

const AnimatedView = Animated.View;

// 24 for the shadow height
const minHeight = 184 + 24;

export const StageSheetView = () => {
  let bottomSheetRef = React.createRef<BottomSheet>();

  let fall = new Animated.Value(1);

  const onHeaderPress = () => {
    bottomSheetRef.current!.snapTo(1);
  };

  const renderHandler = () => {
    const animatedBar1Rotation = (outputRange: number[]) =>
      Animated.interpolate(fall, {
        inputRange: [0, 1],
        outputRange: outputRange,
        extrapolate: Animated.Extrapolate.CLAMP,
      });

    return (
      <View style={styles.handlerContainer}>
        <AnimatedView
          style={[
            styles.handlerBar,
            {
              left: -7.5,
              transform: [
                {
                  rotate: Animated.concat(
                    // @ts-ignore
                    animatedBar1Rotation([0.3, 0]),
                    'rad',
                  ),
                },
              ],
            },
          ]}
        />
        <AnimatedView
          style={[
            styles.handlerBar,
            {
              right: -7.5,
              transform: [
                {
                  rotate: Animated.concat(
                    // @ts-ignore
                    animatedBar1Rotation([-0.3, 0]),
                    'rad',
                  ),
                },
              ],
            },
          ]}
        />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <TouchableWithoutFeedback
        key={'header-container'}
        onPress={onHeaderPress}>
        <View style={styles.shadowContainer}>
          <View style={styles.shadowTop} />
        </View>
        {renderHandler()}
      </TouchableWithoutFeedback>
    );
  };

  const renderContent = () => {
    return (
      <View>
        <Text>Hello there, world</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnap={1}
        snapPoints={[300, minHeight]}
        callbackNode={fall}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shadowContainer: {
    height: 38,
    overflow: 'hidden',
    borderBottomColor: colors.divider_light,
    borderBottomWidth: 1,
  },
  shadowTop: {
    elevation: 24,
    height: 30,
    top: 30,
    width: '120%',
    position: 'relative',
    left: '-10%',
  },
  handlerContainer: {
    alignSelf: 'center',
    top: 10,
    height: 24,
    width: 30,
  },
  handlerBar: {
    position: 'absolute',
    backgroundColor: '#D1D1D6',
    top: 5,
    borderRadius: 3,
    height: 4,
    width: 24,
  },
  headerContentContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 20 + 20,
  },
});
