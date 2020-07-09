import * as React from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {AppBar} from '@components/app-bar';
import {SharkSubheader} from '@components/shark-subheader';
import {spacing, textStyles, theme, UserContext} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {SharkButton} from '@components/shark-button';
import {SharkProfilePic} from '@components/shark-profile-pic';
import {SharkTextInput} from '@components/shark-text-input';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkCheckbox} from '@components/shark-checkbox';
import {BottomSpacerView, TopSpacerView} from '@components/shark-safe-top';
import {githubOauthLink} from '@constants/oauth';
import {validateEmail} from '@utils';
import {GitHubLogout} from './github-logout/github-logout';
import {SharkDivider} from '@components/shark-divider';

export const Account = () => {
  const {
    useGitHub,
    setUseGithub,
    gitHubUser,
    manualUser,
    setManualUser,
  } = React.useContext(UserContext);

  const [manualName, setManualName] = React.useState(manualUser?.name || '');
  const [manualEmail, setManualEmail] = React.useState(manualUser?.email || '');

  const [manualNameError, setManualNameError] = React.useState('');
  const [manualEmailError, setManualEmailError] = React.useState('');

  const styles = useDynamicStyleSheet(dynamicStyles);

  const history = useNavigation();

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

  const saveChanges = () => {
    let hasError = false;
    const noEmptyStr = 'Field cannot be empty.';
    if (!manualName) {
      setManualNameError(noEmptyStr);
      hasError = true;
    }
    if (!manualEmail) {
      setManualEmailError(noEmptyStr);
      hasError = true;
    } else {
      const isValid = validateEmail(manualEmail);
      if (!isValid) {
        setManualEmailError('Please input a valid email address');
        hasError = true;
      }
    }
    if (hasError) {
      return;
    }

    setManualUser({
      email: manualEmail,
      name: manualName,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, flexDirection: 'column'}}
      behavior="height"
      enabled>
      <ScrollView style={styles.container}>
        <TopSpacerView isFloating={true} />
        <AppBar
          leftIcon="back"
          onLeftSelect={() => history.goBack()}
          headline="Accounts"
        />
        <SharkSubheader calloutText="GitHub integration" />
        {!!gitHubUser ? (
          <GitHubLogout />
        ) : (
          <SharkButton
            style={styles.signinGithubButton}
            text="Sign in with GitHub"
            type="primary"
            icon={'github'}
            onPress={() => {
              Linking.openURL(githubOauthLink);
            }}
          />
        )}
        <SharkDivider />
        <SharkSubheader calloutText="Commit authoring" />
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
              !gitHubUser ? styles.disabledStyling : {},
            ]}
            onPress={() => {
              setUseGithub(!useGitHub);
              setManualName('');
              setManualEmail('');
            }}
            disabled={!gitHubUser}>
            <>
              <View style={styles.checkboxContainer}>
                {/* Not setting disabled since valuechange is noop and we set styling above */}
                <SharkCheckbox checked={useGitHub} onValueChange={() => {}} />
              </View>
              <Text style={styles.useGHText}>Use GitHub credentials</Text>
            </>
          </TouchableRipple>
          <SharkTextInput
            style={styles.textInput}
            placeholder={personName}
            value={manualName}
            disabled={useGitHub}
            errorStr={manualNameError}
            onChangeText={val => {
              setManualName(val);
              setManualNameError('');
            }}
          />
          <SharkTextInput
            style={styles.textInput}
            placeholder={personEmail}
            value={manualEmail}
            disabled={useGitHub}
            errorStr={manualEmailError}
            onChangeText={val => {
              setManualEmail(val);
              setManualEmailError('');
            }}
            keyboardType={'email-address'}
          />
          <SharkButton
            style={styles.saveButton}
            text="Save changes"
            onPress={() => saveChanges()}
            type="primary"
            disabled={useGitHub}
          />
        </View>
        <BottomSpacerView />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  signinGithubButton: {
    marginBottom: spacing.l,
    marginTop: spacing.xs,
    marginHorizontal: spacing.m,
  },
  commitAuthorContainer: {
    paddingHorizontal: spacing.m,
  },
  authorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorPreviewText: {
    flexDirection: 'column',
    marginLeft: spacing.m,
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
    paddingVertical: spacing.xs,
    marginTop: spacing.xs,
  },
  checkboxContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  useGHText: {
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
  textInput: {
    marginTop: spacing.m,
  },
  saveButton: {
    marginVertical: spacing.l,
  },
  disabledStyling: {
    opacity: theme.opacity.disabled,
  },
});
