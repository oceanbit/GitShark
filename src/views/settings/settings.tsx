import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from '../../constants/theme';
import {SharkButtonToggleGroup} from '../../components/shark-button-toggle-group/shark-button-toggle-group';

export const Settings = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <SharkButtonToggleGroup />
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
