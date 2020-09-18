import {theme} from '@constants';
import {DynamicStyleSheet} from 'react-native-dynamic';

export const dynamicStyles = new DynamicStyleSheet({
  cardContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.tint_on_surface_01,
    borderRadius: theme.borderRadius.regular,
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
    ...theme.textStyles.headline_06,
    color: theme.colors.label_high_emphasis,
  },
  lastUpdated: {
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
    ...theme.textStyles.caption_02,
  },
  branchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    color: theme.colors.primary,
    marginLeft: 4,
    ...theme.textStyles.caption_01,
  },
  statusComponent: {
    marginRight: 16,
  },
});
