import * as React from 'react';
import {Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkButton} from '@components/shark-button';
import {theme, UserContext} from '@constants';
import {useTranslation} from 'react-i18next';

export const GitHubLogout = () => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const {gitHubUser, logoutGitHub} = React.useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.ghUserContainer}>
        <Text style={styles.callout}>{gitHubUser?.name}</Text>
        <Text style={styles.body2}>{gitHubUser?.email}</Text>
      </View>
      <SharkButton onPress={() => logoutGitHub()} text={t('signOut')} />
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
    ...theme.textStyles.callout_01,
    color: theme.colors.label_high_emphasis,
  },
  body2: {
    ...theme.textStyles.body_02,
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
  },
});
