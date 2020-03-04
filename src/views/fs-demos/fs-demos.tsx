import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FSDemos} from '../../components/fs-demos/fs-demos';

export const RepoList = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>FS Demos:</Text>
      <FSDemos />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    borderColor: 'black',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});
