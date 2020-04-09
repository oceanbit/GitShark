import * as React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {theme} from '../../constants/theme';
import {SharkButtonToggleGroup} from '../../components/shark-button-toggle-group/shark-button-toggle-group';
import {AppBar} from '../../components/app-bar/app-bar';
import {SharkSubheader} from '../../components/shark-subheader/shark-subheader';
import {textStyles} from '../../constants/text-styles';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SharkProfilePic} from '../../components/shark-profile-pic/shark-profile-pic';

export const Settings = () => {
  const history = useNavigation();

  return (
    <View style={styles.container}>
      <AppBar
        leftIcon="arrow-left"
        onLeftSelect={() => history.goBack()}
        headline="Settings"
      />
      <SharkSubheader calloutText="Account" />
      <TouchableRipple
        style={styles.accountSection}
        onPress={() => history.navigate('Account')}>
        <>
          <SharkProfilePic style={styles.userPic} />
          <View style={styles.accountText}>
            <Text style={styles.accountCallout}>Add account details</Text>
            <Text style={styles.accountBody}>
              Name, email, GitHub integration
            </Text>
          </View>
          <Icon
            style={styles.arrowIcon}
            name="arrow-right"
            size={24}
            color={theme.colors.accent}
          />
        </>
      </TouchableRipple>
      <SharkSubheader calloutText="Theme" />
      <SharkButtonToggleGroup
        values={['Auto', 'Light', 'Dark']}
        onSelect={() => {}}
        style={styles.themeToggle}
      />
      <Text style={styles.themeText}>
        ‘Auto’ will switch between ‘Light’ and ‘Dark’ alongside your system
        theme.
      </Text>
      <SharkSubheader calloutText="Staging layout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineColor,
  },
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
  themeToggle: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  accountCallout: {
    ...textStyles.callout,
  },
  accountText: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 16,
    flexGrow: 1,
  },
  accountBody: {
    ...textStyles.body_02,
    color: theme.colors.on_surface_secondary_light,
  },
  themeText: {
    marginVertical: 16,
    marginHorizontal: 16,
    ...textStyles.caption_02,
    color: theme.colors.on_surface_secondary_light,
  },
  arrowIcon: {
    padding: 8,
  },
});
