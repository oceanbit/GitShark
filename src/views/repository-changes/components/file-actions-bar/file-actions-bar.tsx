import * as React from 'react';
import {Animated, StyleProp, View, ViewStyle, Text} from 'react-native';
import {theme} from '@constants';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {FileActionsBarToggleButton} from './file-actions-bar-toggle-button';
import {GrowWidthContent} from '@components/grow-width-content';
import {StageButtonToggle} from './stage-button-toggle';
import {SharkCheckbox} from '@components/shark-checkbox';
import {ChangesArrayItem} from '@services';
import {useTranslation} from 'react-i18next';
import {SrOnly} from '@components/sr-only';

const animTiming = 150;

interface FileActionsBarProps {
  style?: StyleProp<ViewStyle>;
  isItemSelected: boolean;
  onStageAll: () => void;
  onStage: () => void;
  onDiscard: () => void;
  onIgnore: () => void;
  selectedUnstagedChanges: ChangesArrayItem[];
  unstagedChanges: ChangesArrayItem[];
  setSelectedUnstagedChanges: (changes: ChangesArrayItem[]) => void;
}

export const FileActionsBar = ({
  style = {},
  isItemSelected,
  onStageAll,
  onStage,
  onDiscard,
  onIgnore,
  selectedUnstagedChanges,
  unstagedChanges,
  setSelectedUnstagedChanges,
}: FileActionsBarProps) => {
  const {t} = useTranslation();

  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    if (!isItemSelected) setShowMore(false);
  }, [isItemSelected]);

  const styles = useDynamicValue(dynamicStyles);

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

  const areAllItemsSelected =
    unstagedChanges.length === selectedUnstagedChanges.length &&
    !!unstagedChanges.length;

  return (
    <>
      <SrOnly>
        <Text accessibilityRole={'header'}>{t('unstagedHeading')}</Text>
      </SrOnly>
      <View style={[styles.subheaderContainer, style]}>
        <Animated.View
          style={[styles.subheaderTextContainer, {left: textLeft}]}>
          <SharkCheckbox
            checked={areAllItemsSelected}
            indeterminate={!!selectedUnstagedChanges.length}
            onValueChange={selectAll => {
              setSelectedUnstagedChanges(selectAll ? unstagedChanges : []);
            }}
            disabled={disabled}>
            <Animated.Text
              style={[styles.subheaderText, disabledStyles]}
              accessible={true}
              accessibilityLabel={t('allUnstagedItemsSelected')!}>
              {t('unstagedHeading')}
            </Animated.Text>
          </SharkCheckbox>
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
                onPress={onDiscard}
                text={t('discardAction')}
                style={[styles.calloutButton, styles.dividerLeft]}
                // This prevents text breaking from animating incorrectly
                textProps={{numberOfLines: 1}}
              />
              <SharkButton
                onPress={onIgnore}
                text={t('ignoreAction')}
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
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  subheaderContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.m,
    paddingRight: theme.spacing.m,
    // This is overwritten by the `left` property set in the animation
    paddingLeft: theme.spacing.xs,
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
    marginLeft: theme.spacing.xs,
    ...theme.textStyles.callout_01,
    color: theme.colors.label_high_emphasis,
  },
  calloutButton: {
    borderWidth: 0,
    borderRadius: 0,
    // There's a fun 1px issue on the bottom. Hacky solve by just adding 1 to padding of bottom
    // That's what I call a galaxy brained move right there
    paddingBottom: theme.spacing.xs + 1,
  },
  showMoreView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderWidth: theme.borders.thick,
    borderColor: theme.colors.tint_on_surface_01,
    borderRadius: theme.borderRadius.regular,
    overflow: 'hidden',
  },
  iconButton: {},
  dotsIcon: {},
  dividerLeft: {
    borderColor: theme.colors.tint_on_surface_01,
    borderLeftWidth: theme.borders.thick,
  },
  disabledStyling: {
    opacity: theme.opacity.disabled,
  },
});
