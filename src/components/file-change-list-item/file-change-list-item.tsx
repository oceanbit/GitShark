import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {theme} from '../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyles} from '../../constants/text-styles';

interface FileChangeListItemProps {
  fileName: string;
  onPress?: () => void;
  changeStatus: 'removed' | 'added';
}
export const FileChangeListItem = ({
  fileName,
  onPress = () => {},
  changeStatus,
}: FileChangeListItemProps) => {
  const statusIcon = React.useMemo(() => {
    switch (changeStatus) {
      case 'added':
        return (
          <Icon
            name="plus-circle"
            size={24}
            color={'green'}
            style={styles.changeIcon}
          />
        );
      case 'removed':
      default:
        return (
          <Icon
            name="minus-circle"
            size={24}
            color={'red'}
            style={styles.changeIcon}
          />
        );
    }
  }, [changeStatus]);
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
