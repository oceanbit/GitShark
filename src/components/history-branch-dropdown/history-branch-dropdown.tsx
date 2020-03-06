import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import {textStyles} from '../../constants/text-styles';

interface HistoryBranchDropdownProps {
  branchName: string;
  onFavorite: () => void;
  favorite: boolean;
}
export const HistoryBranchDropdown = ({
  branchName,
  favorite,
  onFavorite,
}: HistoryBranchDropdownProps) => {
  return (
    <TouchableRipple
      style={styles.dropdownContinaer}
      onPress={() => {}}
      rippleColor={theme.colors.outlineColor}>
      <View style={styles.dropdownView}>
        <Text numberOfLines={1} style={styles.branchName}>
          {branchName}
        </Text>
        <TouchableRipple
          style={styles.starButton}
          onPress={onFavorite}
          rippleColor={theme.colors.outlineColor}>
          <Icon
            name={favorite ? 'star' : 'star-outline'}
            size={24}
            color={theme.colors.accent}
          />
        </TouchableRipple>
        <View style={styles.buttonDivider} />
        <Icon
          name="chevron-down"
          size={24}
          color={theme.colors.accent}
          style={styles.dropdownButton}
        />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  dropdownContinaer: {
    paddingLeft: 16,
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    marginRight: 16,
    flexGrow: 1,
    ...textStyles.callout,
    fontWeight: 'bold',
  },
  starButton: {
    borderRadius: 50,
    padding: 8,
    marginRight: 7,
  },
  buttonDivider: {
    height: 36,
    width: 1,
    backgroundColor: theme.colors.outlineColor,
  },
  dropdownButton: {
    padding: 16,
  },
});
