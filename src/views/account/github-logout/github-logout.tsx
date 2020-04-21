import * as React from 'react';
import {Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkButton} from '../../../components/shark-button';
import {UserContext} from '../../../constants/contexts';
import {textStyles, theme} from '../../../constants';

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
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  ghUserContainer: {
    flexGrow: 1,
    marginRight: 16,
  },
  callout: {
    ...textStyles.callout,
  },
  body2: {
    ...textStyles.body_02,
    color: theme.colors.on_surface_secondary,
  },
});
