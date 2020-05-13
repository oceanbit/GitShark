import * as React from 'react';
import {View, Text} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {AnimatedDropdownArrow} from '../../animated-dropdown-arrow';
import {theme, textStyles} from '../../../constants';
import {TouchableRipple} from 'react-native-paper';

interface CommitMessageDropdownProps {
  message: string;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CommitMessageDropdown = ({
  message,
  expanded,
  setExpanded,
}: CommitMessageDropdownProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <TouchableRipple
      style={styles.container}
      onPress={() => setExpanded(v => !v)}>
      <>
        <View style={styles.textContainer}>
          {!expanded ? (
            <Text style={styles.text} numberOfLines={3} ellipsizeMode={'tail'}>
              {message}
            </Text>
          ) : (
            <Text style={styles.text}>{message}</Text>
          )}
        </View>
        <View style={styles.fakeIcon} />
        <AnimatedDropdownArrow
          expanded={expanded}
          setExpanded={setExpanded as any}
          style={styles.dropdownArrow}
        />
      </>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderRadius: theme.roundness,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    backgroundColor: theme.colors.tinted_surface,
    paddingLeft: 12,
    paddingVertical: 12,
    paddingRight: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    position: 'relative',
  },
  textContainer: {
    flexGrow: 1,
    width: 1,
  },
  text: {
    ...textStyles.caption_02,
    color: theme.colors.on_surface,
  },
  fakeIcon: {
    width: 40,
    marginLeft: 16,
  },
  dropdownArrow: {
    position: 'absolute',
    right: 16,
    // This is not correct for the collapsed state, thanks to font scaling
    bottom: 16,
  },
});
