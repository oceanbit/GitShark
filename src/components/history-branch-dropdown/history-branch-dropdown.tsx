import {Text, View} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyles, theme} from '../../constants';
import {TouchableRipple} from 'react-native-paper';
import {SharkIconButton} from '../shark-icon-button';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

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
  const styles = useDynamicStyleSheet(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);
  const rippleColor = useDynamicValue(theme.colors.ripple_surface);

  return (
    <TouchableRipple
      style={styles.dropdownContinaer}
      onPress={() => {}}
      rippleColor={rippleColor}>
      <View style={styles.dropdownView}>
        <Text numberOfLines={1} style={styles.branchName}>
          {branchName}
        </Text>
        <SharkIconButton
          style={styles.starButton}
          onPress={onFavorite}
          iconName={favorite ? 'star' : 'star-outline'}
        />
        <View style={styles.buttonDivider} />
        <Icon
          name="chevron-down"
          size={24}
          color={accent}
          style={styles.dropdownButton}
        />
      </View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dropdownContinaer: {
    paddingLeft: 16,
    backgroundColor: theme.colors.floating_surface,
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
    color: theme.colors.on_surface,
  },
  starButton: {
    marginRight: 7,
  },
  buttonDivider: {
    height: 36,
    width: 1,
    backgroundColor: theme.colors.divider,
  },
  dropdownButton: {
    padding: 16,
  },
});
