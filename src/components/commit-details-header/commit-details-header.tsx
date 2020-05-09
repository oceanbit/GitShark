import * as React from 'react';
import {View, Text, Animated} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {CommitDetailsDualAuthor} from './commit-detail-dual-author';
import {textStyles, theme} from '../../constants';
import {DropdownContent} from '../dropdown-content';
import {AnimatedDropdownArrow} from '../animated-dropdown-arrow';
import {TouchableRipple} from 'react-native-paper';

interface CommitDetailsHeaderProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  commitDescriptionExpanded?: boolean;
}
export const CommitDetailsHeader = ({
  expanded,
  setExpanded,
}: CommitDetailsHeaderProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [showMoreInfoOpacity] = React.useState(new Animated.Value(0));
  const [showLessInfoOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(showMoreInfoOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(showLessInfoOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(showMoreInfoOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(showLessInfoOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [expanded, showMoreInfoOpacity, showLessInfoOpacity]);

  return (
    <View style={styles.container}>
      <Text style={styles.commitStyle}>
        fix(dev-infra): exit non-zero if commit message validation failed
      </Text>
      <CommitDetailsDualAuthor expanded={expanded} style={styles.authorBlock} />
      <DropdownContent expanded={expanded}>
        <Text>Hello</Text>
      </DropdownContent>
      <TouchableRipple
        style={styles.dropdownContainer}
        onPress={() => setExpanded(v => !v)}>
        <>
          <AnimatedDropdownArrow
            expanded={expanded}
            setExpanded={setExpanded}
          />
          <View style={styles.dropdropTextContainer}>
            <Animated.Text
              style={[styles.dropdownText, {opacity: showMoreInfoOpacity}]}>
              More info
            </Animated.Text>
            <Animated.Text
              style={[
                styles.dropdownText,
                styles.showLess,
                {opacity: showLessInfoOpacity},
              ]}>
              Less info
            </Animated.Text>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  commitStyle: {
    ...textStyles.callout,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  authorBlock: {
    marginTop: 8,
  },
  dropdownContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    ...textStyles.caption_01,
    color: theme.colors.primary,
    marginLeft: 24,
    flexGrow: 1,
    textAlignVertical: 'center',
  },
  dropdropTextContainer: {
    position: 'relative',
  },
  showLess: {
    position: 'absolute',
    height: '100%',
  },
});
