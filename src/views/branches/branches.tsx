/**
 * Keep in mind that despite being a "View", this is embedded inside of
 * "repository-history" as it's part of the dropdown component there
 */
import * as React from 'react';
import {View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkSubheader} from '../../components/shark-subheader';
import {SharkDivider} from '../../components/shark-divider';

export const Branches = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <SharkSubheader calloutText="Local" buttonText="Add new" />
      <SharkDivider />
      <SharkSubheader calloutText="Remotes" buttonText="Add new" />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: '100%',
  },
});
