import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  DarkModeOptionTypes,
  SetDarkModeContext,
  StyleOfStagingContext,
  textStyles,
  theme,
} from '../../constants';
import {SharkButtonToggleGroup} from '../../components/shark-button-toggle-group';
import {AppBar} from '../../components/app-bar';
import {SharkSubheader} from '../../components/shark-subheader';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SharkProfilePic} from '../../components/shark-profile-pic';
import {SlideUpDownSettingsAnimation} from '../../components/slide-up-down-settings-animation';
import SplitVideoLight from '../../../assets/videos/split.mp4';
import SplitVideoDark from '../../../assets/videos/split_dark.mp4';
import Video from 'react-native-video';
import {
  DynamicStyleSheet,
  useDarkMode,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {SharkCheckbox} from '../../components/shark-checkbox';

export const Settings = () => {
  const isDark = useDarkMode();
  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);

  const history = useNavigation();

  const {styleOfStaging, setStyleOfStaging} = React.useContext(
    StyleOfStagingContext,
  );

  const {setDarkMode} = React.useContext(SetDarkModeContext);

  const videoWidth = (Dimensions.get('window').width - 24 * 3) / 2;
  const videoHeight = videoWidth * 2;

  return (
    <ScrollView style={styles.container}>
      <AppBar
        leftIcon="arrow-left"
        onLeftSelect={() => history.goBack()}
        headline="Settings"
      />
      <SharkSubheader calloutText="Account" />
      <TouchableRipple
        style={styles.accountSection}
        onPress={() => history.navigate('Account')}>
        <>
          <SharkProfilePic style={styles.userPic} />
          <View style={styles.accountText}>
            <Text style={styles.accountCallout}>Add account details</Text>
            <Text style={styles.accountBody}>
              Name, email, GitHub integration
            </Text>
          </View>
          <Icon
            style={styles.arrowIcon}
            name="arrow-right"
            size={24}
            color={accent}
          />
        </>
      </TouchableRipple>
      <SharkSubheader calloutText="Theme" />
      <SharkButtonToggleGroup
        values={['Auto', 'Light', 'Dark']}
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
              <Video
                source={SplitVideoLight}
                muted={true}
                controls={false}
                resizeMode={'contain'}
                paused={true}
                repeat={false}
                style={{
                  height: videoHeight,
                  width: videoWidth,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: isDark ? -1 : 1,
                }}
              />
              <Video
                source={SplitVideoDark}
                muted={true}
                controls={false}
                resizeMode={'contain'}
                paused={true}
                repeat={false}
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
              <SharkCheckbox checked={styleOfStaging === 'split'} />
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
              <SharkCheckbox checked={styleOfStaging === 'sheet'} />
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
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  accountSection: {
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userPic: {
    marginRight: 16,
  },
  themeToggle: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  accountCallout: {
    ...textStyles.callout,
    color: theme.colors.on_surface,
  },
  accountText: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 16,
    flexGrow: 1,
    color: theme.colors.on_surface,
  },
  accountBody: {
    ...textStyles.body_02,
    color: theme.colors.on_surface_secondary,
  },
  themeText: {
    marginVertical: 16,
    marginHorizontal: 16,
    ...textStyles.caption_02,
    color: theme.colors.on_surface_secondary,
  },
  arrowIcon: {
    padding: 8,
  },
  stagingVideoContainer: {
    flexDirection: 'column',
  },
  checkboxContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxText: {
    marginLeft: 8,
    flexShrink: 0,
    ...textStyles.body_01,
    color: theme.colors.on_surface_secondary,
  },
});
