import {View} from 'react-native';
import * as React from 'react';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

interface CommitCardPushPullProps {
  needsPushing?: boolean;
  needsPulling?: boolean;
}

export const CommitCardPushPull = ({
  needsPushing,
  needsPulling,
}: CommitCardPushPullProps) => {
  const accent = useDynamicValue(theme.colors.primary);
  const styles = useDynamicValue(dynamicStyles);

  if (!needsPushing && !needsPulling) {
    return null;
  }
  return (
    <View style={styles.arrowContainer}>
      {!!needsPushing && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow_up" size={10} color={accent} />
        </View>
      )}
      {!!needsPushing && needsPulling && <View style={styles.middleLine} />}
      {!!needsPulling && (
        <View style={styles.commitNumberView}>
          <Icon name="arrow_down" size={10} color={accent} />
        </View>
      )}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  arrowContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.tint_on_surface_01,
    borderRadius: theme.borderRadius.small,
    borderWidth: theme.borders.normal,
    flexDirection: 'row',
  },
  middleLine: {
    width: 1,
    backgroundColor: theme.colors.tint_on_surface_01,
  },
  commitNumberView: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
