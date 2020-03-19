import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../constants/theme';

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
    borderColor: theme.colors.outlineColor,
    borderRadius: theme.lessRoundness,
    borderWidth: 1,
    flexDirection: 'row',
  },
  middleLine: {
    width: 1,
    backgroundColor: theme.colors.outlineColor,
  },
  commitNumberView: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commitNumberText: {
    fontSize: 10,
    marginLeft: 2,
    color: theme.colors.accent,
  },
});
