import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StyleOfStagingContext, theme} from '@constants';
import {AppBar} from '@components/app-bar';
import {useNavigation} from '@react-navigation/native';
import {SlideUpDownSettingsAnimation} from './components/slide-up-down-settings-animation';
import SplitLight from '@assets/images/split.png';
import SplitDark from '@assets/images/split_dark.png';
import {
  DynamicStyleSheet,
  useDarkMode,
  useDynamicValue,
} from 'react-native-dynamic';
import {SharkRadio} from '@components/shark-radio';
import {BottomSpacerView, TopSpacerView} from '../../components/shark-safe-top';
import {useTranslation} from 'react-i18next';

export const StagingLayout = () => {
  const {t} = useTranslation();
  const history = useNavigation();

  const isDark = useDarkMode();
  const styles = useDynamicValue(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);

  const {styleOfStaging, setStyleOfStaging} = React.useContext(
    StyleOfStagingContext,
  );

  const [imageContainerSize, setImageContainerSize] = React.useState({
    height: 0,
    width: 0,
  });

  const [radioButtonSize, setRadioButtonSize] = React.useState(0);

  const maxWidth = imageContainerSize.width / 2 - theme.spacing.xl;

  const maxHeight =
    imageContainerSize.height -
    theme.spacing.xl -
    theme.spacing.xl -
    radioButtonSize;

  const isMaxWidth = maxWidth * 2 >= maxHeight;
  const isMaxHeight = maxHeight / 2 >= maxWidth;

  let videoWidth = maxWidth;
  let videoHeight = maxHeight;

  if (isMaxWidth) {
    videoWidth = maxHeight / 2;
  }
  if (isMaxHeight) {
    videoHeight = maxWidth * 2;
  }

  return (
    <View
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <TopSpacerView isFloating={true} />
      <AppBar
        leftIconLabel={t('backAction')}
        leftIcon="back"
        onLeftSelect={() => history.goBack()}
        headline={t('stagingLayoutHeadline')}
      />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          flexGrow: 1,
          height: 1,
          padding: theme.spacing.xl,
        }}
        onLayout={event => {
          const {height: eventHeight, width: eventWidth} =
            event.nativeEvent.layout;
          setImageContainerSize({height: eventHeight, width: eventWidth});
        }}
        accessible
        accessibilityRole="radiogroup">
        <TouchableWithoutFeedback
          onPress={() => setStyleOfStaging('split')}
          accessibilityRole="radio"
          accessibilityState={{checked: styleOfStaging === 'split'}}
          accessibilityLiveRegion="polite">
          <View style={styles.stagingVideoContainer}>
            {/*
              We have to set the dark mode and light mode and stack them in order for the Video component
              to switch colors at the same time as the rest of the app. Otherwise we get some loading jank
              when switching color modes
            */}
            <View
              style={{
                height: videoHeight,
                width: videoWidth,
                position: 'relative',
              }}>
              <Image
                source={SplitLight}
                resizeMode={'contain'}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  height: videoHeight,
                  width: videoWidth,
                  zIndex: isDark ? -1 : 1,
                }}
              />
              <Image
                source={SplitDark}
                resizeMode={'contain'}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  height: videoHeight,
                  width: videoWidth,
                  zIndex: isDark ? 1 : -1,
                }}
              />
            </View>
            <View
              style={styles.checkboxContainer}
              onLayout={event => {
                const {height: eventHeight} = event.nativeEvent.layout;
                setRadioButtonSize(eventHeight);
              }}>
              <View
                importantForAccessibility={'no'}
                accessibilityElementsHidden={true}>
                <SharkRadio checked={styleOfStaging === 'split'} />
              </View>
              <Text
                style={[
                  styles.checkboxText,
                  styleOfStaging === 'split' ? {color: accent} : {},
                ]}>
                {t('splitLayout')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{width: theme.spacing.xl}} />
        <TouchableWithoutFeedback
          onPress={() => setStyleOfStaging('sheet')}
          accessibilityRole="radio"
          accessibilityState={{checked: styleOfStaging === 'sheet'}}
          accessibilityLiveRegion="polite">
          <View style={styles.stagingVideoContainer}>
            <View
              style={{
                height: videoHeight,
                width: videoWidth,
                position: 'relative',
              }}>
              <SlideUpDownSettingsAnimation
                vidHeight={videoHeight}
                vidWidth={videoWidth}
                direction={styleOfStaging === 'sheet' ? 'down' : 'up'}
                darkMode={false}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  zIndex: isDark ? -1 : 1,
                }}
              />
              <SlideUpDownSettingsAnimation
                vidHeight={videoHeight}
                vidWidth={videoWidth}
                direction={styleOfStaging === 'sheet' ? 'down' : 'up'}
                darkMode={true}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  zIndex: isDark ? 1 : -1,
                }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <View
                importantForAccessibility={'no'}
                accessibilityElementsHidden={true}>
                <SharkRadio checked={styleOfStaging === 'sheet'} />
              </View>
              <Text
                style={[
                  styles.checkboxText,
                  styleOfStaging === 'sheet' ? {color: accent} : {},
                ]}>
                {t('sheetLayout')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <BottomSpacerView />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  stagingVideoContainer: {
    flexDirection: 'column',
  },
  checkboxContainer: {
    paddingTop: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxText: {
    marginLeft: theme.spacing.xs,
    flexShrink: 0,
    ...theme.textStyles.body_01,
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
  },
});
