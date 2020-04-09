import * as React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {theme} from '../../constants/theme';
import {SharkButtonToggleGroup} from '../../components/shark-button-toggle-group/shark-button-toggle-group';
import {AppBar} from '../../components/app-bar/app-bar';
import {SharkSubheader} from '../../components/shark-subheader/shark-subheader';
import {textStyles} from '../../constants/text-styles';
import { SharkIconButton } from '../../components/shark-icon-button/shark-icon-button';
const defaultProfPic = require('../../../assets/images/default-profile-pic.png');

export const Settings = () => {
  return (
    <View style={styles.container}>
      <AppBar leftIcon="arrow-left" headline="Settings" />
      <SharkSubheader calloutText="Account" />
      <View style={styles.accountSection}>
        <Image source={defaultProfPic} style={styles.userPic} />
        <View style={styles.accountText}>
          <Text style={styles.accountCallout}>Add account details</Text>
          <Text style={styles.accountBody}>
            Name, email, GitHub integration
          </Text>
        </View>
        <SharkIconButton iconName="arrow-right"/>
      </View>
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
    height: 40,
    width: 40,
    borderRadius: 50,
    borderColor: theme.colors.border,
    borderWidth: 1,
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
});
