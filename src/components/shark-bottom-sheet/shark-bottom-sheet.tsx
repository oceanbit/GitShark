import * as React from 'react';
import {View} from 'react-native';
// import Animated from 'react-native-reanimated';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import BottomSheet, {
  BottomSheetHandleProps,
  BottomSheetView,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

interface SharkBottomSheetProps {
  maxSheetHeight: number | string;
  minSheetHeight: number | string;
  contents: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.FC<BottomSheetFooterProps>;
  startExpanded?: boolean;
  sheetRef?: any;
  parentHeight?: number;
}

export interface SharkSheetRef {
  snapTo: (v: number) => void;
}

const SharkBottomSheetHandle: React.FC<BottomSheetHandleProps> = ({
  animatedIndex,
}) => {
  const styles = useDynamicValue(dynamicStyles);

  const leftBarStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 0.3],
      Animated.Extrapolate.CLAMP,
    );
    return {
      left: -7.5,
      transform: [
        {
          rotate: `${rotate}rad`,
        },
      ],
    };
  });

  const rightBarStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, -0.3],
      Animated.Extrapolate.CLAMP,
    );
    return {
      right: -7.5,
      transform: [
        {
          rotate: `${rotate}rad`,
        },
      ],
    };
  });

  return (
    <View style={styles.handlerContainer}>
      <Animated.View style={[styles.handlerBar, leftBarStyle]} />
      <Animated.View style={[styles.handlerBar, rightBarStyle]} />
    </View>
  );
};

export const SharkBottomSheet = ({
  maxSheetHeight,
  minSheetHeight,
  contents,
  footer,
  header = null,
  startExpanded = true,
  sheetRef,
  parentHeight,
}: SharkBottomSheetProps) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const styles = useDynamicValue(dynamicStyles);

  React.useImperativeHandle(sheetRef, () => ({
    snapTo: (idx: number) => bottomSheetRef.current!.snapToIndex(idx),
  }));

  const initialSnap = startExpanded ? 1 : 0;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[minSheetHeight, maxSheetHeight]}
      index={initialSnap}
      detached={true}
      footerComponent={footer}
      handleComponent={SharkBottomSheetHandle}
      containerHeight={parentHeight}
      style={styles.bottomSheet}>
      <BottomSheetView>{header}</BottomSheetView>
      <View style={styles.contentContainer}>{contents}</View>
      {footer}
    </BottomSheet>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  bottomSheet: {
    borderTopColor: theme.colors.tint_on_surface_01,
    borderTopWidth: theme.borders.normal,
    backgroundColor: theme.colors.floating_surface,
    display: 'flex',
    flexDirection: 'column',
  },
  handlerContainer: {
    alignSelf: 'center',
    top: 10,
    height: 24,
    width: 30,
  },
  contentContainer: {
    height: 1,
    flexGrow: 1,
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
