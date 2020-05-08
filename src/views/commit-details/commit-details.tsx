import * as React from 'react';
import {Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

export const CommitDetails = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <Text>Hello, world</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    padding: 16,
  },
});
