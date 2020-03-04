import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      {!!commitsToPush && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-up" size={10} color="#002BFF" />
          <Text style={styles.commitNumberText}>{commitsToPush}</Text>
        </View>
      )}
      {!!commitsToPush && commitsToPull && <View style={styles.middleLine} />}
      {!!commitsToPull && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-down" size={10} color="#002BFF" />
          <Text style={styles.commitNumberText}>{commitsToPull}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  commitNumberText: {
    fontSize: 10,
    marginLeft: 2,
    color: '#002BFF',
  },
});
