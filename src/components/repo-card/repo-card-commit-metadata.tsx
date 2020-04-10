import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface RepoCardCommitMetadataProps {
  commitsToPull: number;
  commitsToPush: number;
  style?: StyleProp<ViewStyle>;
}
export const RepoCardCommitMetadata = ({
  commitsToPull,
  commitsToPush,
  style = {},
}: RepoCardCommitMetadataProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  if (!commitsToPull && !commitsToPush) return null;
  return (
    <View style={[styles.arrowContainer, style]}>
      {!!commitsToPush && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-up" size={10} color={accent} />
          <Text style={styles.commitNumberText}>{commitsToPush}</Text>
        </View>
      )}
      {!!commitsToPush && commitsToPull && <View style={styles.middleLine} />}
      {!!commitsToPull && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-down" size={10} color={accent} />
          <Text style={styles.commitNumberText}>{commitsToPull}</Text>
        </View>
      )}
    </View>
  );
};

export const dynamicStyles = new DynamicStyleSheet({
  arrowContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.divider,
    borderRadius: theme.lessRoundness,
    borderWidth: 1,
    flexDirection: 'row',
  },
  middleLine: {
    width: 1,
    backgroundColor: theme.colors.divider,
  },
  commitNumberView: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commitNumberText: {
    fontSize: 10,
    marginLeft: 2,
    color: theme.colors.primary,
  },
});
