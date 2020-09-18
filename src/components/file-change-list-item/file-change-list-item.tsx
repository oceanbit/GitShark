import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from '@components/shark-icon';
import {ChangesArrayItem} from '@services';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

interface FileChangeListItemProps {
  fileName: string;
  onPress?: () => void;
  fileStatus: ChangesArrayItem['fileStatus'];
  style?: StyleProp<ViewStyle>;
}

export const FileChangeListItem = ({
  fileName,
  onPress = () => {},
  fileStatus,
  style = {},
}: FileChangeListItemProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const change_addition = useDynamicValue(theme.colors.change_addition);
  const change_removal = useDynamicValue(theme.colors.change_removal);
  const change_mixed = useDynamicValue(theme.colors.change_mixed);
  const accent = useDynamicValue(theme.colors.primary);

  const statusIcon = React.useMemo(() => {
    switch (fileStatus) {
      case 'added':
        return (
          <Icon
            name="change_addition"
            size={24}
            color={change_addition}
            style={styles.changeIcon}
          />
        );
      case 'deleted':
        return (
          <Icon
            name="change_removal"
            size={24}
            color={change_removal}
            style={styles.changeIcon}
          />
        );
      case 'modified':
      default:
        return (
          <Icon
            name="change_mixed"
            size={24}
            color={change_mixed}
            style={styles.changeIcon}
          />
        );
    }
  }, [
    fileStatus,
    change_addition,
    change_removal,
    change_mixed,
    styles.changeIcon,
  ]);
  return (
    <TouchableRipple
      style={[styles.listItemContainer, style]}
      onPress={onPress}>
      <View style={styles.listItemView}>
        {statusIcon}
        <Text style={styles.fileName}>{fileName}</Text>
        <View style={styles.arrowIcon}>
          <Icon name="arrow_right" size={24} color={accent} />
        </View>
      </View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  listItemContainer: {
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.xs,
    justifyContent: 'center',
    paddingVertical: theme.spacing.xs,
  },
  listItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    marginRight: theme.spacing.m,
  },
  arrowIcon: {
    paddingHorizontal: theme.spacing.xs,
  },
  fileName: {
    flexGrow: 1,
    width: 1,
    marginRight: theme.spacing.xs,
    ...theme.textStyles.body_01,
    color: theme.colors.label_high_emphasis,
  },
});
