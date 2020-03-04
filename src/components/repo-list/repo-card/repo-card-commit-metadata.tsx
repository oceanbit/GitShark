import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface RepoCardCommitMetadataProps {
  commitsToPull: number;
  commitsToPush: number;
}
export const RepoCardCommitMetadata = ({
  commitsToPull,
  commitsToPush,
}: RepoCardCommitMetadataProps) => {
  if (!commitsToPull && !commitsToPush) return null;
  return (
    <View style={styles.arrowContainer}>
      {!!commitsToPull && (
        <View style={styles.commitNumberView}>
          <Text style={styles.commitNumberText}>{commitsToPull}</Text>
        </View>
      )}
      {!!commitsToPush && commitsToPull && <View style={styles.middleLine} />}
      {!!commitsToPush && (
        <View style={styles.commitNumberView}>
          <Text style={styles.commitNumberText}>{commitsToPush}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    borderStyle: 'solid',
    borderColor: 'rgba(0, 51, 153, 0.2);',
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
  },
  middleLine: {
    width: 1,
    backgroundColor: 'rgba(0, 51, 153, 0.2)',
  },
  commitNumberView: {
    padding: 6,
  },
  commitNumberText: {
    fontSize: 10,
    color: '#002BFF',
  },
});
