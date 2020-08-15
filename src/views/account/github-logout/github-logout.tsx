import * as React from 'react';
import {Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkButton} from '@components/shark-button';
import {theme, UserContext} from '@constants';

export const GitHubLogout = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const {gitHubUser, logoutGitHub} = React.useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.ghUserContainer}>
        <Text style={styles.callout}>{gitHubUser?.name}</Text>
        <Text style={styles.body2}>{gitHubUser?.email}</Text>
      </View>
      <SharkButton onPress={() => logoutGitHub()} text={'Sign out'} />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    padding: theme.spacing.m,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  ghUserContainer: {
    flexGrow: 1,
    marginRight: theme.spacing.m,
  },
  callout: {
    ...theme.textStyles.callout,
    color: theme.colors.on_surface,
  },
  body2: {
    ...theme.textStyles.body_02,
    color: theme.colors.on_surface,
    opacity: theme.opacity.secondary,
  },
});
