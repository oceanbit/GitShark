import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from '@components/shark-icon';
import {ChangesArrayItem} from '@services';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

interface OnPress {
  onPress: () => void;
  label: string;
}

type OnPressProps =
  | OnPress
  | {
      onPress?: never;
      label?: never;
    };

interface FileChangeListItemProps {
  fileName: string;
  fileStatus: ChangesArrayItem['fileStatus'];
  style?: StyleProp<ViewStyle>;
}

export const FileChangeListItem = ({
  fileName,
  onPress,
  fileStatus,
  style = {},
  label,
}: FileChangeListItemProps & OnPressProps) => {
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
            accessibilityElementsHidden={true}
            importantForAccessibility={'no'}
          />
        );
      case 'deleted':
        return (
          <Icon
            name="change_removal"
            size={24}
            color={change_removal}
            style={styles.changeIcon}
            accessibilityElementsHidden={true}
            importantForAccessibility={'no'}
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
            accessibilityElementsHidden={true}
            importantForAccessibility={'no'}
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

  const listItemBase = (
    <View style={styles.listItemView}>
      {statusIcon}
      <Text style={styles.fileName}>{fileName}</Text>
      {onPress && (
        <View style={styles.arrowIcon}>
          <Icon
            name="arrow_right"
            size={24}
            color={accent}
            accessibilityElementsHidden={true}
            importantForAccessibility={'no'}
          />
        </View>
      )}
    </View>
  );

  if (!onPress) {
    return (
      <View style={[styles.listItemContainer, style]}>{listItemBase}</View>
    );
  }

  return (
    <TouchableRipple
      onPress={onPress}
      accessibilityLabel={label}
      style={[styles.listItemContainer, style]}
      accessibilityRole={'button'}>
      {listItemBase}
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
