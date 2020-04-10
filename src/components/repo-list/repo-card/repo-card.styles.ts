import {StyleSheet} from 'react-native';
import {textStyles} from '../../../constants/text-styles';
import {legacyTheme} from '../../../constants/theme';

export const styles = StyleSheet.create({
  cardContainer: {
    borderStyle: 'solid',
    borderColor: legacyTheme.colors.outlineColor,
    borderRadius: legacyTheme.roundness,
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
  topDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  repoNameAndDate: {
    paddingTop: 8,
    flexDirection: 'column',
  },
  moreButtonContainer: {
    height: 56,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 8,
    ...textStyles.headline_03,
  },
  lastUpdated: {
    color: legacyTheme.colors.on_surface_secondary_light,
    ...textStyles.caption_02,
  },
  branchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    color: legacyTheme.colors.accent,
    marginLeft: 4,
    ...textStyles.caption_01,
  },
  statusComponent: {
    marginRight: 16,
  },
});
