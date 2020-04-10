import {StyleProp, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {theme} from '../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyles} from '../../constants/text-styles';
import {ChangesArrayItem} from '../../services/git';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

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
  const styles = useDynamicStyleSheet(dynamicStyles);
  const change_addition = useDynamicValue(theme.colors.change_addition);
  const change_removal = useDynamicValue(theme.colors.change_removal);
  const change_mixed = useDynamicValue(theme.colors.change_mixed);
  const divider = useDynamicValue(theme.colors.divider);
  const accent = useDynamicValue(theme.colors.primary);

  const statusIcon = React.useMemo(() => {
    switch (fileStatus) {
      case 'added':
        return (
          <Icon
            name="plus-circle"
            size={24}
            color={change_addition}
            style={styles.changeIcon}
          />
        );
      case 'deleted':
        return (
          <Icon
            name="minus-circle"
            size={24}
            color={change_removal}
            style={styles.changeIcon}
          />
        );
      case 'modified':
      default:
        return (
          <Icon
            name="dots-horizontal-circle"
            size={24}
            color={change_mixed}
            style={styles.changeIcon}
          />
        );
    }
  }, [fileStatus, change_addition, change_removal, change_mixed]);
  return (
    <TouchableRipple
      style={[style, styles.listItemContainer]}
      onPress={onPress}
      rippleColor={divider}>
      <View style={styles.listItemView}>
        {statusIcon}
        <Text style={styles.fileName}>{fileName}</Text>
        <Icon name="chevron-right" size={24} color={accent} />
      </View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  listItemContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness,
    borderWidth: 1,
    paddingLeft: 12,
    paddingVertical: 12,
    paddingRight: 8,
    justifyContent: 'center',
    marginBottom: 8,
  },
  listItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    marginRight: 12,
  },
  fileName: {
    flexGrow: 1,
    marginRight: 12,
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
});
