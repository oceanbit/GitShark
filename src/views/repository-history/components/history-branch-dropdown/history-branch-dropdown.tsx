import {Animated, View} from 'react-native';
import * as React from 'react';
import {theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {AnimatedDropdownArrow} from '@components/animated-dropdown-arrow';
import {SharkDivider} from '@components/shark-divider';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);
  const rippleColor = useDynamicValue(theme.colors.ripple_neutral);

  const [marginLeft] = React.useState(new Animated.Value(0));
  const [branchNameOpacity] = React.useState(new Animated.Value(0));
  const [selectBranchesOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(marginLeft, {
          toValue: 0, // -40 when we have the favorite icon enabled
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
          {/*<SharkIconButton*/}
          {/*  onPress={onFavorite}*/}
          {/*  iconName={favorite ? 'favorite_selected' : 'favorite'}*/}
          {/*/>*/}
          <View style={styles.textContainer}>
            <Animated.Text
              style={[styles.selectBranches, {opacity: selectBranchesOpacity}]}>
              {t('selectBranches')}
            </Animated.Text>
            <Animated.Text
              numberOfLines={1}
              style={[styles.branchName, {opacity: branchNameOpacity}]}>
              {branchName}
            </Animated.Text>
          </View>
          <AnimatedDropdownArrow expanded={expanded} />
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
    paddingHorizontal: theme.spacing.xs,
  },
  textContainer: {
    marginHorizontal: theme.spacing.xs,
    flexGrow: 1,
    marginVertical: theme.spacing.m,
    height: 20,
  },
  selectBranches: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    ...theme.textStyles.callout_01,
    color: theme.colors.label_high_emphasis,
  },
  branchName: {
    width: '100%',
    position: 'absolute',
    textAlignVertical: 'center',
    left: 0,
    ...theme.textStyles.body_01,
    color: theme.colors.label_high_emphasis,
  },
});
