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
import {theme, UserContext} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {SharkButton} from '@components/shark-button';
import {SharkProfilePic} from '@components/shark-profile-pic';
import {SharkTextInput} from '@components/shark-text-input';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkCheckbox} from '@components/shark-checkbox';
import {BottomSpacerView, TopSpacerView} from '@components/shark-safe-top';
import {githubOauthLink} from '@constants/oauth';
import {validateEmail} from '@utils';
import {GitHubLogout} from './github-logout/github-logout';
import {SharkDivider} from '@components/shark-divider';
import {SharkSnackbar} from '@components/shack-snackbar';
import {useTranslation} from 'react-i18next';

export const Account = () => {
  const {t} = useTranslation();

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

  const styles = useDynamicValue(dynamicStyles);

  const history = useNavigation();

  const isGitHub = useGitHub && !!gitHubUser;

  const authorImage = isGitHub ? {uri: gitHubUser!.avatar_url} : null;

  const personName = isGitHub
    ? gitHubUser!.name
    : !!manualName
    ? manualName
    : t('personNameDefault');

  const personEmail = isGitHub
    ? gitHubUser!.email
    : !!manualEmail
    ? manualEmail
    : t('personEmailDefault');

  const [savedShow, setSaved] = React.useState(false);

  const saveChanges = () => {
    let hasError = false;
    const noEmptyStr = t('fieldNoEmpty');
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
        setManualEmailError(t('inputValidEmail'));
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
    setSaved(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column'}}
        behavior="height"
        enabled>
        <ScrollView>
          <TopSpacerView isFloating={true} />
          <AppBar
            leftIcon="back"
            onLeftSelect={() => history.goBack()}
            headline={t('accountsHeadline')}
          />
          <SharkSubheader calloutText={t('ghIntegrationHeadline')} />
          {!!gitHubUser ? (
            <GitHubLogout />
          ) : (
            <SharkButton
              style={styles.signinGithubButton}
              text={t('signInWGH')}
              type="primary"
              icon={'github'}
              onPress={() => {
                Linking.openURL(githubOauthLink);
              }}
            />
          )}
          <SharkDivider />
          <SharkSubheader calloutText={t('commitAuthoring')} />
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
                <Text style={styles.useGHText}>{t('useGHCreds')}</Text>
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
              text={t('saveChanges')}
              onPress={() => saveChanges()}
              type="primary"
              disabled={useGitHub}
            />
          </View>
          <BottomSpacerView />
        </ScrollView>
      </KeyboardAvoidingView>

      <SharkSnackbar
        visible={savedShow}
        onDismiss={() => setSaved(false)}
        message={t('authorDetailsSaved')}
      />
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  signinGithubButton: {
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.xs,
    marginHorizontal: theme.spacing.m,
  },
  commitAuthorContainer: {
    paddingHorizontal: theme.spacing.m,
  },
  authorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorPreviewText: {
    flexDirection: 'column',
    marginLeft: theme.spacing.m,
    flexGrow: 1,
  },
  authorName: {
    ...theme.textStyles.caption_01,
    color: theme.colors.label_high_emphasis,
  },
  authorEmail: {
    ...theme.textStyles.caption_02,
    color: theme.colors.label_high_emphasis,
  },
  useGHCredsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  checkboxContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  useGHText: {
    ...theme.textStyles.body_01,
    color: theme.colors.label_high_emphasis,
  },
  textInput: {
    marginTop: theme.spacing.m,
  },
  saveButton: {
    marginVertical: theme.spacing.l,
  },
  disabledStyling: {
    opacity: theme.opacity.disabled,
  },
});
