import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StyleOfStagingContext, theme} from '@constants';
import {SharkButtonToggleGroup} from '@components/shark-button-toggle-group';
import {AppBar} from '@components/app-bar';
import {SharkSubheader} from '@components/shark-subheader';
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
import {mediaQuery, useDimensions} from 'react-native-responsive-ui';

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

  const {width, height} = useDimensions();

  const maxWidth =
    imageContainerSize.width / 2 -
    theme.spacing.xl -
    theme.spacing.xl -
    theme.spacing.xl;

  const maxHeight =
    imageContainerSize.height - theme.spacing.xl - theme.spacing.xl;

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
        }}
        onLayout={event => {
          const {
            height: eventHeight,
            width: eventWidth,
          } = event.nativeEvent.layout;
          setImageContainerSize({height: eventHeight, width: eventWidth});
        }}>
        <TouchableWithoutFeedback onPress={() => setStyleOfStaging('split')}>
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
                  height: videoHeight,
                  width: videoWidth,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: isDark ? -1 : 1,
                  backgroundColor: 'blue',
                }}
              />
              <Image
                source={SplitDark}
                resizeMode={'contain'}
                style={{
                  height: videoHeight,
                  width: videoWidth,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: isDark ? 1 : -1,
                  backgroundColor: 'blue',
                }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <SharkRadio checked={styleOfStaging === 'split'} />
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
        <TouchableWithoutFeedback onPress={() => setStyleOfStaging('sheet')}>
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
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: isDark ? -1 : 1,
                }}
              />
              <SlideUpDownSettingsAnimation
                vidHeight={videoHeight}
                vidWidth={videoWidth}
                direction={styleOfStaging === 'sheet' ? 'down' : 'up'}
                darkMode={true}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: isDark ? 1 : -1,
                }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <SharkRadio checked={styleOfStaging === 'sheet'} />
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
    marginTop: theme.spacing.m,
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
