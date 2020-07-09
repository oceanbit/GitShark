import * as React from 'react';
import {Animated, StyleProp, View, ViewStyle} from 'react-native';
import {spacing, theme} from '@constants';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {FileActionsBarToggleButton} from './file-actions-bar-toggle-button';
import {GrowWidthContent} from '@components/grow-width-content';
import {StageButtonToggle} from './stage-button-toggle';
import {SharkCheckbox} from '@components/shark-checkbox';
import {ChangesArrayItem} from '@services';

const animTiming = 150;

interface FileActionsBarProps {
  style?: StyleProp<ViewStyle>;
  isItemSelected: boolean;
  onStageAll: () => void;
  onStage: () => void;
  selectedUnstagedChanges: ChangesArrayItem[];
  unstagedChanges: ChangesArrayItem[];
  setSelectedUnstagedChanges: (changes: ChangesArrayItem[]) => void;
}

export const FileActionsBar = ({
  style = {},
  isItemSelected,
  onStageAll,
  onStage,
  selectedUnstagedChanges,
  unstagedChanges,
  setSelectedUnstagedChanges,
}: FileActionsBarProps) => {
  const [showMore, setShowMore] = React.useState(false);

  const styles = useDynamicStyleSheet(dynamicStyles);

  const [textLeft] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (showMore) {
      Animated.timing(textLeft, {
        toValue: -400,
        duration: animTiming,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(textLeft, {
        toValue: 8,
        duration: animTiming,
        useNativeDriver: false,
      }).start();
    }
  }, [showMore, textLeft]);

  const disabled = !unstagedChanges.length;

  const disabledStyles = disabled ? styles.disabledStyling : {};

  return (
    <View style={[styles.subheaderContainer, style]}>
      <Animated.View style={[styles.subheaderTextContainer, {left: textLeft}]}>
        <SharkCheckbox
          checked={
            unstagedChanges.length === selectedUnstagedChanges.length &&
            !!unstagedChanges.length
          }
          indeterminate={!!selectedUnstagedChanges.length}
          onValueChange={selectAll => {
            setSelectedUnstagedChanges(selectAll ? unstagedChanges : []);
          }}
          disabled={disabled}
        />
        <Animated.Text style={[styles.subheaderText, disabledStyles]}>
          Unstaged
        </Animated.Text>
      </Animated.View>
      <View />
      <View style={styles.showMoreView}>
        <StageButtonToggle
          buttonStyle={styles.calloutButton}
          isStage={isItemSelected}
          onStage={onStage}
          onStageAll={onStageAll}
          disabled={disabled}
        />
        <GrowWidthContent expanded={showMore}>
          <View style={styles.moreViewButtons}>
            <SharkButton
              onPress={() => {}}
              text={'Discard'}
              style={[styles.calloutButton, styles.dividerLeft]}
              // This prevents text breaking from animating incorrectly
              textProps={{numberOfLines: 1}}
            />
            <SharkButton
              onPress={() => {}}
              text={'Ignore'}
              style={[styles.calloutButton, styles.dividerLeft]}
              textProps={{numberOfLines: 1}}
            />
          </View>
        </GrowWidthContent>
        <GrowWidthContent expanded={isItemSelected}>
          <FileActionsBarToggleButton
            showMore={showMore}
            setShowMore={setShowMore}
            style={styles.dividerLeft}
          />
        </GrowWidthContent>
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  subheaderContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    paddingVertical: spacing.m,
    paddingRight: spacing.m,
    // This is overwritten by the `left` property set in the animation
    paddingLeft: spacing.xs,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moreViewButtons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  subheaderTextContainer: {
    position: 'absolute',
    flexGrow: 1,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  subheaderText: {
    marginLeft: spacing.xs,
    ...theme.textStyles.callout,
    color: theme.colors.on_surface,
  },
  calloutButton: {
    borderWidth: 0,
    borderRadius: 0,
    // There's a fun 1px issue on the bottom. Hacky solve by just adding 1 to padding of bottom
    // That's what I call a galaxy brained move right there
    paddingBottom: spacing.xs + 1,
  },
  showMoreView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderWidth: theme.borders.thick,
    borderColor: theme.colors.tint_on_surface_16,
    borderRadius: theme.borderRadius.regular,
    overflow: 'hidden',
  },
  iconButton: {},
  dotsIcon: {},
  dividerLeft: {
    borderColor: theme.colors.tint_on_surface_16,
    borderLeftWidth: theme.borders.thick,
  },
  disabledStyling: {
    opacity: theme.opacity.disabled,
  },
});
