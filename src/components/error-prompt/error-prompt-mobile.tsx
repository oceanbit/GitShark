import * as React from 'react';
import {View, Text} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {Portal, TouchableRipple} from 'react-native-paper';
import {SharkBottomSheet, SharkSheetRef} from '@components/shark-bottom-sheet';
import {
  GitHubButton,
  RedContainer,
  TryAgainButton,
} from './error-prompt-common';
import {SharkDivider} from '@components/shark-divider';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {FullError} from '@types';
import {useTranslation} from 'react-i18next';
import {Scrim} from '@components/scrim';
import ViewShot from 'react-native-view-shot';
import {BottomSpacerView} from '@components/shark-safe-top';

export const ErrorPromptMobile = (props: FullError) => {
  const {callStack} = props;
  const styles = useDynamicValue(dynamicStyles);

  const {t} = useTranslation();

  const sheetRef = React.useRef<SharkSheetRef>();

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

  // Mobile view
  return (
    <Portal>
      <Scrim visible={true} dismissable={false}>
        {
          null /* Key is required in order to get re-render once min-sheet is properly defined  */
        }
        <SharkBottomSheet
          key={minSheetHeight}
          maxSheetHeight={'100%'}
          minSheetHeight={minSheetHeight}
          startExpanded={false}
          sheetRef={sheetRef}
          renderHeader={() => (
            <View
              style={styles.headerContainer}
              onLayout={event => {
                const {height: eventHeight} = event.nativeEvent.layout;
                setHeaderHeight(eventHeight);
              }}>
              <View style={styles.redContainer}>
                <RedContainer {...props} />
              </View>
              <SharkDivider />
            </View>
          )}
          renderContent={fall => {
            const buttonOpacity = Animated.interpolate(fall, {
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: Animated.Extrapolate.CLAMP,
            });

            const codeOpacity = Animated.interpolate(fall, {
              inputRange: [0, 1],
              outputRange: [1, 0],
              extrapolate: Animated.Extrapolate.CLAMP,
            });

            return (
              <View>
                <Animated.View
                  style={{
                    opacity: buttonOpacity,
                    zIndex: 1,
                  }}
                  onLayout={event => {
                    const {height: eventHeight} = event.nativeEvent.layout;
                    setExpandBtnHeight(eventHeight);
                  }}>
                  <TouchableRipple
                    onPress={() => sheetRef.current?.snapTo(0)}
                    style={styles.fullLogContainer}>
                    <Text style={styles.fullLogText}>{t('viewLog')}</Text>
                  </TouchableRipple>
                </Animated.View>
                <ScrollView
                  style={[
                    styles.sheetContainer,
                    {marginTop: -expandBtnHeight},
                  ]}>
                  <Animated.View
                    style={[styles.stackContainer, {opacity: codeOpacity}]}>
                    <Text style={styles.callstack} ref={callstackRef as any}>
                      {callStack}
                    </Text>
                  </Animated.View>
                  <SharkDivider />
                  <View style={styles.buttonContainer}>
                    {gitHubButton}
                    {tryAgainButton}
                  </View>
                  <BottomSpacerView />
                </ScrollView>
              </View>
            );
          }}
        />
        <View
          style={styles.buttonOverlay}
          onLayout={event => {
            const {height: eventHeight} = event.nativeEvent.layout;
            setButtonHeight(eventHeight);
          }}>
          <SharkDivider />
          <View style={styles.buttonContainer}>
            {gitHubButton}
            {tryAgainButton}
          </View>
          <BottomSpacerView />
        </View>
      </Scrim>
    </Portal>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  headerContainer: {
    backgroundColor: theme.colors.surface,
  },
  sheetContainer: {
    height: '100%',
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
