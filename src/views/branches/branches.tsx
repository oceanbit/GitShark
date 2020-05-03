/**
 * Keep in mind that despite being a "View", this is embedded inside of
 * "repository-history" as it's part of the dropdown component there
 */
import * as React from 'react';
import {View, Text} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

export const Branches = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: '100%',
  },
});
