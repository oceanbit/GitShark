import * as React from 'react';
import {ScrollView, Linking, Text, View} from 'react-native';
import {AppBar} from '../../components/app-bar';
import {SharkSubheader} from '../../components/shark-subheader';
import {textStyles, theme, UserContext} from '../../constants';
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
  const {
    useGitHub,
    setUseGithub,
    gitHubUser,
    manualUser,
    setManualUser,
  } = React.useContext(UserContext);

  const [manualName, setManualName] = React.useState('');
  const [manualEmail, setManualEmail] = React.useState('');

  const styles = useDynamicStyleSheet(dynamicStyles);

  const history = useNavigation();

  const disabledStyling = {
    opacity: 0.4,
  };

  const isGitHub = useGitHub && !!gitHubUser;

  const authorImage = isGitHub ? {uri: gitHubUser!.avatar_url} : null;

  const personName = isGitHub
    ? gitHubUser!.name
    : !!manualName
    ? manualName
    : 'Name';

  const personEmail = isGitHub
    ? gitHubUser!.email
    : !!manualEmail
    ? manualEmail
    : 'Email';

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
          <SharkProfilePic source={authorImage} showGHLogo={isGitHub} />
          <View style={styles.authorPreviewText}>
            <Text style={styles.authorName}>{personName}</Text>
            <Text style={styles.authorEmail}>{personEmail}</Text>
          </View>
        </View>
        <TouchableRipple
          style={[
            styles.useGHCredsContainer,
            !gitHubUser ? disabledStyling : {},
          ]}
          onPress={() => setUseGithub(!useGitHub)}
          disabled={!gitHubUser}>
          <>
            <View style={styles.checkboxContainer}>
              <SharkCheckbox checked={useGitHub} onValueChange={() => {}} />
            </View>
            <Text style={styles.useGHText}>Use GitHub credentials</Text>
          </>
        </TouchableRipple>
        <View style={useGitHub ? disabledStyling : {}}>
          <SharkTextInput
            style={styles.textInput}
            placeholder="Name"
            value={personName}
            disabled={useGitHub}
            onChangeText={setManualName}
          />
          <SharkTextInput
            style={styles.textInput}
            placeholder="Email"
            value={personEmail}
            disabled={useGitHub}
            onChangeText={setManualEmail}
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
