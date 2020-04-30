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
        <Animated.View style={{transform: [{rotate: rotation}]}}>
          <SharkIconButton
            iconName={'chevron-down'}
            onPress={() => setExpanded(!expanded)}
          />
        </Animated.View>
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
});
