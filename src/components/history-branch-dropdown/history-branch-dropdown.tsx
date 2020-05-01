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

const animDuration = 150;

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
  const [marginLeft] = React.useState(new Animated.Value(0));
  const [branchNameOpacity] = React.useState(new Animated.Value(0));
  const [selectBranchesOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(rotatevalue, {
          toValue: 1,
          duration: animDuration,
          useNativeDriver: true,
        }),
        Animated.timing(marginLeft, {
          toValue: -40,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(branchNameOpacity, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(selectBranchesOpacity, {
          toValue: 1,
          duration: animDuration,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(rotatevalue, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: true,
        }),
        Animated.timing(marginLeft, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(branchNameOpacity, {
          toValue: 1,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(selectBranchesOpacity, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [
    expanded,
    rotatevalue,
    marginLeft,
    branchNameOpacity,
    selectBranchesOpacity,
  ]);

  const rotation = rotatevalue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableRipple
      style={styles.dropdownContainer}
      onPress={() => setExpanded(!expanded)}
      rippleColor={rippleColor}>
      <Animated.View style={[styles.dropdownView, {marginLeft}]}>
        <SharkIconButton
          onPress={onFavorite}
          iconName={favorite ? 'star' : 'star-outline'}
        />
        <View style={styles.textContainer}>
          <Animated.Text
            style={[styles.selectBranches, {opacity: selectBranchesOpacity}]}>
            Select branches
          </Animated.Text>
          <Animated.Text
            numberOfLines={1}
            style={[styles.branchName, {opacity: branchNameOpacity}]}>
            {branchName}
          </Animated.Text>
        </View>
        <SharkIconButton
          iconName={'chevron-down'}
          onPress={() => setExpanded(!expanded)}
          iconStyle={{transform: [{rotate: rotation}]}}
        />
      </Animated.View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dropdownContainer: {
    flexShrink: 0,
    minHeight: 40,
    backgroundColor: theme.colors.floating_surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  textContainer: {
    marginHorizontal: 8,
    flexGrow: 1,
    marginVertical: 16,
    height: 20,
  },
  selectBranches: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    ...textStyles.callout,
    color: theme.colors.on_surface,
  },
  branchName: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    textAlignVertical: 'center',
    left: 0,
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
});
