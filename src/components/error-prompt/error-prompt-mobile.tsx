import * as React from 'react';
import {View, Text} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {Portal, TouchableRipple} from 'react-native-paper';
import {SharkBottomSheet} from '@components/shark-bottom-sheet';
import {
  GitHubButton,
  RedContainer,
  TryAgainButton,
} from './error-prompt-common';
import {SharkDivider} from '@components/shark-divider';
import Animated, {useAnimatedStyle, interpolate} from 'react-native-reanimated';
import {FullError} from '@types';
import {useTranslation} from 'react-i18next';
import {Scrim} from '@components/scrim';
import {BottomSpacerView} from '@components/shark-safe-top';
import {
  BottomSheetFooter,
  BottomSheetScrollView,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import {ComponentProps, Ref} from 'react';

interface ErrorSheetContentsProps {
  expandBtnHeight: number;
  callstackRef: Ref<any>;
  callStack: string;
  buttonHeight: number;
}

const ErrorSheetContents = ({
  expandBtnHeight,
  callstackRef,
  callStack,
  buttonHeight,
}: ErrorSheetContentsProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const {animatedIndex, snapToIndex} = useBottomSheet();

  const buttonStyle = useAnimatedStyle(() => {
    const buttonOpacity = interpolate(
      animatedIndex.value,
      [0, 1],
      [1, 0],
      Animated.Extrapolate.CLAMP,
    );

    return {
      opacity: buttonOpacity,
      zIndex: 1,
    };
  });

  const codeStyle = useAnimatedStyle(() => {
    const codeOpacity = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Animated.Extrapolate.CLAMP,
    );

    return {
      opacity: codeOpacity,
      zIndex: -1,
      height: '100%',
      marginTop: -expandBtnHeight,
    };
  });

  return (
    <View style={styles.sheetContainer}>
      <Animated.View style={buttonStyle}>
        <TouchableRipple
          onPress={() => snapToIndex(1)}
          style={styles.fullLogContainer}>
          <Text style={styles.fullLogText}>{t('viewLog')}</Text>
        </TouchableRipple>
      </Animated.View>
      <Animated.View style={codeStyle}>
        <BottomSheetScrollView style={styles.stackContainer}>
          <Text style={styles.callstack} ref={callstackRef as any}>
            {callStack}
          </Text>
        </BottomSheetScrollView>
        <View style={{height: buttonHeight}} />
      </Animated.View>
    </View>
  );
};

export const ErrorPromptMobile = (props: FullError) => {
  const {callStack} = props;
  const styles = useDynamicValue(dynamicStyles);

  const callstackRef = React.useRef();

  const gitHubButton = (
    <GitHubButton
      props={props}
      style={styles.ghButton}
      stacktraceRef={callstackRef}
    />
  );

  const tryAgainButton = (
    <TryAgainButton props={props} stacktraceRef={callstackRef} />
  );

  const [buttonHeight, setButtonHeight] = React.useState(0);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [expandBtnHeight, setExpandBtnHeight] = React.useState(0);

  const minSheetHeight =
    buttonHeight +
    headerHeight +
    expandBtnHeight +
    theme.spacing.m +
    theme.spacing.xs;

  console.log({
    minSheetHeight,
    buttonHeight,
    headerHeight,
    expandBtnHeight,
  });

  const {t} = useTranslation();

  const footer: ComponentProps<typeof SharkBottomSheet>['footer'] = ({
    animatedFooterPosition,
  }) => (
    <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
      <View
        onLayout={event => {
          const {height: eventHeight} = event.nativeEvent.layout;
          !buttonHeight && setButtonHeight(eventHeight);
        }}>
        <SharkDivider />
        <View style={styles.buttonContainer}>
          {gitHubButton}
          {tryAgainButton}
        </View>
        <BottomSpacerView />
      </View>
    </BottomSheetFooter>
  );

  const allSpacingSet = buttonHeight && headerHeight && expandBtnHeight;

  // Mobile view
  return (
    <Portal>
      <Scrim visible={true} dismissable={false}>
        {() => (
          <>
            {/*
            This is dumb and bad, but for some reason, "BottomSheetContents" set text value to 0 initially.
            As a result, only the padding height is assigned with 0 height, this messes up a bunch of calcs we're doing
            */}
            {!expandBtnHeight && (
              <TouchableRipple
                onLayout={event => {
                  const {height: eventHeight} = event.nativeEvent.layout;
                  !expandBtnHeight && setExpandBtnHeight(eventHeight);
                }}
                style={[
                  styles.fullLogContainer,
                  {position: 'absolute', right: '5000%'},
                ]}>
                <Text style={styles.fullLogText}>{t('viewLog')}</Text>
              </TouchableRipple>
            )}
            <SharkBottomSheet
              key={allSpacingSet}
              maxSheetHeight={'100%'}
              minSheetHeight={minSheetHeight}
              startExpanded={false}
              header={
                <View
                  style={styles.headerContainer}
                  onLayout={event => {
                    const {height: eventHeight} = event.nativeEvent.layout;
                    if (!headerHeight) setHeaderHeight(eventHeight);
                  }}>
                  <View style={styles.redContainer}>
                    <RedContainer {...props} />
                  </View>
                  <SharkDivider />
                </View>
              }
              contents={
                <ErrorSheetContents
                  buttonHeight={buttonHeight}
                  expandBtnHeight={expandBtnHeight}
                  callstackRef={callstackRef}
                  callStack={callStack}
                />
              }
              footer={footer}
            />
          </>
        )}
      </Scrim>
    </Portal>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  headerContainer: {
    backgroundColor: theme.colors.surface,
  },
  sheetContainer: {
    backgroundColor: theme.colors.surface,
    position: 'relative',
  },
  redContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    paddingTop: theme.spacing.xs,
  },
  stackContainer: {
    padding: theme.spacing.m,
    height: '100%',
  },
  callstack: {
    ...theme.textStyles.code,
    backgroundColor: theme.colors.surface,
  },
  buttonContainer: {
    padding: theme.spacing.m,
  },
  ghButton: {
    marginBottom: theme.spacing.xs,
  },
  fullLogContainer: {
    padding: theme.spacing.m,
  },
  fullLogText: {
    color: theme.colors.primary,
    ...theme.textStyles.callout_01,
    textAlign: 'center',
  },
  buttonOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
});
