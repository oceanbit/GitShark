import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from '../../constants/theme';
import {AppBar} from '../../components/app-bar/app-bar';
import {SharkSubheader} from '../../components/shark-subheader/shark-subheader';
import {textStyles} from '../../constants/text-styles';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple, Checkbox} from 'react-native-paper';
import {SharkButton} from '../../components/shark-button/shark-button';
import {SharkProfilePic} from '../../components/shark-profile-pic/shark-profile-pic';
import {SharkTextInput} from '../../components/shark-text-input/shark-text-input';

export const Account = () => {
  const history = useNavigation();

  return (
    <View style={styles.container}>
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
        onPress={() => {}}
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
              <Checkbox status={'unchecked'} onPress={() => {}} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  signinGithubButton: {
    marginBottom: 24,
    marginTop: 8,
    marginHorizontal: 16,
  },
  commitAuthoringHeader: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
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
  },
  authorEmail: {
    ...textStyles.caption_02,
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
    alignContent: 'center',
    marginRight: 16,
  },
  useGHText: {
    ...textStyles.body_01,
  },
  textInput: {
    marginTop: 16,
  },
  saveButton: {
    marginVertical: 24,
  },
});
