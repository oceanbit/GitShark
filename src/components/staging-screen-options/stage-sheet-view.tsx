import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {theme} from '../../constants';
import {StagedChanges} from './staged-changes';
import {ChangesArrayItem} from '../../services';
import {UnstagedChanges} from './unstaged-changes';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

const AnimatedView = Animated.View;

const minSheetHeight = 184;

interface StageSheetViewProps {
  unstagedChanges: ChangesArrayItem[];
  stagedChanges: ChangesArrayItem[];
  addToStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  removeFromStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  onCommit: () => void;
}

export const StageSheetView = ({
  unstagedChanges,
  stagedChanges,
  addToStaged,
  removeFromStaged,
  onCommit,
}: StageSheetViewProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [parentHeight, setParentHeight] = React.useState(0);

  // + 2 because of the height of the top border
  const maxSheetHeight = parentHeight + 2;

  const maxUnstagedHeight = parentHeight - minSheetHeight;

  const bottomSheetRef = React.createRef<BottomSheet>();

  const fall = new Animated.Value(1);

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
        <View style={styles.trueHeader}>{renderHandler()}</View>
      </TouchableWithoutFeedback>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <StagedChanges
          onCommit={onCommit}
          removeFromStaged={removeFromStaged}
          stagedChanges={stagedChanges}
        />
      </View>
    );
  };

  return (
    <View
      style={styles.container}
      onLayout={event => {
        const {height} = event.nativeEvent.layout;
        setParentHeight(height);
      }}>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnap={0}
        snapPoints={[maxSheetHeight, minSheetHeight]}
        callbackNode={fall}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
      <View style={{maxHeight: maxUnstagedHeight}}>
        <UnstagedChanges
          addToStaged={addToStaged}
          unstagedChanges={unstagedChanges}
        />
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  handlerContainer: {
    alignSelf: 'center',
    top: 10,
    height: 24,
    width: 30,
  },
  trueHeader: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.divider,
    borderTopWidth: 2,
  },
  handlerBar: {
    position: 'absolute',
    backgroundColor: theme.colors.on_surface_secondary_no_opacity,
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
  contentContainer: {
    backgroundColor: theme.colors.surface,
    height: '100%',
  },
});
