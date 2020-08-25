import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  DarkModeOptionTypes,
  SetDarkModeContext,
  StyleOfStagingContext,
  theme,
} from '@constants';
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
import {AccountButton} from './account-button/account-button';

export const Settings = () => {
  const isDark = useDarkMode();
  const styles = useDynamicValue(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);

  const history = useNavigation();

  const {styleOfStaging, setStyleOfStaging} = React.useContext(
    StyleOfStagingContext,
  );

  const {setDarkMode, localDarkMode} = React.useContext(SetDarkModeContext);

  // This is fragile and bad. Oh well
  const matchingLocalMode = `${localDarkMode[0].toUpperCase()}${localDarkMode.slice(
    1,
    localDarkMode.length,
  )}`;

  const videoWidth = (Dimensions.get('window').width - 24 * 3) / 2;
  const videoHeight = videoWidth * 2;

  return (
    <ScrollView>
      <TopSpacerView isFloating={true} />
      <AppBar
        leftIcon="back"
        onLeftSelect={() => history.goBack()}
        headline="Settings"
      />
      <SharkSubheader calloutText="Account" />
      <AccountButton />
      <SharkSubheader calloutText="Theme" />
      <SharkButtonToggleGroup
        values={['Auto', 'Light', 'Dark']}
        value={matchingLocalMode}
        onSelect={val => setDarkMode(val.toLowerCase() as DarkModeOptionTypes)}
        style={styles.themeToggle}
      />
      <Text style={styles.themeText}>
        ‘Auto’ will switch between ‘Light’ and ‘Dark’ alongside your system
        theme.
      </Text>
      <SharkSubheader calloutText="Staging layout" />
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginBottom: 20,
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
                Split
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

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
                Sheet
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <BottomSpacerView />
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  themeToggle: {
    marginHorizontal: theme.spacing.m,
    marginTop: theme.spacing.xs,
  },
  themeText: {
    marginVertical: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
    ...theme.textStyles.caption_02,
    color: theme.colors.on_surface,
    opacity: theme.opacity.secondary,
  },
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
    color: theme.colors.on_surface,
    opacity: theme.opacity.secondary,
  },
});
