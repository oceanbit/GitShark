import {View} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '@constants';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface CommitCardPushPullProps {
  needsPushing?: boolean;
  needsPulling?: boolean;
}

export const CommitCardPushPull = ({
  needsPushing,
  needsPulling,
}: CommitCardPushPullProps) => {
  const accent = useDynamicValue(theme.colors.primary);
  const styles = useDynamicStyleSheet(dynamicStyles);

  if (!needsPushing && !needsPulling) {
    return null;
  }
  return (
    <View style={styles.arrowContainer}>
      {!!needsPushing && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-up" size={10} color={accent} />
        </View>
      )}
      {!!needsPushing && needsPulling && <View style={styles.middleLine} />}
      {!!needsPulling && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow-down" size={10} color={accent} />
        </View>
      )}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
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
});
