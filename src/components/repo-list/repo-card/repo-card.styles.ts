import {textStyles} from '../../../constants/text-styles';
import {theme} from '../../../constants/theme';
import {DynamicStyleSheet} from 'react-native-dark-mode';

export const dynamicStyles = new DynamicStyleSheet({
  cardContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness,
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
    color: theme.colors.on_surface,
  },
  lastUpdated: {
    color: theme.colors.on_surface_secondary,
    ...textStyles.caption_02,
  },
  branchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    color: theme.colors.primary,
    marginLeft: 4,
    ...textStyles.caption_01,
  },
  statusComponent: {
    marginRight: 16,
  },
  menu: {
    backgroundColor: theme.colors.floating_surface,
  },
});
