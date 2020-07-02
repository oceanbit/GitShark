import {View, Animated} from 'react-native';
import * as React from 'react';
import {spacing, textStyles, theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import {SharkIconButton} from '@components/shark-icon-button';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {AnimatedDropdownArrow} from '@components/animated-dropdown-arrow';
import {SharkDivider} from '@components/shark-divider';

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

  const [marginLeft] = React.useState(new Animated.Value(0));
  const [branchNameOpacity] = React.useState(new Animated.Value(0));
  const [selectBranchesOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (expanded) {
      Animated.parallel([
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
  }, [expanded, marginLeft, branchNameOpacity, selectBranchesOpacity]);

  return (
    <>
      <TouchableRipple
        style={styles.dropdownContainer}
        onPress={() => setExpanded(!expanded)}
        rippleColor={rippleColor}>
        <Animated.View style={[styles.dropdownView, {marginLeft}]}>
          <SharkIconButton
            onPress={onFavorite}
            iconName={favorite ? 'favorite_selected' : 'favorite'}
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
          <AnimatedDropdownArrow
            setExpanded={setExpanded}
            expanded={expanded}
          />
        </Animated.View>
      </TouchableRipple>
      <SharkDivider />
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dropdownContainer: {
    flexShrink: 0,
    minHeight: 40,
    backgroundColor: theme.colors.floating_surface,
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  textContainer: {
    marginHorizontal: spacing.xs,
    flexGrow: 1,
    marginVertical: spacing.m,
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
    textAlignVertical: 'center',
    left: 0,
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
});
