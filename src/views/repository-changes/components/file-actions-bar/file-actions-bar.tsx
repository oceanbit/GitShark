import * as React from 'react';
import {StyleProp, View, ViewStyle, Animated} from 'react-native';
import {textStyles, theme} from '@constants';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {FileActionsBarToggleButton} from './file-actions-bar-toggle-button';
import {GrowWidthContent} from '@components/grow-width-content';
import {StageButtonToggle} from './stage-button-toggle';
import {SharkCheckbox} from '@components/shark-checkbox';
import {SharkSubheader} from '@components/shark-subheader';
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
        toValue: 16,
        duration: animTiming,
        useNativeDriver: false,
      }).start();
    }
  }, [showMore, textLeft]);

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
        />
        <Animated.Text style={styles.subheaderText}>Unstaged</Animated.Text>
      </Animated.View>
      <View />
      <View style={styles.showMoreView}>
        <StageButtonToggle
          buttonStyle={styles.calloutButton}
          isStage={isItemSelected}
          onStage={onStage}
          onStageAll={onStageAll}
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
    padding: 16,
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
    ...textStyles.callout,
    color: theme.colors.on_surface,
  },
  calloutButton: {
    borderWidth: 0,
    borderRadius: 0,
    // There's a fun 1px issue on the bottom. Hacky solve by just adding 1 to padding of bottom
    // That's what I call a galaxy brained move right there
    paddingBottom: 9,
  },
  showMoreView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderWidth: 2,
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
  iconButton: {},
  dotsIcon: {},
  dividerLeft: {
    borderColor: theme.colors.divider,
    borderLeftWidth: 2,
  },
});
