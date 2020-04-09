import * as React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {theme} from '../../constants/theme';
import {SharkButtonToggleGroup} from '../../components/shark-button-toggle-group/shark-button-toggle-group';
import {AppBar} from '../../components/app-bar/app-bar';
import {SharkSubheader} from '../../components/shark-subheader/shark-subheader';
import {textStyles} from '../../constants/text-styles';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import {SharkButton} from '../../components/shark-button/shark-button';

export const Account = () => {
  const history = useNavigation();

  return (
    <View style={styles.container}>
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
        onPress={() => {}}
      />
      <SharkSubheader
        style={styles.commitAuthoringHeader}
        calloutText="Commit authoring"
      />
      <View style={styles.commitAuthorContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  signinGithubButton: {
    marginBottom: 24,
    marginTop: 8,
    marginHorizontal: 16,
  },
  commitAuthoringHeader: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  commitAuthorContainer: {
    paddingHorizontal: 16,
  },
});
