import * as React from 'react';
import {ScrollView, Linking, Text, View} from 'react-native';
import {AppBar} from '../../components/app-bar';
import {SharkSubheader} from '../../components/shark-subheader';
import {textStyles, theme} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {SharkButton} from '../../components/shark-button';
import {SharkProfilePic} from '../../components/shark-profile-pic';
import {SharkTextInput} from '../../components/shark-text-input';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkCheckbox} from '../../components/shark-checkbox';
import {githubOauthLink} from '../../constants/oauth';
import {BottomSpacerView, TopSpacerView} from '../../components/shark-safe-top';

export const Account = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const history = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <TopSpacerView />
      <AppBar
        leftIcon="arrow-left"
        onLeftSelect={() => history.goBack()}
        headline="Accounts"
      />
      <SharkSubheader calloutText="GitHub integration" />
      <SharkButton
        style={styles.signinGithubButton}
        text="Sign in with GitHub"
        type="primary"
        icon={'github-circle'}
        onPress={() => {
          Linking.openURL(githubOauthLink);
        }}
      />
      <SharkSubheader
        style={styles.commitAuthoringHeader}
        calloutText="Commit authoring"
      />
      <View style={styles.commitAuthorContainer}>
        <View style={styles.authorPreview}>
          <SharkProfilePic />
          <View style={styles.authorPreviewText}>
            <Text style={styles.authorName}>Name</Text>
            <Text style={styles.authorEmail}>Email</Text>
          </View>
        </View>
        <TouchableRipple style={styles.useGHCredsContainer} disabled={true}>
          <>
            <View style={styles.checkboxContainer}>
              <SharkCheckbox checked={false} onValueChange={() => {}} />
            </View>
            <Text style={styles.useGHText}>Use GitHub credentials</Text>
          </>
        </TouchableRipple>
        <SharkTextInput
          style={styles.textInput}
          placeholder="Name"
          value=""
          onChangeText={() => {}}
        />
        <SharkTextInput
          style={styles.textInput}
          placeholder="Email"
          value=""
          onChangeText={() => {}}
        />
        <SharkButton
          style={styles.saveButton}
          text="Save changes"
          onPress={() => {}}
          type="primary"
          disabled={true}
        />
      </View>
      <BottomSpacerView />
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  signinGithubButton: {
    marginBottom: 24,
    marginTop: 8,
    marginHorizontal: 16,
  },
  commitAuthoringHeader: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  commitAuthorContainer: {
    paddingHorizontal: 16,
  },
  authorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorPreviewText: {
    flexDirection: 'column',
    marginLeft: 16,
    flexGrow: 1,
  },
  authorName: {
    ...textStyles.caption_01,
    color: theme.colors.on_surface,
  },
  authorEmail: {
    ...textStyles.caption_02,
    color: theme.colors.on_surface,
  },
  useGHCredsContainer: {
    opacity: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 8,
  },
  checkboxContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  useGHText: {
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
  textInput: {
    marginTop: 16,
  },
  saveButton: {
    marginVertical: 24,
  },
});
