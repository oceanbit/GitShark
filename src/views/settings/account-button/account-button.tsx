import * as React from 'react';
import {Text, View} from 'react-native';
import {theme, UserContext} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from '@components/shark-icon';
import {SharkProfilePic} from '@components/shark-profile-pic';

import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

export const AccountButton = () => {
  const {useGitHub, gitHubUser, manualUser} = React.useContext(UserContext);
  const history = useNavigation();

  const styles = useDynamicValue(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);

  const isGitHub = useGitHub && !!gitHubUser;

  const authorImage = isGitHub ? {uri: gitHubUser!.avatar_url} : null;

  const personName = isGitHub
    ? gitHubUser!.name
    : !!manualUser
    ? manualUser.name
    : 'Add account details';

  const personEmail = isGitHub
    ? gitHubUser!.email
    : !!manualUser
    ? manualUser.email
    : 'Name, email, GitHub integration';

  return (
    <TouchableRipple
      style={styles.accountSection}
      onPress={() => history.navigate('Account')}>
      <>
        <SharkProfilePic
          style={styles.userPic}
          source={authorImage as any}
          showGHLogo={isGitHub}
        />
        <View style={styles.accountText}>
          <Text style={styles.accountCallout}>{personName}</Text>
          <Text style={styles.accountBody}>{personEmail}</Text>
        </View>
        <Icon
          style={styles.arrowIcon}
          name="arrow_right"
          size={24}
          color={accent}
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
    ...theme.textStyles.callout,
    color: theme.colors.on_surface,
  },
  accountText: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing.m,
    flexGrow: 1,
    color: theme.colors.on_surface,
  },
  accountBody: {
    ...theme.textStyles.body_02,
    color: theme.colors.on_surface,
    opacity: theme.opacity.secondary,
  },
  arrowIcon: {
    padding: theme.spacing.xs,
  },
});
