import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {legacyTheme} from '../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyles} from '../../constants/text-styles';
import {ChangesArrayItem} from '../../services/git';

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
  const statusIcon = React.useMemo(() => {
    switch (fileStatus) {
      case 'added':
        return (
          <Icon
            name="plus-circle"
            size={24}
            color={legacyTheme.colors.change_addition_light}
            style={styles.changeIcon}
          />
        );
      case 'deleted':
        return (
          <Icon
            name="minus-circle"
            size={24}
            color={legacyTheme.colors.change_removal_light}
            style={styles.changeIcon}
          />
        );
      case 'modified':
      default:
        return (
          <Icon
            name="dots-horizontal-circle"
            size={24}
            color={legacyTheme.colors.change_mixed_light}
            style={styles.changeIcon}
          />
        );
    }
  }, [fileStatus]);
  return (
    <TouchableRipple
      style={[style, styles.listItemContainer]}
      onPress={onPress}
      rippleColor={legacyTheme.colors.outlineColor}>
      <View style={styles.listItemView}>
        {statusIcon}
        <Text style={styles.fileName}>{fileName}</Text>
        <Icon name="chevron-right" size={24} color={legacyTheme.colors.accent} />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    borderStyle: 'solid',
    borderColor: legacyTheme.colors.outlineColor,
    borderRadius: legacyTheme.roundness,
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
  },
});
