import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {theme} from '../../constants/theme';
import {SharkButtonToggleGroup} from '../../components/shark-button-toggle-group/shark-button-toggle-group';
import {AppBar} from '../../components/app-bar/app-bar';
import {SharkSubheader} from '../../components/shark-subheader/shark-subheader';
import {textStyles} from '../../constants/text-styles';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SharkProfilePic} from '../../components/shark-profile-pic/shark-profile-pic';
import {SlideUpDownSettingsAnimation} from '../../components/slide-up-down-settings-animation/slide-up-down-settings-animation';
import SplitVideo from '../../../assets/videos/split.mp4';
import Video from 'react-native-video';
import RoundCheckbox from './RoundCheckbox';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

type StagingTypes = 'split' | 'sheet';

export const Settings = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  const on_surface_secondary = useDynamicValue(
    theme.colors.on_surface_secondary,
  );

  const history = useNavigation();
  const [direction, setDirection] = React.useState(false);
  const [styleOfStaging, setStyleOfStaging] = React.useState<StagingTypes>(
    'split',
  );

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
        onSelect={() => {}}
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
            <Video
              source={SplitVideo}
              style={{height: videoHeight, width: videoWidth}}
              muted={true}
              controls={false}
              resizeMode={'contain'}
              paused={true}
              repeat={false}
            />
            <View style={styles.checkboxContainer}>
              <RoundCheckbox
                checked={styleOfStaging === 'split'}
                backgroundColor={accent}
                borderColor={on_surface_secondary}
                size={18}
              />
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
            <SlideUpDownSettingsAnimation
              vidHeight={videoHeight}
              vidWidth={videoWidth}
              direction={styleOfStaging === 'sheet' ? 'down' : 'up'}
            />
            <View style={styles.checkboxContainer}>
              <RoundCheckbox
                checked={styleOfStaging === 'sheet'}
                backgroundColor={accent}
                borderColor={on_surface_secondary}
                size={18}
              />
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
