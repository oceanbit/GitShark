import * as React from 'react';
import {Text, View} from 'react-native';
import {theme, UserContext} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from '@components/shark-icon';
import {SharkProfilePic} from '@components/shark-profile-pic';

import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useTranslation} from 'react-i18next';
import {NavProps} from '@types';

export const AccountButton = () => {
  const {t} = useTranslation();

  const {useGitHub, gitHubUser, manualUser} = React.useContext(UserContext);
  const history = useNavigation<NavProps>();

  const styles = useDynamicValue(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);

  const isGitHub = useGitHub && !!gitHubUser;

  const authorImage = isGitHub ? {uri: gitHubUser!.avatar_url} : null;

  const personName = isGitHub
    ? gitHubUser!.name
    : !!manualUser
    ? manualUser.name
    : null;

  const personEmail = isGitHub
    ? gitHubUser!.email
    : !!manualUser
    ? manualUser.email
    : null;

  return (
    <TouchableRipple
      style={styles.accountSection}
      onPress={() => history.navigate('Account')}>
      <>
        <SharkProfilePic
          style={styles.userPic}
          source={authorImage as any}
          showGHLogo={isGitHub}
          hidden={true}
        />
        <View style={styles.accountText}>
          {!!personName && (
            <Text
              accessibilityLabel={
                t('accountName', {
                  personName,
                })!
              }
              style={styles.accountCallout}>
              {personName}
            </Text>
          )}
          {!!personEmail && (
            <Text
              accessibilityLabel={
                t('accountEmail', {
                  personEmail,
                })!
              }
              style={styles.accountBody}>
              {personEmail}
            </Text>
          )}
          {!personName && (
            <Text style={styles.accountCallout}>{t('addAccountDefaults')}</Text>
          )}
          {!personEmail && (
            <Text style={styles.accountBody}>{t('nameEmailGH')}</Text>
          )}
        </View>
        <Icon
          style={styles.arrowIcon}
          name="arrow_right"
          size={24}
          color={accent}
          importantForAccessibility={'no'}
          accessibilityElementsHidden={true}
        />
      </>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  accountSection: {
    paddingVertical: theme.spacing.s,
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userPic: {
    marginRight: theme.spacing.m,
  },
  accountCallout: {
    ...theme.textStyles.callout_01,
    color: theme.colors.label_high_emphasis,
  },
  accountText: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing.m,
    flexGrow: 1,
    color: theme.colors.label_high_emphasis,
  },
  accountBody: {
    ...theme.textStyles.body_02,
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
  },
  arrowIcon: {
    padding: theme.spacing.xs,
  },
});
