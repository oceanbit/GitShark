import * as React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../constants/theme';
import {textStyles} from '../../../constants/text-styles';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

export const HeaderActionNumber = ({
  iconName,
  val,
  onPress,
}: {
  iconName: string;
  val?: number;
  onPress?: () => void;
}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const accent = useDynamicValue(theme.colors.primary);

  return (
    <TouchableRipple
      onPress={onPress || (() => {})}
      style={!!val ? styles.outlineContainer : styles.container}>
      <View style={styles.repoHeader}>
        <Icon name={iconName} size={24} color={accent} />
        {!!val && <Text style={styles.valText}>{val}</Text>}
      </View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  repoHeader: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginRight: 8,
  },
  outlineContainer: {
    borderWidth: 2,
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness,
    marginRight: 8,
  },
  backBtn: {
    padding: 8,
    borderRadius: 50,
  },
  valText: {
    ...textStyles.callout,
    marginLeft: 8,
    marginRight: 2,
    color: theme.colors.primary,
  },
});
