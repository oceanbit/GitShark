import * as React from 'react';
import {Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkButton} from '@components/shark-button';
import {UserContext, textStyles, theme, spacing, opacity} from '@constants';

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
    padding: spacing.m,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  ghUserContainer: {
    flexGrow: 1,
    marginRight: spacing.m,
  },
  callout: {
    ...textStyles.callout,
  },
  body2: {
    ...textStyles.body_02,
    color: theme.colors.on_surface,
    opacity: opacity.secondary,
  },
});
