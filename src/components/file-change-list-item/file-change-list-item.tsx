import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {theme} from '../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyles} from '../../constants/text-styles';
import {ChangesArrayItem} from '../../services/git';

interface FileChangeListItemProps {
  fileName: string;
  onPress?: () => void;
  fileStatus: ChangesArrayItem['fileStatus'];
}
export const FileChangeListItem = ({
  fileName,
  onPress = () => {},
  fileStatus,
}: FileChangeListItemProps) => {
  const statusIcon = React.useMemo(() => {
    switch (fileStatus) {
      case 'added':
        return (
          <Icon
            name="plus-circle"
            size={24}
            color={theme.colors.change_addition_light}
            style={styles.changeIcon}
          />
        );
      case 'deleted':
        return (
          <Icon
            name="minus-circle"
            size={24}
            color={theme.colors.change_removal_light}
            style={styles.changeIcon}
          />
        );
      case 'modified':
      default:
        return (
            <Icon
                name="dots-horizontal-circle"
                size={24}
                color={theme.colors.change_mixed_light}
                style={styles.changeIcon}
            />
        );
    }
  }, [fileStatus]);
  return (
    <TouchableRipple
      style={styles.listItemContainer}
      onPress={onPress}
      rippleColor={theme.colors.outlineColor}>
      <View style={styles.listItemView}>
        {statusIcon}
        <Text style={styles.fileName}>{fileName}</Text>
        <Icon name="chevron-right" size={24} color={theme.colors.accent} />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.outlineColor,
    borderRadius: theme.roundness,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  listItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    padding: 8,
  },
  fileName: {
    flexGrow: 1,
    padding: 8,
    ...textStyles.body_01,
  },
});
