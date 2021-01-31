import * as React from 'react';
// TODO: This WAS importing from `react-native-gesture-handler`. Still may be needed, double check
import {TouchableWithoutFeedback, View} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';

const AnimatedView = Animated.View;

interface SharkBottomSheetProps {
  maxSheetHeight: number | string;
  minSheetHeight: number | string;
  renderContent: (fall: Animated.Value<number>) => React.ReactNode;
  renderHeader?: (fall: Animated.Value<number>) => React.ReactNode;
  startExpanded: boolean;
}

export const SharkBottomSheet = ({
  maxSheetHeight,
  minSheetHeight,
  renderContent,
  renderHeader = () => null,
  startExpanded = true,
}: SharkBottomSheetProps) => {
  const initialSnap = startExpanded ? 0 : 1;

  const styles = useDynamicValue(dynamicStyles);

  const bottomSheetRef = React.createRef<BottomSheet>();

  const fall = new Animated.Value(initialSnap);

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

  const renderHeaderCB = () => {
    return (
      <View>
        <TouchableWithoutFeedback
          key={'header-container'}
          onPress={onHeaderPress}>
          <View style={styles.trueHeader}>{renderHandler()}</View>
        </TouchableWithoutFeedback>
        {renderHeader(fall)}
      </View>
    );
  };

  const renderContentCB = React.useCallback(() => renderContent(fall), [
    renderContent,
    fall,
  ]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      initialSnap={initialSnap}
      snapPoints={[maxSheetHeight, minSheetHeight]}
      callbackNode={fall}
      renderHeader={renderHeaderCB}
      renderContent={renderContentCB}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  handlerContainer: {
    alignSelf: 'center',
    top: 10,
    height: 24,
    width: 30,
  },
  trueHeader: {
    backgroundColor: theme.colors.floating_surface,
    borderTopColor: theme.colors.tint_on_surface_01,
    borderTopWidth: theme.borders.thick,
  },
  handlerBar: {
    position: 'absolute',
    backgroundColor: theme.colors.label_medium_emphasis_no_opacity,
    top: 5,
    borderRadius: 3,
    height: 4,
    width: 24,
  },
});
