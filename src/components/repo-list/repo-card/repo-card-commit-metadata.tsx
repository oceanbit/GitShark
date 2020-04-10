import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {legacyTheme} from '../../../constants/theme';

interface RepoCardCommitMetadataProps {
  commitsToPull: number;
  commitsToPush: number;
  style?: StyleProp<ViewStyle>;
}
export const RepoCardCommitMetadata = ({
  commitsToPull,
  commitsToPush,
  style = {}
}: RepoCardCommitMetadataProps) => {
  if (!commitsToPull && !commitsToPush) return null;
  return (
    <View style={[styles.arrowContainer, style]}>
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
    borderColor: legacyTheme.colors.outlineColor,
    borderRadius: legacyTheme.lessRoundness,
    borderWidth: 1,
    flexDirection: 'row',
  },
  middleLine: {
    width: 1,
    backgroundColor: legacyTheme.colors.outlineColor,
  },
  commitNumberView: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commitNumberText: {
    fontSize: 10,
    marginLeft: 2,
    color: legacyTheme.colors.accent,
  },
});
