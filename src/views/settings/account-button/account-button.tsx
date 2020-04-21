import * as React from 'react';
import {Text, View} from 'react-native';
import {UserContext, textStyles, theme} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SharkProfilePic} from '../../../components/shark-profile-pic';

import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
export const AccountButton = () => {
  const {useGitHub, gitHubUser, manualUser} = React.useContext(UserContext);
  const history = useNavigation();

  const styles = useDynamicStyleSheet(dynamicStyles);
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
        <SharkProfilePic style={styles.userPic} source={authorImage as any} />
        <View style={styles.accountText}>
          <Text style={styles.accountCallout}>{personName}</Text>
          <Text style={styles.accountBody}>{personEmail}</Text>
        </View>
        <Icon
          style={styles.arrowIcon}
          name="arrow-right"
          size={24}
          color={accent}
        />
      </>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
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
  arrowIcon: {
    padding: 8,
  },
});
