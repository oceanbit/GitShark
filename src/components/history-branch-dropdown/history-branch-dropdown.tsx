import {Text, View, Animated} from 'react-native';
import * as React from 'react';
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
  setExpanded: (val: boolean) => void;
  expanded: boolean;
}

export const HistoryBranchDropdown = ({
  branchName,
  favorite,
  onFavorite,
  expanded,
  setExpanded,
}: HistoryBranchDropdownProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const rippleColor = useDynamicValue(theme.colors.ripple_surface);

  const [rotatevalue] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (expanded) {
      Animated.timing(rotatevalue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(rotatevalue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [expanded, rotatevalue]);

  const rotation = rotatevalue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableRipple
      style={styles.dropdownContainer}
      onPress={() => setExpanded(!expanded)}
      rippleColor={rippleColor}>
      <View style={styles.dropdownView}>
        <SharkIconButton
          onPress={onFavorite}
          iconName={favorite ? 'star' : 'star-outline'}
        />
        <Text numberOfLines={1} style={styles.branchName}>
          {branchName}
        </Text>
        <SharkIconButton
          iconName={'chevron-down'}
          onPress={() => setExpanded(!expanded)}
          iconStyle={{transform: [{rotate: rotation}]}}
        />
      </View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dropdownContainer: {
    paddingHorizontal: 8,
    flexShrink: 0,
    minHeight: 40,
    backgroundColor: theme.colors.floating_surface,
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    marginHorizontal: 8,
    flexGrow: 1,
    ...textStyles.body_01,
    color: theme.colors.on_surface,
    marginVertical: 16,
  },
});
