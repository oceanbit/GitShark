import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from '../../constants/theme';
import {SharkButtonToggleGroup} from '../../components/shark-button-toggle-group/shark-button-toggle-group';
import { AppBar } from '../../components/app-bar/app-bar';
import { SharkSubheader } from '../../components/shark-subheader/shark-subheader';

export const Settings = () => {
  return (
    <View style={styles.container}>
      <AppBar leftIcon="arrow-left" headline="Settings" />
      <SharkSubheader calloutText="Account" />
      <SharkSubheader calloutText="Theme" />
      <SharkButtonToggleGroup
        values={['Auto', 'Light', 'Dark']}
        onSelect={() => {}}
        style={{marginHorizontal: 16}}
      />
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
});
