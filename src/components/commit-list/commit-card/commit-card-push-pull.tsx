import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../constants/theme';

interface CommitCardPushPullProps {
  needsPushing?: boolean;
  needsPulling?: boolean;
}
export const CommitCardPushPull = ({
  needsPushing,
  needsPulling,
}: CommitCardPushPullProps) => {
  if (!needsPushing && !needsPulling) return null;
  return (
    <View style={styles.arrowContainer}>
      {!!needsPushing && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-up" size={10} color={theme.colors.accent} />
        </View>
      )}
      {!!needsPushing && needsPulling && <View style={styles.middleLine} />}
      {!!needsPulling && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-down" size={10} color={theme.colors.accent}  />
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
});
